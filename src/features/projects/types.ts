
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

export type Project = {
    id: string;
    projectTitle: string;
    projectDescription: string;
    projectBrief: string;
    budget: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdAt: Date;
    deadline: Date;
    paymentType: string;
    desiredSkills: string;
    userId: string;
    amountPaid?: number;
};

// --- Time Tracking ---
export const TimeEntrySchema = z.object({
  amount: z.number().positive("Amount must be positive."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  loggedAt: z.date(),
  status: z.enum(['pending', 'approved', 'paid']),
  loggerId: z.string(),
});
export type TimeEntry = {
    id: string;
    amount: number;
    description: string;
    loggedAt: Date;
    status: 'pending' | 'approved' | 'paid';
    loggerId: string;
};


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


// --- Profitability Analysis Schemas & Types ---

// Input schema for a single project for analysis
const ProjectAnalysisInputItemSchema = z.object({
  id: z.string(),
  projectTitle: z.string(),
  projectBrief: z.string(),
  budget: z.string(),
  desiredSkills: z.string(),
});

// Input schema for the flow (an array of projects)
export const ProjectAnalysisInputSchema = z.array(ProjectAnalysisInputItemSchema);
export type ProjectAnalysisInput = z.infer<typeof ProjectAnalysisInputSchema>;

// Output schema for a single analyzed project
const AnalyzedProjectSchema = z.object({
  id: z.string().describe('The original ID of the project.'),
  projectTitle: z.string().describe('The original title of the project.'),
  profitabilityScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score from 0 to 100 representing the profit potential for the platform. Higher is better.'
    ),
  justification: z
    .string()
    .describe(
      'A brief justification for the assigned score, highlighting key factors like budget, clarity, and skill demand.'
    ),
});

// Output schema for the flow (an array of analyzed projects)
export const ProjectAnalysisOutputSchema = z.object({
  analysis: z.array(AnalyzedProjectSchema),
});
export type ProjectAnalysisOutput = z.infer<typeof ProjectAnalysisOutputSchema>;
