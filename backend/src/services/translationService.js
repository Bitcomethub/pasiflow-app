const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Translate text to Turkish using GPT-4o-mini
 * @param {string} text - English text to translate
 * @returns {Promise<string>} - Translated Turkish text
 */
async function translateToTurkish(text) {
    if (!text || text.trim().length === 0) {
        return text;
    }

    // Skip if already appears to be Turkish (contains common Turkish characters)
    if (/[ğüşıöçĞÜŞİÖÇ]/.test(text)) {
        return text;
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'Sen profesyonel bir çevirmensin. Verilen İngilizce metni akıcı Türkçeye çevir. Sadece çeviriyi döndür, ek açıklama yapma.'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            temperature: 0.3,
            max_tokens: 1000,
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Translation error:', error.message);
        // Return original text if translation fails
        return text;
    }
}

/**
 * Translate a news item (title, snippet, content)
 * @param {Object} newsItem - News item object
 * @returns {Promise<Object>} - Translated news item
 */
async function translateNewsItem(newsItem) {
    try {
        const [translatedTitle, translatedSnippet, translatedContent] = await Promise.all([
            translateToTurkish(newsItem.title),
            translateToTurkish(newsItem.snippet),
            newsItem.content ? translateToTurkish(newsItem.content.substring(0, 2000)) : null
        ]);

        return {
            ...newsItem,
            title: translatedTitle,
            snippet: translatedSnippet,
            content: translatedContent || newsItem.content,
            originalTitle: newsItem.title, // Keep original for reference
        };
    } catch (error) {
        console.error('News translation error:', error.message);
        return newsItem;
    }
}

/**
 * Generate Turkish AI analysis for a news item
 * @param {string} title - News title
 * @param {string} content - News content
 * @returns {Promise<Object>} - AI analysis object
 */
async function generateTurkishAnalysis(title, content) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `Sen Pasiflow'un gayrimenkul yatırım analistisin. ABD emlak piyasası haberleri hakkında Türk yatırımcılara yönelik kısa, profesyonel analizler yap.
                    
Analiz formatı:
1. Emoji ile başla (📈 olumlu, 📉 olumsuz, 🏠 kira, 🏦 finans, 💡 genel)
2. 2-3 cümle ana analiz
3. 3 maddelik bullet points (• işareti ile)
4. 🎯 Tavsiye: ile bitir

Türkçe yaz, profesyonel ama anlaşılır ol.`
                },
                {
                    role: 'user',
                    content: `Haber Başlığı: ${title}\n\nHaber İçeriği: ${content?.substring(0, 1000) || 'İçerik mevcut değil.'}`
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        return {
            success: true,
            analysis: completion.choices[0].message.content.trim()
        };
    } catch (error) {
        console.error('Analysis generation error:', error.message);
        return {
            success: false,
            analysis: `💡 Bu haber, ABD emlak piyasasındaki gelişmeleri yansıtıyor.\n\n• Piyasa dinamiklerini takip edin\n• Çeşitlendirilmiş portföy önemli\n• Veriye dayalı kararlar alın\n\n🎯 Tavsiye: Gelişmeleri izleyerek stratejik adımlar atın.`
        };
    }
}

module.exports = {
    translateToTurkish,
    translateNewsItem,
    generateTurkishAnalysis
};
