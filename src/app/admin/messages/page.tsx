
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AllChatsList } from "./AllChatsList";

export default function AdminMessagesPage() {
  return (
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin Dashboard
              </Link>
            </Button>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-headline text-4xl font-bold tracking-tight">Client Messages</h1>
              <p className="mt-2 text-muted-foreground">Respond to client inquiries and support requests.</p>
            </div>
          </div>
          
          <AllChatsList />
        </div>
      </main>
  );
}
