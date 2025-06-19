
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
// import UpiPayment from '@/components/UpiPayment'; // Will be dynamically imported
import { recordMaintenanceContribution } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Wrench, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const UpiPayment = dynamic(() => import('@/components/UpiPayment'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

const maintenanceSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  familyCode: z.string().optional(),
  amount: z.number().min(1, { message: "Amount must be at least ₹1." }),
});

type MaintenanceFormData = z.infer<typeof maintenanceSchema>;

export default function MaintenanceContributionPage() {
  const [showUpiPayment, setShowUpiPayment] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [formData, setFormData] = useState<MaintenanceFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      name: "",
      phone: "",
      familyCode: "",
      amount: 501, // Default amount
    },
  });

  const onSubmit: SubmitHandler<MaintenanceFormData> = (data) => {
    setFormData(data);
    setDonationAmount(data.amount);
    setShowUpiPayment(true);
  };

  const handleTransactionIdSubmit = async (txnId: string) => {
    if (!formData) return;
    setIsSubmitting(true);
    try {
      const submissionData = { ...formData, transactionId: txnId };
      const result = await recordMaintenanceContribution(submissionData);
      if (result.success) {
        toast({ title: "Success!", description: "Your maintenance contribution has been recorded. Thank you for your support!" });
        form.reset();
        setShowUpiPayment(false);
        setTransactionId("");
        setFormData(null);
      } else {
        toast({ title: "Error", description: result.message || "Failed to record contribution.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto shadow-lg animate-bounce-in-from-bottom">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-primary">
            <Wrench className="mr-2 h-7 w-7" />
            Maintenance Contribution
          </CardTitle>
          <CardDescription>
            Support the upkeep and development of our Mandir facilities. Your contribution ensures a welcoming space for all devotees.
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter your 10-digit phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="familyCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Code (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your family code if applicable" {...field} />
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
                      <FormLabel>Contribution Amount (₹)</FormLabel>
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
