
import { z } from 'zod';

export const ProjectFormSchema = z.object({
  projectTitle: z.string().min(5, "Title must be at least 5 characters."),
  projectBrief: z.string().min(20, "Brief must be at least 20 characters."),
  desiredSkills: z.string().min(3, "Please list at least one skill (e.g., React, Figma)."),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Budget must be a valid number.").min(1, "Budget is required."),
  deadline: z.date({ required_error: "A deadline for the project is required." }),
  paymentType: z.string({ required_error: "Please select a payment type." }),
  projectDescription: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

export const GenerateDescriptionInputSchema = z.object({
  projectTitle: z.string(),
  projectBrief: z.string(),
  desiredSkills: z.string(),
});
export type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

export const GenerateDescriptionOutputSchema = z.object({
    projectDescription: z.string().describe('The generated detailed project description.'),
});
export type GenerateDescriptionOutput = z.infer<typeof GenerateDescriptionOutputSchema>;
