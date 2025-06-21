'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateDescriptionInputSchema = z.object({
  projectTitle: z.string().min(5, "Title must be at least 5 characters."),
  projectBrief: z.string().min(20, "Brief must be at least 20 characters."),
  desiredSkills: z.string().min(3, "Please list at least one skill."),
});
type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

const GenerateDescriptionOutputSchema = z.object({
    projectDescription: z.string().describe('The generated detailed project description.'),
});

export async function handleGenerateDescription(input: GenerateDescriptionInput) {
    const parsedInput = GenerateDescriptionInputSchema.safeParse(input);

    if (!parsedInput.success) {
        throw new Error("Invalid input provided to the server action.");
    }

    const descriptionGeneratorPrompt = ai.definePrompt({
        name: 'projectDescriptionGenerator',
        input: { schema: GenerateDescriptionInputSchema },
        output: { schema: GenerateDescriptionOutputSchema },
        prompt: `You are an expert project manager and proposal writer. Based on the following project details, write a comprehensive and compelling project description that would be suitable for a freelance marketplace.

The description should be clear, detailed, and outline the key deliverables, requirements, and scope.

Project Title: {{{projectTitle}}}

Project Brief: {{{projectBrief}}}

Desired Skills: {{{desiredSkills}}}

Generate the detailed project description now.`
    });

    const { output } = await descriptionGeneratorPrompt(parsedInput.data);
    
    if (!output) {
        throw new Error("The AI failed to generate a description.");
    }

    return output;
}
