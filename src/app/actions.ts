'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type {GenerateProjectDescriptionInput} from '@/ai/flows/generate-project-description';


const formSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required.'),
  projectBrief: z.string().min(1, 'Project brief is required.'),
  desiredSkills: z.string().min(1, 'Desired skills are required.'),
  budget: z.string().min(1, 'Budget is required.'),
});

const GenerateProjectDescriptionOutputSchema = z.object({
  projectDescription: z.string().describe('The generated project description.'),
});

export async function handleGenerateDescription(input: GenerateProjectDescriptionInput) {
  const parsedInput = formSchema.safeParse(input);

  if (!parsedInput.success) {
    const firstError = parsedInput.error.errors[0]?.message || 'Please fill in all required fields.';
    return { success: false, error: firstError };
  }

  try {
    const prompt = ai.definePrompt({
      name: 'generateProjectDescriptionPrompt_action',
      input: { schema: formSchema },
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

    const { output } = await prompt(parsedInput.data);

    if (!output) {
      throw new Error('AI failed to generate a description.');
    }

    return { success: true, description: output.projectDescription };
  } catch (error) {
    console.error('Error generating project description:', error);
    return { success: false, error: 'Failed to generate description due to a server error. Please try again later.' };
  }
}
