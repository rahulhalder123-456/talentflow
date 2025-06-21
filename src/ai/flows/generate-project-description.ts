
'use server';
/**
 * @fileOverview A flow to generate a project description using AI.
 *
 * This file contains a single server action `generateProjectDescription`
 * that takes project details and returns a generated description.
 * It is designed to be called directly from client components.
 */

import { ai } from '@/ai/genkit';
import { GenerateDescriptionInputSchema, GenerateDescriptionOutputSchema, type GenerateDescriptionInput } from '@/app/projects/types';

const descriptionGeneratorPrompt = ai.definePrompt({
    name: 'projectDescriptionGenerator',
    input: { schema: GenerateDescriptionInputSchema },
    output: { schema: GenerateDescriptionOutputSchema },
    prompt: `You are an expert project manager and proposal writer. Based on the following project details, write a comprehensive and compelling project description that would be suitable for a freelance marketplace.

The description should be clear, detailed, and outline the key deliverables, requirements, and scope.

Project Title: {{{projectTitle}}}
Project Brief: {{{projectBrief}}}
Desired Skills: {{{desiredSkills}}}

Generate the detailed project description now.`,
});


// This is the only export from this file.
export async function generateProjectDescription(
  input: GenerateDescriptionInput
): Promise<{ projectDescription: string } | { error: string }> {

  const parsedInput = GenerateDescriptionInputSchema.safeParse(input);
  if (!parsedInput.success) {
      // Creates a user-friendly error message from the validation issues.
      const errorMessages = parsedInput.error.issues.map(issue => issue.message).join(' ');
      return { error: `Invalid input: ${errorMessages}` };
  }

  try {
    const { output } = await descriptionGeneratorPrompt(parsedInput.data);
    
    if (!output) {
        return { error: "The AI failed to generate a description." };
    }

    return { projectDescription: output.projectDescription };
    
  } catch (e) {
    console.error("AI Generation Error:", e);
    let errorMessage = "An unexpected error occurred while generating the description.";
    if (e instanceof Error) {
        // Provide a more specific error if the API key is the issue.
        if (e.message.includes('API key not valid') || e.message.includes('provide an API key')) {
            errorMessage = "The Google AI API key is missing or invalid. Please check your .env.local file and ensure the GOOGLE_API_KEY is set correctly.";
        } else {
             // Pass along other error messages from the AI service.
            errorMessage = e.message;
        }
    }
    return { error: errorMessage };
  }
}
