export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userInput = req.body.messages?.[0]?.content;
  const apiKey = process.env.GEMINI_API_KEY; // Store safely in .env.local

  if (!userInput || !apiKey) {
    return res.status(400).json({ error: 'Missing input or API key' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log('📦 Gemini Response:', JSON.stringify(data, null, 2));

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ reply: '❌ Gemini से कोई जवाब नहीं मिला।', debug: data });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to get response from Gemini' });
  }
}
