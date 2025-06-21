
'use server';
/**
 * @fileOverview A flow to generate a project description using AI.
 *
 * - generateProjectDescription - A server action that takes project details and returns a generated description.
 */

import { ai } from '@/ai/genkit';
import { GenerateDescriptionInputSchema, GenerateDescriptionOutputSchema, type GenerateDescriptionInput } from '@/app/projects/types';

export async function generateProjectDescription(
  input: GenerateDescriptionInput
): Promise<{ projectDescription: string } | { error: string }> {

  const parsedInput = GenerateDescriptionInputSchema.safeParse(input);
  if (!parsedInput.success) {
      return { error: "Invalid input provided." };
  }

  try {
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

    const { output } = await descriptionGeneratorPrompt(parsedInput.data);
    
    if (!output) {
        return { error: "The AI failed to generate a description." };
    }

    return { projectDescription: output.projectDescription };
    
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred while generating the description." };
  }
}
