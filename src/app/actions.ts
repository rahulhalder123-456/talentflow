'use server';

import { generateProjectDescription, GenerateProjectDescriptionInput } from '@/ai/flows/generate-project-description';
import { z } from 'zod';

const formSchema = z.object({
  projectTitle: z.string().min(1),
  projectBrief: z.string().min(1),
  desiredSkills: z.string().min(1),
  budget: z.string().min(1),
});

export async function handleGenerateDescription(input: GenerateProjectDescriptionInput) {
  const parsedInput = formSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    const result = await generateProjectDescription(parsedInput.data);
    return { success: true, description: result.projectDescription };
  } catch (error) {
    console.error('Error generating project description:', error);
    return { success: false, error: 'Failed to generate description due to a server error. Please try again later.' };
  }
}
