import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DONOR_DATABASE = `
BLOOD DONOR DATABASE (current as of February 2026):

| ID | Name        | Blood Type | Location      | Distance | Last Donation | Donations | Available | Verified |
|----|-------------|-----------|---------------|----------|---------------|-----------|-----------|----------|
| 1  | Juan D.     | O+        | Manila        | 1.2 km   | Jan 15, 2026  | 12        | Yes       | Yes      |
| 2  | Maria S.    | A+        | Quezon City   | 3.4 km   | Feb 1, 2026   | 8         | Yes       | Yes      |
| 3  | Carlos R.   | B-        | Manila        | 0.8 km   | Dec 20, 2025  | 5         | Yes       | Yes      |
| 4  | Ana L.      | O+        | Makati        | 5.1 km   | Feb 10, 2026  | 15        | Yes       | Yes      |
| 5  | Pedro M.    | AB+       | Pasig         | 4.2 km   | Jan 28, 2026  | 3         | No        | Yes      |
| 6  | Rosa T.     | O-        | Manila        | 2.0 km   | Feb 5, 2026   | 20        | Yes       | Yes      |
| 7  | Miguel A.   | A-        | Quezon City   | 6.3 km   | Nov 15, 2025  | 7         | Yes       | No       |
| 8  | Sofia C.    | B+        | Taguig        | 7.8 km   | Feb 12, 2026  | 10        | Yes       | Yes      |
| 9  | Diego P.    | O+        | Manila        | 1.5 km   | Jan 20, 2026  | 6         | Yes       | Yes      |
| 10 | Elena V.    | A+        | Mandaluyong   | 3.9 km   | Feb 8, 2026   | 9         | Yes       | Yes      |
| 11 | Roberto G.  | AB-       | Makati        | 5.6 km   | Jan 5, 2026   | 4         | Yes       | Yes      |
| 12 | Isabella F. | O+        | Pasig         | 4.0 km   | Feb 15, 2026  | 11        | Yes       | Yes      |

LOCATIONS COVERED: Manila, Quezon City, Makati, Pasig, Taguig, Mandaluyong

BLOOD TYPE COMPATIBILITY:
- O- is the universal donor (can donate to all types)
- AB+ is the universal recipient (can receive from all types)
- O+ can donate to O+, A+, B+, AB+
- A+ can donate to A+, AB+
- A- can donate to A+, A-, AB+, AB-
- B+ can donate to B+, AB+
- B- can donate to B+, B-, AB+, AB-
- AB+ can donate to AB+ only
- AB- can donate to AB+, AB-
`;

const SYSTEM_PROMPT = `You are BloodLink AI, an intelligent blood donor matching assistant. You help users find blood donors in their area and answer questions about blood donation.

You have access to a real-time donor database. Here is the current data:

${DONOR_DATABASE}

INSTRUCTIONS:
- When users ask about finding donors, search the database and provide specific matches.
- Always mention the donor's name, blood type, location, distance, and availability.
- If a donor is NOT available, say so and suggest available alternatives.
- Provide blood type compatibility information when relevant.
- Be warm, helpful, and concise. Use short paragraphs.
- If someone needs a blood type urgently, prioritize by distance (closest first).
- If no exact match is found, suggest compatible blood types.
- You can also answer general questions about blood donation (eligibility, process, etc.).
- Format your responses clearly. Use bullet points for lists of donors.
- Always remind users that for real emergencies they should contact their local hospital or blood bank directly.
- Keep responses focused and not too long — aim for 2-4 short paragraphs max unless the user asks for detail.`;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'sk-replace-with-your-actual-key') {
      res.status(400).json({
        error: 'OpenAI API key not configured. Open the .env file in your project root and replace the placeholder with your real API key from https://platform.openai.com/api-keys',
      });
      return;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.';

    res.json({ reply });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    console.error('OpenAI API error:', error.message);

    if (error.status === 401) {
      res.status(401).json({ error: 'Invalid OpenAI API key. Please check your .env file.' });
      return;
    }

    res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
