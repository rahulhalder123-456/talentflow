
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder for a payment method type
type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
};

export function PaymentsTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would use a library like Stripe Elements
    // and send the token to your backend.
    // For this prototype, we'll just add a fake card.
    const newCard: PaymentMethod = {
      id: `card_${Math.random().toString(36).substr(2, 9)}`,
      brand: "Visa",
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      expMonth: Math.floor(1 + Math.random() * 12),
      expYear: new Date().getFullYear() + Math.floor(2 + Math.random() * 4),
    };
    setPaymentMethods(prev => [...prev, newCard]);
    setIsDialogOpen(false);
    toast({
      title: "Card Added",
      description: "Your new payment method has been saved.",
    });
  };

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
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
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
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddCard}>
            <DialogHeader>
              <DialogTitle>Add a new payment method</DialogTitle>
              <DialogDescription>
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
              <Button type="submit">Add Card</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
