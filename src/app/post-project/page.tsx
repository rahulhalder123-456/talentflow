import { Header } from "@/components/common/Header";
import { ProjectForm } from "./ProjectForm";

export default function PostProjectPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Bring Your Vision to Life
          </h1>
          <p className="text-lg text-muted-foreground">
            Post your project and connect with talented freelancers from around the world.
          </p>
        </div>
        <div className="mt-12">
          <ProjectForm />
        </div>
      </main>
    </>
  );
}
