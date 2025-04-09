export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
  
    // Simulate AI bot logic
    const reply = `AgroAI says: You said "${message}"`;
  
    res.status(200).json({ reply });
  }
  