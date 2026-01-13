const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// System prompt to give the AI context
const SYSTEM_PROMPT = `You are ExusBot, a friendly and knowledgeable AI assistant for ExusCraft - a gaming mod marketplace website. 

Your personality:
- Friendly, helpful, and enthusiastic about gaming
- Use emojis occasionally to be expressive 🎮
- Keep responses concise but informative
- You're an expert on game modding, installation, troubleshooting, and gaming in general

Your knowledge areas:
- Mod installation for all major games (Minecraft, Skyrim, GTA V, Cyberpunk 2077, Fallout 4, Witcher 3, Rust, etc.)
- Troubleshooting crashes, conflicts, and performance issues
- Game-specific modding tools (Forge, Fabric, SKSE, ScriptHookV, Vortex, Mod Organizer 2, etc.)
- Graphics mods, shaders, ENBs, ReShade
- Programming and development (JavaScript, Python, etc.)
- General gaming knowledge and recommendations

About ExusCraft:
- Community-driven mod marketplace
- Users can browse, download, and purchase mods
- Users can create and share mod collections
- Built in New Zealand 🇳🇿
- Safe, virus-scanned downloads

Guidelines:
- If asked about non-gaming/non-tech topics, politely redirect to your expertise
- Never share harmful content or help with cheating in online games
- Be encouraging to new modders
- Recommend backing up saves before modding
- Keep responses under 300 words unless detailed instructions are needed`;

router.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'AI service not configured' });
        }

        // Build conversation history for context
        const contents = [];
        
        // Add system prompt as first user message (Gemini doesn't have system role)
        contents.push({
            role: 'user',
            parts: [{ text: SYSTEM_PROMPT + '\n\nPlease acknowledge you understand and are ready to help.' }]
        });
        contents.push({
            role: 'model',
            parts: [{ text: 'I understand! I\'m ExusBot, ready to help with all your gaming and modding questions! 🎮 What can I help you with?' }]
        });

        // Add conversation history
        for (const msg of history.slice(-10)) { // Keep last 10 messages for context
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            });
        }

        // Add current message
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API error:', data);
            return res.status(500).json({ error: 'AI service error', details: data.error?.message });
        }

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            return res.status(500).json({ error: 'No response from AI' });
        }

        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

module.exports = router;
