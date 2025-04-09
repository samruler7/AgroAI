import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: # .env.local
  OPENROUTER_API_KEY=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
  ,
});

export default async function handler(req, res) {
  const userMessage = req.body.message;

  try {
    const completion = await client.chat.completions.create({
      model: 'nvidia/llama-3.1-nemotron-nano-8b-v1:free',
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating chat completion:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
