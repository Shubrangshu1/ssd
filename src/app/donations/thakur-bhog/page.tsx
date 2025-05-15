
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import UpiPayment from '@/components/UpiPayment';
import { recordThakurBhog } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Landmark } from 'lucide-react';

const thakurBhogSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  gotra: z.string().optional(),
  amount: z.number().min(1, { message: "Amount must be at least ₹1." }),
});

type ThakurBhogFormData = z.infer<typeof thakurBhogSchema>;

export default function ThakurBhogPage() {
  const [showUpiPayment, setShowUpiPayment] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [formData, setFormData] = useState<ThakurBhogFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ThakurBhogFormData>({
    resolver: zodResolver(thakurBhogSchema),
    defaultValues: {
      name: "",
      gotra: "",
      amount: 251, // Default amount
    },
  });

  const onSubmit: SubmitHandler<ThakurBhogFormData> = (data) => {
    setFormData(data);
    setDonationAmount(data.amount);
    setShowUpiPayment(true);
  };

  const handleTransactionIdSubmit = async (txnId: string) => {
    if (!formData) return;
    setIsSubmitting(true);
    try {
      const submissionData = { ...formData, transactionId: txnId };
      const result = await recordThakurBhog(submissionData);
      if (result.success) {
        toast({ title: "Success!", description: "Your Thakur Bhog donation has been recorded. Thank you for your Seva!" });
        form.reset();
        setShowUpiPayment(false);
        setTransactionId("");
        setFormData(null);
      } else {
        toast({ title: "Error", description: result.message || "Failed to record donation.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-primary">
            <Landmark className="mr-2 h-7 w-7" />
            Offer Thakur Bhog
          </CardTitle>
          <CardDescription>
            Contribute towards Thakur Ji's daily bhog (food offering). Your devotion sustains this sacred tradition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showUpiPayment ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gotra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gotra (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your gotra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donation Amount (₹)</FormLabel>
                      <FormControl>
                         <Input 
                          type="number" 
                          placeholder="Enter amount" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
              </form>
            </Form>
          ) : (
            <UpiPayment
              amount={donationAmount}
              onTransactionIdSubmit={handleTransactionIdSubmit}
              transactionId={transactionId}
              setTransactionId={setTransactionId}
            />
          )}
        </CardContent>
         {showUpiPayment && (
           <CardFooter className="flex justify-center">
             <Button variant="outline" onClick={() => { setShowUpiPayment(false); setIsSubmitting(false); }} disabled={isSubmitting}>
               Back to Form
             </Button>
           </CardFooter>
        )}
      </Card>
    </div>
  );
}
