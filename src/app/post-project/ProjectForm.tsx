
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
import { handleGenerateDescription } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  projectTitle: z.string().min(5, "Title must be at least 5 characters."),
  projectBrief: z.string().min(20, "Brief must be at least 20 characters."),
  desiredSkills: z.string().min(3, "Please list at least one skill (e.g., React, Figma)."),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Budget must be a valid number.").min(1, "Budget is required."),
  projectDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ProjectForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      projectBrief: "",
      desiredSkills: "",
      budget: "",
      projectDescription: "",
    },
  });

  const onGenerate = async () => {
    const fieldsToValidate: (keyof FormValues)[] = ["projectTitle", "projectBrief", "desiredSkills", "budget"];
    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in Title, Brief, Skills, and Budget before generating.",
      });
      return;
    }
    
    const { projectTitle, projectBrief, desiredSkills, budget } = form.getValues();

    setIsGenerating(true);
    const result = await handleGenerateDescription({ projectTitle, projectBrief, desiredSkills, budget });
    setIsGenerating(false);

    if (result.success && result.description) {
      form.setValue('projectDescription', result.description, { shouldValidate: true });
      toast({
        title: "Description Generated!",
        description: "Your project description has been created by AI.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error,
      });
    }
  };

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
        title: "Project Submitted!",
        description: "Your project is now live. We'll be in touch shortly.",
    });
    router.push('/dashboard');
  }

  return (
    <Card className="bg-secondary/20 border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Project Details</CardTitle>
        <CardDescription>
          Fill out the form below. For the description, you can write your own or use our AI assistant.
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
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
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
            
            <div className="space-y-4 rounded-lg border border-border/60 bg-background/50 p-6 shadow-sm">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <FormLabel className="text-base font-semibold">Project Description</FormLabel>
                   <FormDescription className="mt-1">
                      This will be the main description freelancers see. You can edit the generated text.
                    </FormDescription>
                </div>
                <Button type="button" size="sm" onClick={onGenerate} disabled={isGenerating} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {isGenerating ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate with AI
                </Button>
              </div>
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Let our AI help you write a compelling project description..."
                        className="min-h-[200px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full text-lg">Post Project</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
