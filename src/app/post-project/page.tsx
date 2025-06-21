import { Header } from "@/components/common/Header";
import { ProjectForm } from "./ProjectForm";

export default function PostProjectPage() {
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
