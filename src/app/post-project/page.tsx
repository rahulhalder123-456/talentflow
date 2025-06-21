import { redirect } from 'next/navigation';
import { Header } from "@/components/common/Header";
import { ProjectForm } from "./ProjectForm";

// This is a placeholder for a real authentication check.
// In a real application, you would replace this with a call to your auth provider
// (e.g., checking for a valid session cookie or token).
const checkIsUserAuthenticated = async (): Promise<boolean> => {
  // For demonstration purposes, we'll assume the user is not signed in.
  // In a real app, this would involve actual auth logic.
  return false;
};

export default async function PostProjectPage() {
  const isAuthenticated = await checkIsUserAuthenticated();

  if (!isAuthenticated) {
    redirect('/signin');
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
        <div className="space-y-4 text-center opacity-0 animate-fade-in-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Let's Build Something Great
          </h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below to get a detailed proposal from our expert team.
          </p>
        </div>
        <div className="mt-12 opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          <ProjectForm />
        </div>
      </main>
    </>
  );
}
