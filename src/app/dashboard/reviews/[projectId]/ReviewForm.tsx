"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { db, doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from "@/lib/firebase/client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoaderCircle, Star } from "lucide-react";
import { ReviewSchema, type ReviewFormValues } from "@/features/reviews/types";
import type { Project } from "@/features/projects/types";
import { revalidateReviewsPaths } from "@/features/reviews/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const StarRating = ({ field }: { field: any }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => field.onChange(ratingValue)}
                            className="hidden"
                        />
                        <Star
                            className={cn(
                                "h-8 w-8 cursor-pointer transition-colors",
                                ratingValue <= (hover || field.value) ? "text-accent fill-accent" : "text-muted-foreground"
                            )}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                );
            })}
        </div>
    );
};


export function ReviewForm() {
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const projectId = params.projectId as string;
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [loadingProject, setLoadingProject] = useState(true);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            rating: 0,
            comment: "",
            projectId: projectId,
            userId: user?.uid || "",
            userName: user?.displayName || "",
        },
    });
    
    useEffect(() => {
        if (user) {
            form.setValue('userId', user.uid);
            const name = user.displayName || `${user.email?.split('@')[0]}`;
            form.setValue('userName', name || "Anonymous");
        }
    }, [user, form]);
    
    useEffect(() => {
        const fetchProjectAndCheckReview = async () => {
            if (!user || !projectId) return;

            setLoadingProject(true);
            try {
                // Check for existing review
                const reviewsRef = collection(db, "reviews");
                const q = query(reviewsRef, where("projectId", "==", projectId), where("userId", "==", user.uid));
                const reviewSnapshot = await getDocs(q);
                if (!reviewSnapshot.empty) {
                    setAlreadyReviewed(true);
                }

                // Fetch project details
                const projectRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(projectRef);

                if (docSnap.exists() && docSnap.data().userId === user.uid) {
                    setProject(docSnap.data() as Project);
                } else {
                     toast({ variant: "destructive", title: "Error", description: "Project not found or you don't have permission to review it." });
                     router.push('/dashboard/reviews');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingProject(false);
            }
        };

        fetchProjectAndCheckReview();
    }, [projectId, user, router, toast]);

    const onSubmit = async (values: ReviewFormValues) => {
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'reviews'), {
                ...values,
                createdAt: serverTimestamp(),
            });
            await revalidateReviewsPaths();
            toast({
                title: "Review Submitted!",
                description: "Thank you for your feedback.",
            });
            router.push('/dashboard/reviews');
        } catch (error) {
            console.error("Error submitting review:", error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "Could not submit your review. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if(loadingProject) {
        return <Skeleton className="h-96 w-full" />;
    }

    if (alreadyReviewed) {
        return (
             <div className="text-center py-12">
                <h3 className="text-xl font-semibold">Already Reviewed</h3>
                <p className="mt-2 text-muted-foreground">You have already submitted a review for this project.</p>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2 className="text-2xl font-semibold">Review for: <span className="text-primary">{project?.projectTitle}</span></h2>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Overall Rating</FormLabel>
                            <FormControl>
                                <StarRating field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Feedback</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about your experience..."
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} size="lg">
                        {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Review
                    </Button>
                </div>
            </form>
        </Form>
    );
}
