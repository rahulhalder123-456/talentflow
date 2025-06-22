
'use server';
/**
 * @fileOverview An AI chatbot flow for TalentBot.
 *
 * - continueConversation - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the function.
 * - ChatbotOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

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


/**
 * The main exported function that React components will call.
 * This function calls the Genkit flow.
 * @param input The user's message and the conversation history.
 * @returns The AI's response.
 */
export async function continueConversation(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}


// The Genkit flow definition
const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async ({ history, message }) => {
    
    // System prompt to define the chatbot's persona
    const systemPrompt = `You are TalentBot, a friendly and helpful AI assistant for the Talent Flow freelance marketplace. Your goal is to assist users, answer their questions about the platform, and guide them through its features. Be concise, friendly, and professional. The current time is ${new Date().toString()}.`;
    
    // Combine the existing history with the new user message.
    const fullConversationHistory = [...history, { role: 'user' as const, text: message }];

    // Convert the 'ai' role to 'model' and format for the Gemini API.
    const geminiMessages = fullConversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
      content: [{ text: msg.text }],
    }));

    // The Gemini API requires the conversation to start with a 'user' role.
    // Our initial message is from the 'ai', so we remove it if it's the first message.
    if (geminiMessages.length > 1 && geminiMessages[0].role === 'model') {
      geminiMessages.shift(); // Remove the initial AI greeting
    }

    // Call the AI model using the ai.generate() API with the `messages` property.
    // The previous code was using `prompt` and `history` which are invalid for this use case.
    const result = await ai.generate({
      model: googleAI.model('gemini-1.5-flash'),
      messages: geminiMessages,
      system: systemPrompt,
    });

    const response = result.text;
    
    return { response };
  }
);
