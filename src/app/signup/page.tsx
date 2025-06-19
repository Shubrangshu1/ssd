
"use client";
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, User, Briefcase } from 'lucide-react';
import { requestWorkerAccess as serverRequestWorkerAccessAction } from '@/lib/actions';

// Volunteer Signup Schema
const volunteerSignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  age: z.number().min(16, { message: "Must be at least 16 years old." }).max(100).optional(),
  // password: z.string().min(6, { message: "Password must be at least 6 characters." }), // Simplified
});
type VolunteerSignupFormData = z.infer<typeof volunteerSignupSchema>;

// Worker Access Request Schema
const workerRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
});
type WorkerRequestFormData = z.infer<typeof workerRequestSchema>;


export default function SignupPage() {
  const { signupVolunteer, loading } = useAuth(); // requestWorkerAccess from auth context is client-side simulation
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmittingVolunteer, setIsSubmittingVolunteer] = useState(false);
  const [isSubmittingWorker, setIsSubmittingWorker] = useState(false);

  const volunteerForm = useForm<VolunteerSignupFormData>({
    resolver: zodResolver(volunteerSignupSchema),
    defaultValues: { name: "", email: "" },
  });

  const workerForm = useForm<WorkerRequestFormData>({
    resolver: zodResolver(workerRequestSchema),
    defaultValues: { name: "", phone: "" },
  });

  const onVolunteerSubmit: SubmitHandler<VolunteerSignupFormData> = async (data) => {
    setIsSubmittingVolunteer(true);
    try {
      await signupVolunteer(data);
      router.push('/dashboard');
    } catch (error) {
      toast({ title: "Signup Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmittingVolunteer(false);
    }
  };
  
  const onWorkerRequestSubmit: SubmitHandler<WorkerRequestFormData> = async (data) => {
    setIsSubmittingWorker(true);
    try {
      // Use the server action directly here
      const result = await serverRequestWorkerAccessAction(data);
      if (result.success) {
        toast({ title: "Request Submitted", description: result.message });
        workerForm.reset();
        // Optionally redirect or instruct user on next steps
        // router.push('/login'); // Or a page confirming submission
      } else {
        toast({ title: "Request Failed", description: result.message || "Could not submit request.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Request Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmittingWorker(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl animate-bounce-in-from-bottom">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold">Join Satsang Seva</CardTitle>
          <CardDescription>Create an account or request worker access.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="volunteer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="volunteer"><User className="mr-2 h-4 w-4" />Volunteer</TabsTrigger>
              <TabsTrigger value="worker"><Briefcase className="mr-2 h-4 w-4" />Worker Access</TabsTrigger>
            </TabsList>
            
            {/* Volunteer Signup Tab */}
            <TabsContent value="volunteer">
              <Form {...volunteerForm}>
                <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-4 mt-4">
                  <FormField
                    control={volunteerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={volunteerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={volunteerForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (Optional)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Your Age" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <p className="text-xs text-muted-foreground text-center">Password field removed for simulation.</p> */}
                  <Button type="submit" className="w-full" disabled={isSubmittingVolunteer || loading}>
                    {isSubmittingVolunteer ? "Signing up..." : "Sign Up as Volunteer"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Worker Access Request Tab */}
            <TabsContent value="worker">
               <Form {...workerForm}>
                <form onSubmit={workerForm.handleSubmit(onWorkerRequestSubmit)} className="space-y-4 mt-4">
                 <FormField
                    control={workerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={workerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number for Verification</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your 10-digit phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmittingWorker || loading}>
                    {isSubmittingWorker ? "Submitting..." : "Request Worker Access"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
