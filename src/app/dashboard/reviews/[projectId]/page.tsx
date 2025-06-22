import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReviewForm } from "./ReviewForm";


export default function SubmitReviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/reviews">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Reviews
              </Link>
            </Button>
          </div>
          
          <Card className="bg-secondary/20 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle>Submit Your Review</CardTitle>
                <CardDescription>Let us know how we did. Your feedback is valuable.</CardDescription>
            </CardHeader>
            <CardContent>
                <ReviewForm />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
