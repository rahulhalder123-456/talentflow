
'use server';

/**
 * @fileOverview A project description generator AI agent.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GenerateProjectDescriptionInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectBrief: z.string().describe('A brief description of the project.'),
  desiredSkills: z.string().describe('The desired skills for the project.'),
  budget: z.string().describe('The budget for the project.'),
});

export type GenerateProjectDescriptionInput = z.infer<typeof GenerateProjectDescriptionInputSchema>;

// Output Schema
const GenerateProjectDescriptionOutputSchema = z.object({
  projectDescription: z.string().describe('The generated project description.'),
});

export type GenerateProjectDescriptionOutput = z.infer<typeof GenerateProjectDescriptionOutputSchema>;

// Main callable server function
export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

// Define the prompt
const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: { schema: GenerateProjectDescriptionInputSchema },
  output: { schema: GenerateProjectDescriptionOutputSchema },
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `
You are an expert project description writer.

Your task is to generate a compelling, clear, and detailed project description under 300 words using the following inputs:

Project Title: {{{projectTitle}}}
Project Brief: {{{projectBrief}}}
Desired Skills: {{{desiredSkills}}}
Budget: {{{budget}}}

The output should be a detailed project description.
`,
});

// Flow definition with error handling
const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    // Genkit will throw an error if the output does not match the schema,
    // so we can be confident in the output if we reach this point.
    // The '!' tells TypeScript we are sure `output` is not null/undefined.
    return output!;
  }
);
