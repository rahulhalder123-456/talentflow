
'use server';
/**
 * @fileOverview An AI flow to analyze projects for profitability potential.
 *
 * - analyzeProjectsForProfit - A function that takes open projects and returns a ranked analysis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import {
  ProjectAnalysisInputSchema,
  ProjectAnalysisOutputSchema,
  type ProjectAnalysisInput,
  type ProjectAnalysisOutput,
} from '@/features/projects/types';


// The main exported function that React components will call.
export async function analyzeProjectsForProfit(
  input: ProjectAnalysisInput
): Promise<ProjectAnalysisOutput> {
  // Directly call the flow. Input validation is handled by the flow itself.
  const result = await profitabilityAnalysisFlow(input);
  // Sort the results by profitability score in descending order before returning
  result.analysis.sort((a, b) => b.profitabilityScore - a.profitabilityScore);
  return result;
}


// Define the prompt for the AI
const profitabilityPrompt = ai.definePrompt({
  name: 'projectProfitabilityPrompt',
  model: googleAI.model('gemini-1.5-flash'),
  input: { schema: ProjectAnalysisInputSchema },
  output: { schema: ProjectAnalysisOutputSchema },
  prompt: `You are a brilliant business strategist for "Talent Flow," a freelance marketplace. Your task is to analyze a list of open projects and determine their potential profitability for the platform.

Your analysis should result in a "profitabilityScore" from 0-100 for each project.

Consider these factors in your scoring:
1.  **Budget**: Higher budgets are a strong positive signal. This is the most important factor.
2.  **Clarity & Scope**: Is the project brief clear, detailed, and well-defined? Clear projects are easier to staff and have a higher success rate, leading to guaranteed platform fees. Ambiguous or vague briefs should be scored lower.
3.  **Skill Demand**: Are the desired skills common and in high demand (e.g., React, Python, UI/UX Design), or are they very niche and hard to find? Projects with common skills are easier to staff quickly.

Based on these factors, analyze the following projects. Provide a score and a concise justification for each one.

Projects:
{{#each this}}
- Project ID: {{id}}
- Title: {{projectTitle}}
- Brief: {{projectBrief}}
- Budget: {{budget}}
- Skills: {{desiredSkills}}
---
{{/each}}
`,
});

// Define the Genkit flow
const profitabilityAnalysisFlow = ai.defineFlow(
  {
    name: 'profitabilityAnalysisFlow',
    inputSchema: ProjectAnalysisInputSchema,
    outputSchema: ProjectAnalysisOutputSchema,
  },
  async (projects) => {
    const { output } = await profitabilityPrompt(projects);
    if (!output) {
      throw new Error('The AI failed to generate a profitability analysis.');
    }
    return output;
  }
);
