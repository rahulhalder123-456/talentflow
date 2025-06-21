'use server';
/**
 * @fileOverview A Genkit flow for generating a detailed project description.
 *
 * - generateProjectDescription - A function that creates a project description from a brief.
 * - GenerateDescriptionInput - The input type for the function.
 * - GenerateDescriptionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const GenerateDescriptionInputSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required.'),
  projectBrief: z.string().min(1, 'Project brief is required.'),
  desiredSkills: z.string().min(1, 'Desired skills are required.'),
});
export type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

export const GenerateDescriptionOutputSchema = z.object({
  projectDescription: z.string().describe('The generated detailed project description.'),
});
export type GenerateDescriptionOutput = z.infer<typeof GenerateDescriptionOutputSchema>;


const descriptionGeneratorPrompt = ai.definePrompt({
  name: 'projectDescriptionGenerator',
  input: {schema: GenerateDescriptionInputSchema},
  output: {schema: GenerateDescriptionOutputSchema},
  prompt: `You are an expert project manager and proposal writer. Based on the following project details, write a comprehensive and compelling project description that would be suitable for a freelance marketplace.

The description should be clear, detailed, and outline the key deliverables, requirements, and scope.

Project Title: {{{projectTitle}}}

Project Brief: {{{projectBrief}}}

Desired Skills: {{{desiredSkills}}}

Generate the detailed project description now.`,
});

const generateDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDescriptionFlow',
    inputSchema: GenerateDescriptionInputSchema,
    outputSchema: GenerateDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await descriptionGeneratorPrompt(input);
    return output!;
  }
);

export async function generateProjectDescription(
  input: GenerateDescriptionInput
): Promise<GenerateDescriptionOutput> {
  // Validate input again on the server-side
  const parsedInput = GenerateDescriptionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input for generating description.');
  }

  return await generateDescriptionFlow(parsedInput.data);
}
