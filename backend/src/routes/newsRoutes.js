const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

const parser = new Parser({
    customFields: {
        item: ['media:content', 'media:thumbnail'],
    },
});

// RSS Feed sources for real estate news
const NEWS_FEEDS = [
    'https://www.redfin.com/blog/feed/',
    // Can add more feeds here
];

// Cache for news to avoid hitting RSS too frequently
let newsCache = {
    data: [],
    lastFetched: null,
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

router.get('/', async (req, res) => {
    try {
        const now = Date.now();

        // Return cached data if still fresh
        if (newsCache.lastFetched && (now - newsCache.lastFetched) < CACHE_DURATION) {
            return res.json({ news: newsCache.data, cached: true });
        }

        // Fetch fresh news
        const allNews = [];

        for (const feedUrl of NEWS_FEEDS) {
            try {
                const feed = await parser.parseURL(feedUrl);
                const items = feed.items.slice(0, 5).map(item => ({
                    id: Buffer.from(item.link || item.title).toString('base64').slice(0, 20),
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                    snippet: item.contentSnippet?.substring(0, 200) + '...',
                    source: feed.title || 'Real Estate News',
                    image: item['media:content']?.$.url ||
                        item['media:thumbnail']?.$.url ||
                        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
                }));
                allNews.push(...items);
            } catch (feedError) {
                console.error(`Error fetching feed ${feedUrl}:`, feedError.message);
            }
        }

        // Sort by date and limit
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        const limitedNews = allNews.slice(0, 10);

        // Update cache
        newsCache = {
            data: limitedNews,
            lastFetched: now,
        };

        res.json({ news: limitedNews, cached: false });
    } catch (error) {
        console.error('News fetch error:', error);

        // Return cached data if available, even if expired
        if (newsCache.data.length > 0) {
            return res.json({ news: newsCache.data, cached: true, stale: true });
        }

        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

module.exports = router;
