/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

/**
 * Sends a message to a specified Telegram chat.
 *
 * @param botToken - The token of the Telegram bot.
 * @param chatId - The ID of the chat to send the message to.
 * @param text - The text of the message to be sent.
 * @param options - Additional options for the message, such as inline keyboards.
 *
 * @returns The response from the Telegram API.
 */
export async function sendTelegramMessage(botToken: string, chatId: string, text: string, replyMarkup?: any) {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: text,
        reply_markup: replyMarkup,
    })
    return response.data
}

export async function editTelegramMessage(botToken: string, chatId: string, messageId: number, text: string) {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text: text,
    })
    return response.data
}
