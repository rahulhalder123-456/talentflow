
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { addFeaturedProject } from "./actions";
import { FeaturedProjectSchema, type FeaturedProjectFormValues } from "@/features/landing/types";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export function FeaturedWorkForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FeaturedProjectFormValues>({
        resolver: zodResolver(FeaturedProjectSchema),
        defaultValues: {
            projectType: undefined,
            title: "",
            description: "",
            imageUrl: "",
            projectUrl: "",
            appStoreUrl: "",
            playStoreUrl: "",
        },
    });

    const projectType = form.watch("projectType");

    const onSubmit = async (values: FeaturedProjectFormValues) => {
        setIsSubmitting(true);
        try {
            await addFeaturedProject(values);
            toast({
                title: "Project Added!",
                description: "The new project has been added to your showcase.",
            });
            form.reset();
            // In a real app, you'd likely want to refresh the list of projects shown above the form
            // For simplicity, we just reload the page to show the new project.
            router.refresh();

        } catch (error) {
            console.error("Failed to add featured project:", error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "Could not add the project. Please check your Firestore rules and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Add New Featured Project</CardTitle>
                <CardDescription>
                    Fill out the form to add a new app or website to the homepage showcase.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., QuantumLeap CRM" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A short, compelling description of the project." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a direct link to the project's showcase image (e.g., from a CDN or storage bucket).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Project Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="website" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Website
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="mobile" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Mobile App
                                        </FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        {projectType === 'website' && (
                            <FormField
                                control={form.control}
                                name="projectUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://www.example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {projectType === 'mobile' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="appStoreUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>App Store URL (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://apps.apple.com/..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="playStoreUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Play Store URL (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://play.google.com/..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                )}
                                Add Project to Showcase
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
