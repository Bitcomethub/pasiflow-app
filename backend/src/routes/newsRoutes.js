const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const { translateNewsItem, generateTurkishAnalysis } = require('../services/translationService');

const parser = new Parser({
    customFields: {
        item: ['media:content', 'media:thumbnail', 'content:encoded', 'content'],
    },
});

// RSS Feed sources for real estate news
const NEWS_FEEDS = [
    'https://www.redfin.com/blog/feed/',
    'https://www.nar.realtor/feed/news',
    'https://www.inman.com/feed/'
];

// Cache for news to avoid hitting RSS too frequently
let newsCache = {
    data: [],
    lastFetched: null,
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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
                const items = feed.items.slice(0, 5).map(item => {
                    // Try to get the best image
                    const image = item['media:content']?.$.url ||
                        item['media:thumbnail']?.$.url ||
                        (item.content && item.content.match(/src="([^"]+)"/)?.[1]) ||
                        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';

                    // Clean up content
                    let fullContent = item['content:encoded'] || item.content || item.contentSnippet;
                    if (fullContent) {
                        fullContent = fullContent
                            .replace(/<br\s*\/?>/gi, '\n')
                            .replace(/<p>/gi, '\n\n')
                            .replace(/<\/p>/gi, '')
                            .replace(/<[^>]*>?/gm, '')
                            .replace(/&nbsp;/g, ' ')
                            .replace(/&amp;/g, '&')
                            .replace(/\n\s*\n/g, '\n\n')
                            .trim();
                    }

                    return {
                        id: Buffer.from(item.link || item.title).toString('base64').slice(0, 20),
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        snippet: item.contentSnippet?.substring(0, 200) + '...',
                        content: fullContent,
                        source: feed.title || 'Real Estate News',
                        image: image,
                    };
                });
                allNews.push(...items);
            } catch (feedError) {
                console.error(`Error fetching feed ${feedUrl}:`, feedError.message);
            }
        }

        // Sort by date and limit
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Remove duplicates based on title
        const uniqueNews = Array.from(new Map(allNews.map(item => [item.title, item])).values());
        const limitedNews = uniqueNews.slice(0, 10);

        // Translate all news to Turkish (in parallel)
        console.log('Translating news to Turkish...');
        const translatedNews = await Promise.all(
            limitedNews.map(item => translateNewsItem(item))
        );
        console.log('Translation complete.');

        // Update cache with translated news
        newsCache = {
            data: translatedNews,
            lastFetched: now,
        };

        res.json({ news: translatedNews, cached: false });
    } catch (error) {
        console.error('News fetch error:', error);

        // Return cached data if available, even if expired
        if (newsCache.data.length > 0) {
            return res.json({ news: newsCache.data, cached: true, stale: true });
        }

        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// AI Analysis Endpoint - Now with real OpenAI
router.post('/analyze', async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        // Generate Turkish AI analysis
        const result = await generateTurkishAnalysis(title, content);

        res.json({
            success: result.success,
            analysis: result.analysis
        });

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze news' });
    }
});

module.exports = router;

