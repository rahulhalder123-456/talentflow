import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReviewableProjectsList } from "./ReviewableProjectsList";

export default function MyReviewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight">My Reviews</h1>
            <p className="mt-2 text-muted-foreground">Your feedback helps us and other clients.</p>
          </div>
          <ReviewableProjectsList />
        </div>
      </main>
    </div>
  );
}
