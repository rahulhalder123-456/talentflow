"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { db, collection, query, where, onSnapshot } from "@/lib/firebase/client";
import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquarePlus } from "lucide-react";
import type { Project } from "@/features/projects/types";

type Review = {
    projectId: string;
};

export function ReviewableProjectsList() {
    const { user, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [reviewedProjectIds, setReviewedProjectIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(true);
            const projectsQuery = query(collection(db, "projects"), where("userId", "==", user.uid), where("status", "==", "Closed"));
            const reviewsQuery = query(collection(db, "reviews"), where("userId", "==", user.uid));

            const unsubscribeProjects = onSnapshot(projectsQuery, (querySnapshot) => {
                const projectsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        deadline: data.deadline?.toDate().toISOString(),
                    } as Project;
                });
                setProjects(projectsData);
            });
            
            const unsubscribeReviews = onSnapshot(reviewsQuery, (querySnapshot) => {
                const reviewedIds = new Set(querySnapshot.docs.map(doc => doc.data().projectId));
                setReviewedProjectIds(reviewedIds);
                setLoading(false);
            }, () => setLoading(false));
            

            return () => {
                unsubscribeProjects();
                unsubscribeReviews();
            };
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);
    
    const reviewableProjects = projects.filter(p => !reviewedProjectIds.has(p.id));

    if (loading || authLoading) {
        return <Loader />;
    }

    return (
         <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
                <CardDescription>Share your experience on completed projects.</CardDescription>
            </CardHeader>
            <CardContent>
                {reviewableProjects.length > 0 ? (
                    <div className="space-y-4">
                        {reviewableProjects.map(project => (
                            <div key={project.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/50 p-4">
                                <div>
                                    <h3 className="font-semibold">{project.projectTitle}</h3>
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                </div>
                                <Button asChild>
                                    <Link href={`/dashboard/reviews/${project.id}`}>
                                        <Star className="mr-2 h-4 w-4" />
                                        Write a Review
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/60 p-12 text-center">
                        <MessageSquarePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">No Projects to Review</h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                            You have no completed projects that are awaiting a review.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
