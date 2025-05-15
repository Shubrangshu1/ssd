
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
import { LogIn, User, Briefcase } from 'lucide-react';

// Volunteer Login Schema
const volunteerLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  // password: z.string().min(1, { message: "Password is required." }), // Simplified: no password for simulation
});
type VolunteerLoginFormData = z.infer<typeof volunteerLoginSchema>;

// Worker Login Schema
const workerLoginSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  // password: z.string().min(1, { message: "Password is required." }), // Simplified: no password
});
type WorkerLoginFormData = z.infer<typeof workerLoginSchema>;


export default function LoginPage() {
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const volunteerForm = useForm<VolunteerLoginFormData>({
    resolver: zodResolver(volunteerLoginSchema),
    defaultValues: { email: "" },
  });

  const workerForm = useForm<WorkerLoginFormData>({
    resolver: zodResolver(workerLoginSchema),
    defaultValues: { phone: "" },
  });

  const onVolunteerSubmit: SubmitHandler<VolunteerLoginFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate Google/Phone login by using email as primary ID
      // In real app, this would redirect to OAuth or use Firebase Phone Auth
      await login("volunteer", { email: data.email, name: data.email.split('@')[0] }); // Pass some mock name
      router.push('/dashboard');
    } catch (error) {
      toast({ title: "Login Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onWorkerSubmit: SubmitHandler<WorkerLoginFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await login("worker", { phone: data.phone, name: `Worker ${data.phone.slice(-4)}` }); // Pass some mock name
      // Redirect or show message based on approval status will be handled by AuthContext
      router.push('/dashboard');
    } catch (error) {
      toast({ title: "Login Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Log in to access your account and services.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="volunteer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="volunteer"><User className="mr-2 h-4 w-4" />Volunteer</TabsTrigger>
              <TabsTrigger value="worker"><Briefcase className="mr-2 h-4 w-4" />Worker</TabsTrigger>
            </TabsList>
            
            {/* Volunteer Login Tab */}
            <TabsContent value="volunteer">
              <Form {...volunteerForm}>
                <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-6 mt-4">
                  <FormField
                    control={volunteerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (or Google Login)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <p className="text-xs text-muted-foreground text-center">Password field removed for simulation. Click login to simulate Google/Phone Auth.</p> */}
                  <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                    {isSubmitting ? "Logging in..." : "Login as Volunteer"}
                  </Button>
                </form>
              </Form>
               <p className="mt-4 text-center text-sm text-muted-foreground">
                New volunteer?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign up here
                </Link>
              </p>
            </TabsContent>

            {/* Worker Login Tab */}
            <TabsContent value="worker">
               <Form {...workerForm}>
                <form onSubmit={workerForm.handleSubmit(onWorkerSubmit)} className="space-y-6 mt-4">
                  <FormField
                    control={workerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your 10-digit phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* <p className="text-xs text-muted-foreground text-center">Password field removed for simulation.</p> */}
                  <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                    {isSubmitting ? "Logging in..." : "Login as Worker"}
                  </Button>
                </form>
              </Form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Worker access pending/not registered?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Request access
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

