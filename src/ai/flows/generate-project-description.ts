'use server';
/**
 * @fileOverview A flow to generate a project description using AI.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateDescriptionInputSchema,
  GenerateDescriptionOutputSchema,
  type GenerateDescriptionInput,
  type GenerateDescriptionOutput,
} from '@/app/projects/types';
import { googleAI } from '@genkit-ai/googleai';

const descriptionGeneratorPrompt = ai.definePrompt({
  name: 'projectDescriptionGenerator',
  model: googleAI.model('gemini-1.5-flash'), // ✅ Dynamically resolved
  input: { schema: GenerateDescriptionInputSchema },
  output: { schema: GenerateDescriptionOutputSchema },
  prompt: `You are an expert project manager and proposal writer. Based on the following project details, write a comprehensive and compelling project description that would be suitable for a freelance marketplace.

The description should be clear, detailed, and outline the key deliverables, requirements, and scope.

Project Title: {{{projectTitle}}}
Project Brief: {{{projectBrief}}}
Desired Skills: {{{desiredSkills}}}

Generate the detailed project description now.`,
});

export async function generateProjectDescription(
  input: GenerateDescriptionInput
): Promise<GenerateDescriptionOutput> {
  const parsedInput = GenerateDescriptionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    const errorMessages = parsedInput.error.issues
      .map((issue) => issue.message)
      .join(' ');
    throw new Error(`Invalid input: ${errorMessages}`);
  }

  const { output } = await descriptionGeneratorPrompt(parsedInput.data);

  if (!output) {
    throw new Error('The AI failed to generate a description.');
  }

  return output;
}
