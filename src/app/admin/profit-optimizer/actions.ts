
'use server';

import { analyzeProjectsForProfit } from '@/ai/flows/analyze-project-profitability';
import type { ProjectAnalysisInput, ProjectAnalysisOutput } from '@/features/projects/types';

/**
 * Runs the fetched open projects through the AI profitability analysis flow and returns the results.
 * The data fetching is now done on the client to ensure proper authentication context.
 * @param projectsToAnalyze The array of projects to be analyzed.
 */
export async function getProfitabilityAnalysis(
  projectsToAnalyze: ProjectAnalysisInput
): Promise<ProjectAnalysisOutput> {
  try {
    // If there are no projects, return an empty analysis immediately.
    if (!projectsToAnalyze || projectsToAnalyze.length === 0) {
      return { analysis: [] };
    }
    
    // Call the AI flow with the projects provided by the client.
    const analysisResult = await analyzeProjectsForProfit(projectsToAnalyze);
    
    return analysisResult;

  } catch (error) {
    console.error("Error in getProfitabilityAnalysis server action:", error);
    if (error instanceof Error) {
        // Re-throw the error to be caught by the client component's try-catch block.
        // This allows for specific error messages (like API key issues) to be shown.
        throw error;
    }
    throw new Error('An unknown error occurred during the AI analysis.');
  }
}
