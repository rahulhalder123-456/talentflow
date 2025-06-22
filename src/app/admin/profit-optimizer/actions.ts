
'use server';

import { db, collection, query, where, getDocs } from '@/lib/firebase/client';
import { analyzeProjectsForProfit } from '@/ai/flows/analyze-project-profitability';
import type { ProjectAnalysisInput, ProjectAnalysisOutput } from '@/features/projects/types';

/**
 * Fetches open projects from Firestore, runs them through the AI profitability
 * analysis flow, and returns the results.
 */
export async function getProfitabilityAnalysis(): Promise<ProjectAnalysisOutput> {
  try {
    // 1. Fetch all "Open" projects from Firestore.
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('status', '==', 'Open'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return { analysis: [] };
    }

    // 2. Format the data for the AI flow.
    const projectsToAnalyze: ProjectAnalysisInput = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            projectTitle: data.projectTitle || '',
            projectBrief: data.projectBrief || '',
            budget: data.budget || '0',
            desiredSkills: data.desiredSkills || '',
        };
    });

    // 3. Call the AI flow.
    const analysisResult = await analyzeProjectsForProfit(projectsToAnalyze);
    
    return analysisResult;

  } catch (error) {
    console.error("Error in getProfitabilityAnalysis:", error);
    // In a real app, you might have more robust error handling
    // For now, we'll throw the error to be caught by the client component.
    if (error instanceof Error) {
        throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred during analysis.');
  }
}
