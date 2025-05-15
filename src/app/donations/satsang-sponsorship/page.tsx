
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import UpiPayment from '@/components/UpiPayment'; // Will be dynamically imported
import { recordSatsangSponsorship } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Sprout, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const UpiPayment = dynamic(() => import('@/components/UpiPayment'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

const sponsorshipSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  date: z.date({ required_error: "Please select a date for sponsorship." }),
  purpose: z.string().min(5, { message: "Purpose must be at least 5 characters." }).optional(),
  amount: z.number().min(1, { message: "Amount must be at least ₹1." }),
});

type SponsorshipFormData = z.infer<typeof sponsorshipSchema>;

export default function SatsangSponsorshipPage() {
  const [showUpiPayment, setShowUpiPayment] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [formData, setFormData] = useState<SponsorshipFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SponsorshipFormData>({
    resolver: zodResolver(sponsorshipSchema),
    defaultValues: {
      name: "",
      purpose: "",
      amount: 1001, // Default amount
    },
  });

  const onSubmit: SubmitHandler<SponsorshipFormData> = (data) => {
    setFormData(data);
    setDonationAmount(data.amount);
    setShowUpiPayment(true);
  };

  const handleTransactionIdSubmit = async (txnId: string) => {
    if (!formData) return;
    setIsSubmitting(true);
    try {
      const submissionData = { ...formData, date: formData.date.toISOString().split('T')[0], transactionId: txnId };
      const result = await recordSatsangSponsorship(submissionData);
      if (result.success) {
        toast({ title: "Success!", description: "Your satsang sponsorship has been recorded. Thank you for your Seva!" });
        form.reset();
        setShowUpiPayment(false);
        setTransactionId("");
        setFormData(null);
      } else {
        toast({ title: "Error", description: result.message || "Failed to record sponsorship.", variant: "destructive" });
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
            <Sprout className="mr-2 h-7 w-7" />
            Sponsor Next Satsang
          </CardTitle>
          <CardDescription>
            Offer your Seva by sponsoring an upcoming satsang. Your contribution supports the arrangements and prasad.
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
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date of Sponsorship</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setDate(new Date().getDate() -1)) // Disable past dates
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose/Occasion (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Birthday, Anniversary, In Memory of..." {...field} />
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
                      <FormLabel>Sponsorship Amount (₹)</FormLabel>
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
