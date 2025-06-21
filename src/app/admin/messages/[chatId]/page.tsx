
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AdminChatInterface } from "./AdminChatInterface";

export default function AdminIndividualChatPage({ params }: { params: { chatId: string } }) {
  return (
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/admin/messages">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Messages
              </Link>
            </Button>
          </div>
          
          <AdminChatInterface chatId={params.chatId} />
        </div>
      </main>
  );
}
