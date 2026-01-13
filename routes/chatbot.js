const express = require('express');
const router = express.Router();

// Groq API (fast & free)
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt - general assistant that can answer anything
const getSystemPrompt = (userName) => `You are ExusBot, a friendly and super knowledgeable AI assistant on ExusCraft - a gaming mod marketplace.

${userName ? `The user's name is ${userName}. Address them by name occasionally to be personal and friendly.` : ''}

Your personality:
- Friendly, helpful, witty, and enthusiastic
- Use emojis to be expressive 🎮 ✨ 🚀
- Keep responses concise but informative
- You can answer ANY question on ANY topic - you're a general knowledge AI
- Be conversational and fun

You can help with:
- ANY question about ANY topic (science, history, math, coding, life advice, etc.)
- Gaming and mod-related questions (your specialty!)
- Programming in any language
- Creative writing, jokes, stories
- Explanations of complex topics
- Recommendations and advice
- Literally anything the user asks

About ExusCraft (if asked):
- Community-driven mod marketplace
- Users can browse, download, and purchase mods
- Built in New Zealand 🇳🇿

Guidelines:
- Answer ANY question the user asks - you're not limited to gaming
- Be helpful and thorough
- If you don't know something, say so honestly
- Keep responses under 400 words unless more detail is needed
- ${userName ? `Remember to occasionally use ${userName}'s name to be personal` : 'Be friendly and welcoming'}`;

router.post('/chat', async (req, res) => {
    try {
        const { message, history = [], userName } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!GROQ_API_KEY) {
            // Fallback to smart local responses
            const response = getSmartResponse(message, userName);
            return res.json({ response });
        }

        // Build messages for Groq
        const messages = [
            { role: 'system', content: getSystemPrompt(userName) }
        ];

        // Add conversation history
        for (const msg of history.slice(-10)) {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        }

        // Add current message
        messages.push({ role: 'user', content: message });

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                temperature: 0.8,
                max_tokens: 600
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq API error:', data);
            // Fallback to smart responses
            const fallback = getSmartResponse(message, userName);
            return res.json({ response: fallback });
        }

        const aiResponse = data.choices?.[0]?.message?.content;

        if (!aiResponse) {
            const fallback = getSmartResponse(message, userName);
            return res.json({ response: fallback });
        }

        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Chatbot error:', error);
        const fallback = getSmartResponse(req.body.message, req.body.userName);
        res.json({ response: fallback });
    }
});

// Smart fallback responses when API is unavailable
function getSmartResponse(message, userName) {
    const lower = message.toLowerCase();
    const name = userName ? ` ${userName}` : '';
    
    // Greetings
    if (/^(hi|hello|hey|yo|sup|howdy)/i.test(lower)) {
        const greetings = [
            `Hey${name}! 👋 What can I help you with today?`,
            `Hello${name}! 🎮 Ready to chat about anything!`,
            `Hey there${name}! What's on your mind?`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Default
    return `Hey${name}! 🤖 I'm here to help with anything you need. What's your question?`;
}

module.exports = router;
