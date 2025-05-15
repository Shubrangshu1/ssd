
"use client";

import Image from 'next/image';
import { UPI_ID, UPI_QR_CODE_URL } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UpiPaymentProps {
  amount: number;
  onTransactionIdSubmit: (transactionId: string) => void;
  transactionId: string;
  setTransactionId: (id: string) => void;
}

export default function UpiPayment({ amount, onTransactionIdSubmit, transactionId, setTransactionId }: UpiPaymentProps) {
  const { toast } = useToast();

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({ title: "UPI ID Copied!", description: UPI_ID });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast({ title: "Error", description: "Please enter the transaction ID.", variant: "destructive" });
      return;
    }
    onTransactionIdSubmit(transactionId);
  };

  return (
    <div className="mt-6 p-6 border border-primary/20 rounded-lg bg-secondary">
      <h3 className="text-xl font-semibold text-primary mb-4">Complete Your Donation</h3>
      <p className="mb-1">Please pay <span className="font-bold text-lg">₹{amount.toFixed(2)}</span> using the UPI details below.</p>
      <p className="text-sm text-muted-foreground mb-4">After payment, enter the Transaction ID to confirm your donation.</p>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="text-center">
          <Image 
            src={UPI_QR_CODE_URL} 
            alt="UPI QR Code" 
            width={200} 
            height={200}
            className="rounded-md border shadow-md mx-auto"
            data-ai-hint="payment QR" 
          />
          <p className="mt-2 text-sm font-medium">Scan to Pay</p>
        </div>
        <div className="w-full md:w-auto flex-grow">
          <p className="font-semibold mb-1">Or pay to UPI ID:</p>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-lg font-mono p-2 bg-background border rounded-md text-primary flex-grow">{UPI_ID}</p>
            <Button variant="outline" size="icon" onClick={handleCopyUpiId} aria-label="Copy UPI ID">
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="transactionId" className="text-base">UPI Transaction ID</Label>
              <Input
                id="transactionId"
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter Transaction ID / Reference No."
                required
                className="mt-1 text-base"
              />
            </div>
            <Button type="submit" className="w-full text-base py-3">
              Confirm Donation & Submit ID
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
