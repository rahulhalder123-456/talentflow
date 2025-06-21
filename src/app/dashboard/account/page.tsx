
import { Header } from "@/components/common/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./ProfileForm";
import { PaymentsTab } from "./PaymentsTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight">Account Settings</h1>
            <p className="mt-2 text-muted-foreground">Manage your profile, and payment information.</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <Card className="bg-secondary/20 border-border/50 shadow-lg mt-6">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfileForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="payments">
                <Card className="bg-secondary/20 border-border/50 shadow-lg mt-6">
                    <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Add and manage your credit/debit cards.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PaymentsTab />
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
