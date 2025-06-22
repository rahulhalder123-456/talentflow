
import { z } from 'zod';

// Schema for a single message in the chat history
const MessageSchema = z.object({
  role: z.enum(['user', 'ai']).describe("The role of the message sender."),
  text: z.string().describe("The text content of the message."),
});

// Input schema for the chatbot flow
export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).describe("The history of the conversation so far."),
  message: z.string().describe("The user's latest message."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Output schema for the chatbot flow
export const ChatbotOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
