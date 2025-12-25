const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

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

                    // Clean up content (remove HTML tags if needed, or keep for WebView)
                    // For now, we prefer clean text or simple HTML. 
                    // Let's keep it raw but prioritize content:encoded
                    let fullContent = item['content:encoded'] || item.content || item.contentSnippet;

                    // Simple text cleanup if it's too raw (optional)
                    // fullContent = fullContent.replace(/<[^>]*>?/gm, ''); 

                    return {
                        id: Buffer.from(item.link || item.title).toString('base64').slice(0, 20),
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        snippet: item.contentSnippet?.substring(0, 200) + '...',
                        content: fullContent, // Full content
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

        const limitedNews = uniqueNews.slice(0, 15);

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

// AI Analysis Endpoint
router.post('/analyze', async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        // TODO: Integrate actual OpenAI call here
        // const completion = await openai.chat.completions.create({ ... });

        // Mock response for now (or use simple heuristic)
        // This mimics the frontend logic but can be replaced with real AI
        const combined = (title + ' ' + (content || '')).toLowerCase();
        let sentiment = 'neutral';
        let summary = 'Piyasa gelişmesi.';

        if (combined.includes('increase') || combined.includes('rise') || combined.includes('growth')) {
            sentiment = 'positive';
            summary = 'Market showing signs of growth.';
        } else if (combined.includes('decrease') || combined.includes('drop') || combined.includes('fall')) {
            sentiment = 'negative';
            summary = 'Market showing signs of cooling.';
        }

        res.json({
            analysis: {
                sentiment,
                summary,
                pasiflowView: `Pasiflow AI analysis for "${title}": ${summary}`
            }
        });

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze news' });
    }
});

module.exports = router;
