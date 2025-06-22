
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { db, doc, setDoc, getDoc } from '@/lib/firebase/client';

const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      // Set email from auth, which is always up-to-date
      form.setValue('email', user.email || "");

      // Fetch profile from Firestore on the client
      const fetchProfile = async () => {
        try {
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const profile = docSnap.data() as ProfileFormValues;
                 form.reset({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: user.email || "",
                });
            } else {
                // Fallback to display name if no profile in DB
                const displayName = user.displayName || "";
                const nameParts = displayName.split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";
                form.reset({
                    firstName: firstName,
                    lastName: lastName,
                    email: user.email || "",
                });
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast({
                variant: "destructive",
                title: "Load Failed",
                description: "Could not load your profile. Please check your Firestore rules.",
            });
        }
      };
      
      fetchProfile();
    }
  }, [user, form, toast]);


  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
        toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in." });
        return;
    }
    setLoading(true);
    try {
        const userRef = doc(db, 'users', user.uid);
        // We use setDoc with merge:true to create or update the document
        await setDoc(userRef, { firstName: data.firstName, lastName: data.lastName, email: data.email }, { merge: true });
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved.",
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not update your profile. Your security rules might be blocking this.",
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" readOnly disabled {...field} className="cursor-not-allowed bg-muted/50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
