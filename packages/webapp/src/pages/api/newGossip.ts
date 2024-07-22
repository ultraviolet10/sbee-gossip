import { NextApiRequest, NextApiResponse } from 'next';

import { sendTelegramMessage } from '@/utils/api-utils';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_API_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { gossipContent } = req.body;

  if (!gossipContent) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {

    const response = await sendTelegramMessage(
      TELEGRAM_BOT_TOKEN as string,
      TELEGRAM_CHAT_ID as string,
      "New hot gossip! Click to reveal:",
      {
        inline_keyboard: [[
          {
            text: "Reveal Gossip",
            callback_data: JSON.stringify({ action: 'reveal', content: gossipContent })
          }
        ]]
      }
    );

    if (response.data.ok) {
      res.status(200).json({ message: 'Message sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send message' });
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}