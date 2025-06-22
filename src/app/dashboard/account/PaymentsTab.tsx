
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, PlusCircle, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { db, collection, addDoc, serverTimestamp, doc, deleteDoc, query, onSnapshot, getDocs } from '@/lib/firebase/client';


type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
};

export function PaymentsTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching payment methods is now done on the client-side
  useEffect(() => {
    if (!user) {
        setLoading(false);
        return;
    };
    
    setLoading(true);
    const paymentMethodsRef = collection(db, 'users', user.uid, 'paymentMethods');
    const q = query(paymentMethodsRef);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const methods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PaymentMethod[];
        setPaymentMethods(methods);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching payment methods: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch payment methods. Your security rules might be blocking this."
        });
        setLoading(false);
    });
    
    return () => unsubscribe();

  }, [user, toast]);


  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    // In a real app, you would use a library like Stripe Elements
    // and send the token to your backend.
    // For this prototype, we'll just add a fake card.
    const newCard = {
      brand: "Visa",
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      expMonth: Math.floor(1 + Math.random() * 12),
      expYear: new Date().getFullYear() + Math.floor(2 + Math.random() * 4),
    };
    
    try {
        const paymentMethodsRef = collection(db, 'users', user.uid, 'paymentMethods');
        await addDoc(paymentMethodsRef, { ...newCard, createdAt: serverTimestamp() });
        
        setIsDialogOpen(false);
        toast({
            title: "Card Added",
            description: "Your new payment method has been saved.",
        });
    } catch (error) {
        console.error('Error adding payment method:', error);
        toast({ variant: "destructive", title: "Error", description: "Could not add payment method. Your security rules might be blocking this." });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleRemoveCard = async (methodId: string) => {
    if (!user) return;

    try {
        const methodRef = doc(db, 'users', user.uid, 'paymentMethods', methodId);
        await deleteDoc(methodRef);
        toast({
            title: "Card Removed",
            description: "The payment method has been deleted.",
        });
    } catch (error) {
        console.error('Error removing payment method:', error);
        toast({ variant: "destructive", title: "Error", description: "Could not remove card. Your security rules might be blocking this." });
    }
  };
  
  if (loading) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                 <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                 </div>
                 <Skeleton className="h-8 w-20" />
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      {paymentMethods.length > 0 ? (
        <ul className="space-y-4">
          {paymentMethods.map((method) => (
            <li key={method.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/50 p-4">
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{method.brand} ending in {method.last4}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveCard(method.id)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/60 p-12 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No payment methods</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Add a payment method to get started with projects.
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="payment-dialog-description">
          <form onSubmit={handleAddCard}>
            <DialogHeader>
              <DialogTitle>Add a new payment method</DialogTitle>
              <DialogDescription id="payment-dialog-description">
                Your payment information is securely handled.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** ****" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="expiry">Expiration</Label>
                  <Input id="expiry" placeholder="MM / YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Add Card
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
