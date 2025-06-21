
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
import { updateUserProfile, getUserProfile } from "./actions";

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
      // Set email from auth
      form.setValue('email', user.email || "");

      // Fetch profile from Firestore
      const fetchProfile = async () => {
        const result = await getUserProfile(user.uid);
        if (result.success && result.profile) {
          const profile = result.profile as ProfileFormValues;
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
      };
      fetchProfile();
    }
  }, [user, form]);


  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
        toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in." });
        return;
    }
    setLoading(true);
    const result = await updateUserProfile(user.uid, {
        firstName: data.firstName,
        lastName: data.lastName,
    });
    setLoading(false);

    if (result.success) {
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: result.error,
        });
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
