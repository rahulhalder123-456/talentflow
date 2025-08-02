
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            // In a real app, you'd likely want this to trigger an email
            // For this example, we'll save it to a "contacts" collection in Firestore
            await addDoc(collection(db, "contacts"), {
                ...values,
                createdAt: serverTimestamp(),
            });

            toast({
                title: "Message Sent!",
                description: "Thank you for reaching out. We'll get back to you shortly.",
            });
            form.reset();
        } catch (error) {
            console.error("Error submitting contact form:", error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.section
            id="contact"
            className="py-16 md:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have a question or a project in mind? We'd love to hear from you.
                    </p>
                </div>

                <div className="rounded-xl bg-secondary/30 p-8 md:p-12 shadow-lg border border-border/50">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell us how we can help..." className="min-h-[150px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Mail className="mr-2 h-5 w-5" />
                                    )}
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </motion.section>
    );
}
