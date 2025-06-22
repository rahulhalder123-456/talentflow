
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, LoaderCircle, TrendingUp, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getProfitabilityAnalysis } from './actions';
import type { ProjectAnalysisOutput } from '@/features/projects/types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';


export default function ProfitOptimizerPage() {
    const [analysis, setAnalysis] = useState<ProjectAnalysisOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAnalyze = async () => {
        setIsLoading(true);
        setAnalysis(null);
        try {
            const result = await getProfitabilityAnalysis();
            setAnalysis(result);
            if (result.analysis.length === 0) {
                 toast({
                    title: "No Open Projects",
                    description: "There are no open projects to analyze right now.",
                });
            } else {
                 toast({
                    title: "Analysis Complete!",
                    description: "Projects have been ranked by profitability potential.",
                });
            }
        } catch (error: any) {
            console.error("Analysis failed:", error);
            toast({
                variant: "destructive",
                title: "Analysis Failed",
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const getScoreBadgeVariant = (score: number) => {
        if (score > 75) return 'default';
        if (score > 50) return 'secondary';
        return 'destructive';
    }

    return (
        <main className="flex-1 py-12">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="mb-8">
                    <Button variant="ghost" asChild>
                    <Link href="/admin/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Admin Dashboard
                    </Link>
                    </Button>
                </div>

                <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                    <h1 className="font-headline text-4xl font-bold tracking-tight flex items-center gap-3">
                        <TrendingUp className="h-10 w-10 text-primary" />
                        Profitability Optimizer
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Use AI to identify high-value projects and maximize platform revenue.
                    </p>
                    </div>
                    <Button onClick={handleAnalyze} disabled={isLoading} size="lg">
                        {isLoading ? (
                            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-5 w-5" />
                        )}
                        {isLoading ? 'Analyzing...' : 'Analyze Open Projects'}
                    </Button>
                </div>

                {isLoading && (
                    <div className="text-center py-12">
                        <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <p className="mt-4 text-muted-foreground">AI is analyzing projects... this may take a moment.</p>
                    </div>
                )}
                
                {analysis && analysis.analysis.length > 0 && (
                    <div className="space-y-6">
                        {analysis.analysis.map((item, index) => (
                             <Card key={item.id} className="bg-secondary/20 border-border/50 shadow-lg transition-all hover:border-primary/50 hover:shadow-primary/10">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl flex items-center">
                                                <span className="text-primary font-bold mr-4">#{index + 1}</span>
                                                {item.projectTitle}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                Project ID: <span className="font-mono text-xs">{item.id}</span>
                                            </CardDescription>
                                        </div>
                                        <Badge variant={getScoreBadgeVariant(item.profitabilityScore)} className="text-lg">
                                            {item.profitabilityScore}
                                            <span className="text-xs ml-1.5 opacity-80">/ 100</span>
                                        </Badge>
                                    </div>
                                    <div className="pt-2">
                                        <Progress value={item.profitabilityScore} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">Profitability Score</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="border-t border-border/50 pt-4">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent" /> AI Justification</h4>
                                        <p className="text-muted-foreground italic">"{item.justification}"</p>
                                    </div>
                                     <div className="mt-4 text-right">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={`/projects/${item.id}`}>View Project</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
                
                {analysis && analysis.analysis.length === 0 && !isLoading && (
                     <Card className="bg-secondary/20 border-border/50 shadow-lg">
                        <CardContent className="py-12 text-center">
                            <h3 className="text-xl font-semibold">No Open Projects Found</h3>
                            <p className="mt-2 text-muted-foreground">There are no projects with the status "Open" to analyze at this time.</p>
                        </CardContent>
                    </Card>
                )}
                
                 {!analysis && !isLoading && (
                     <Card className="bg-secondary/20 border-2 border-dashed border-border/50 shadow-none">
                        <CardContent className="py-20 text-center">
                            <TrendingUp className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h3 className="mt-4 text-xl font-semibold">Ready for Analysis</h3>
                            <p className="mb-6 mt-2 text-sm text-muted-foreground">
                                Click the button above to have our AI analyze your project pipeline.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    )
}
