
"use client";

import Link from "next/link";
import { Apple, Github, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/common/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, type AuthProvider as FirebaseAuthProvider } from "firebase/auth";
import { auth, googleProvider, githubProvider, microsoftProvider, socialSignIn } from "@/lib/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.98-4.48 1.98-3.52 0-6.42-2.88-6.42-6.42s2.9-6.42 6.42-6.42c2.03 0 3.3.82 4.1 1.59l2.42-2.42C18.66 3.3 16.03 2 12.48 2 7.23 2 3.22 6.03 3.22 11.25s4.01 9.25 9.26 9.25c5.4 0 9.04-3.66 9.04-9.04 0-.6-.05-1.18-.15-1.74h-9.7z"
    />
  </svg>
);

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.4 2H2v9.4h9.4V2zm10.6 0H12.6v9.4h9.4V2zM11.4 22H2v-9.4h9.4V22zm10.6 0H12.6v-9.4h9.4V22z" fill="currentColor"/>
  </svg>
);

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormValues = z.infer<typeof formSchema>;


export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Account Created!",
        description: "You have successfully signed up.",
      });
      router.push("/post-project");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "This email may already be in use.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: FirebaseAuthProvider, providerName: string) => {
    setSocialLoading(providerName);
    try {
      await socialSignIn(provider);
      toast({
        title: "Account Created!",
        description: "You have successfully signed up.",
      });
      router.push("/post-project");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: `Could not sign up with ${providerName}. Please try again.`,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-sm bg-secondary/20 border-border/50 shadow-lg opacity-0 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>First name</Label>
                        <FormControl>
                          <Input placeholder="Max" {...field} disabled={!!socialLoading} />
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
                        <Label>Last name</Label>
                        <FormControl>
                          <Input placeholder="Robinson" {...field} disabled={!!socialLoading} />
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
                      <Label>Email</Label>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field} disabled={!!socialLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Password</Label>
                      <FormControl>
                        <Input type="password" {...field} disabled={!!socialLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading || !!socialLoading}>
                  {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                  Create an account
                </Button>
              </form>
            </Form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-secondary/20 px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
             <div className="grid grid-cols-2 gap-2">
               <Button variant="outline" type="button" onClick={() => handleSocialLogin(googleProvider, 'Google')} disabled={loading || !!socialLoading}>
                {socialLoading === 'Google' ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
                Google
              </Button>
              <Button variant="outline" type="button" onClick={() => toast({ title: "Coming Soon!", description: "Apple sign-in is not yet available."})} disabled={loading || !!socialLoading}>
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
              <Button variant="outline" type="button" onClick={() => handleSocialLogin(microsoftProvider, 'Microsoft')} disabled={loading || !!socialLoading}>
                 {socialLoading === 'Microsoft' ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <MicrosoftIcon className="mr-2 h-4 w-4" />}
                Microsoft
              </Button>
              <Button variant="outline" type="button" onClick={() => handleSocialLogin(githubProvider, 'GitHub')} disabled={loading || !!socialLoading}>
                 {socialLoading === 'GitHub' ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
                GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
