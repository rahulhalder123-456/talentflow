
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, LoaderCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

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
import { useAuth } from '@/hooks/use-auth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectFormSchema, type ProjectFormValues } from '@/app/projects/types';
import { generateProjectDescription } from '@/ai/flows/generate-project-description';
import { createProject } from '@/app/projects/actions';

export function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      projectTitle: "",
      projectBrief: "",
      desiredSkills: "",
      budget: "",
      projectDescription: "",
    },
  });

  const paymentType = form.watch('paymentType');

  const getBudgetLabel = () => {
    switch (paymentType) {
        case 'hourly':
            return 'Hourly Rate (USD)';
        case 'daily':
            return 'Daily Rate (USD)';
        default:
            return 'Fixed Budget (USD)';
    }
  };

  const getBudgetPlaceholder = () => {
      switch (paymentType) {
          case 'hourly':
              return 'e.g., 50';
          case 'daily':
              return 'e.g., 400';
          default:
              return 'e.g., 5000';
      }
  };

  const handleGenerateClick = async () => {
    // Trigger validation for only the fields required for generation
    const isValid = await form.trigger(["projectTitle", "projectBrief", "desiredSkills"]);
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in the Project Title, Brief, and Desired Skills before generating a description.",
      });
      return;
    }
    
    const { projectTitle, projectBrief, desiredSkills } = form.getValues();

    setIsGenerating(true);
    try {
      const result = await generateProjectDescription({
        projectTitle,
        projectBrief,
        desiredSkills,
      });

      form.setValue('projectDescription', result.projectDescription, { shouldValidate: true });
      toast({
        title: "Description Generated!",
        description: "The project description has been filled in for you.",
      });

    } catch (error: any) {
      console.error("Error generating description:", error);
      let errorMessage = "An unexpected error occurred. Please check the server logs.";
      if (error.message) {
          if (error.message.includes('API key') || error.message.includes('API_KEY')) {
              errorMessage = "Your Google AI API key is invalid, expired, or missing. Please check your .env.local file and restart the server.";
          } else if (error.message.includes('404') || error.message.includes('Not Found') || error.message.includes('NOT_FOUND')) {
              errorMessage = "The AI model was not found. This can happen if the model name is incorrect or not available in your region.";
          } else {
              errorMessage = error.message;
          }
      }
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: errorMessage,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  async function onSubmit(values: ProjectFormValues) {
    if (!user) {
      toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in to post a project." });
      return;
    }

    setIsSubmitting(true);
    
    const result = await createProject(values, user.uid);

    setIsSubmitting(false);

    if (result.success) {
        toast({
            title: "Project Submitted!",
            description: "Your project is now being listed.",
        });
        router.push('/dashboard/projects');
    } else {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: result.error || "Could not submit your project. Please try again.",
        });
    }
  }

  return (
    <Card className="bg-secondary/20 border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Project Details</CardTitle>
        <CardDescription>
          Fill out the form below to get your project posted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., E-commerce Website Redesign" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Project Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a payment model" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="hourly">Per Hour</SelectItem>
                            <SelectItem value="daily">Per Day</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getBudgetLabel()}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={getBudgetPlaceholder()} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="projectBrief"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Brief</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe what you need. What are the main goals of this project?"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Node.js, UI/UX Design, Copywriting" {...field} />
                  </FormControl>
                  <FormDescription>
                    List the skills you're looking for, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Project Description</FormLabel>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleGenerateClick}
                      disabled={isGenerating}
                      variant="secondary"
                      className="bg-accent/80 text-accent-foreground hover:bg-accent"
                    >
                      {isGenerating ? (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Generate with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description for freelancers to see..."
                      className="min-h-[200px] resize-y"
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>
                      This will be the main description freelancers see. You can generate one based on your brief.
                    </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
              {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Post Your Project
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
