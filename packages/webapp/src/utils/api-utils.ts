import axios from "axios";

// Helper function to send a message to Telegram
export async function sendTelegramMessage(token: string, chatId: string, text: string, replyMarkup?: any) {
    const response = await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text: text,
        reply_markup: replyMarkup
      }
    );
    return response.data;
  }