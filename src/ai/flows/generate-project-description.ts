'use server';

/**
 * @fileOverview A project description generator AI agent.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectBrief: z.string().describe('A brief description of the project.'),
  desiredSkills: z.string().describe('The desired skills for the project.'),
  budget: z.string().describe('The budget for the project.'),
});

export type GenerateProjectDescriptionInput = z.infer<
  typeof GenerateProjectDescriptionInputSchema
>;

const GenerateProjectDescriptionOutputSchema = z.object({
  projectDescription: z.string().describe('The generated project description.'),
});

export type GenerateProjectDescriptionOutput = z.infer<
  typeof GenerateProjectDescriptionOutputSchema
>;

export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an expert project description writer.

You will use the following information to generate a comprehensive and appealing project description.

Project Title: {{{projectTitle}}}
Project Brief: {{{projectBrief}}}
Desired Skills: {{{desiredSkills}}}
Budget: {{{budget}}}

Generate a detailed project description that is attractive to freelancers. Make sure to include all the details in a well-organized manner and keep it under 300 words.
`,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
