
'use server';
/**
 * @fileOverview A flow to generate a project description using AI.
 *
 * This file contains a single server action `generateProjectDescription`
 * that takes project details and returns a generated description.
 * It is designed to be called directly from client components.
 */

import { ai } from '@/ai/genkit';
import { GenerateDescriptionInputSchema, GenerateDescriptionOutputSchema, type GenerateDescriptionInput, type GenerateDescriptionOutput } from '@/app/projects/types';

// The prompt is defined once at the module level for efficiency.
const descriptionGeneratorPrompt = ai.definePrompt({
    name: 'projectDescriptionGenerator',
    model: 'gemini-pro',
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
): Promise<GenerateDescriptionOutput> {
  const parsedInput = GenerateDescriptionInputSchema.safeParse(input);
  if (!parsedInput.success) {
      const errorMessages = parsedInput.error.issues.map(issue => issue.message).join(' ');
      throw new Error(`Invalid input: ${errorMessages}`);
  }

  const { output } = await descriptionGeneratorPrompt(parsedInput.data);
  
  if (!output) {
      throw new Error("The AI failed to generate a description.");
  }

  return output;
}
