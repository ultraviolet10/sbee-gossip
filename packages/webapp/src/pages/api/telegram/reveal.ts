import { NextApiRequest, NextApiResponse } from "next"

import { editTelegramMessage } from "@/utils/api-utils"

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_API_TOKEN
// const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID

/**
 * API route handler for sending a message to a Telegram bot.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    const update = req.body

    if (update.callback_query) {
        const { message, data } = update.callback_query
        try {
            const { action, content } = JSON.parse(data)
            if (action === "reveal") {
                await editTelegramMessage(TELEGRAM_BOT_TOKEN as string, message.chat.id, message.message_id, content)
                return res.status(200).json({ message: "Message revealed successfully" })
            }
        } catch (error) {
            console.error("Error processing callback query:", error)
            return res.status(500).json({ message: "Failed to process callback query" })
        }
    }

    // Handle other types of updates if needed

    res.status(200).json({ message: "Update processed successfully" })
}
