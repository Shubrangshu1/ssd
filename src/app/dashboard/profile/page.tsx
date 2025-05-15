
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile } from '@/lib/actions';
import { UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  email: z.string().email("Invalid email address.").optional(),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number.").optional(),
  age: z.number().min(16, "Must be at least 16 years old.").max(100).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, loading: authLoading, login } = useAuth(); // Using login to update client-side user state
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    // Default values will be set by useEffect once user data is available
  });

  useEffect(() => {
    if (user && !authLoading) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || undefined,
      });
    }
  }, [user, authLoading, form]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      // Filter out empty optional fields before sending
      const updateData: Partial<ProfileFormData> = {};
      if (data.name) updateData.name = data.name;
      if (data.email) updateData.email = data.email;
      if (data.phone) updateData.phone = data.phone;
      if (data.age) updateData.age = data.age;
      
      const result = await updateUserProfile(user.id, updateData);
      if (result.success) {
        toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
        // Update local auth context user (simulated, ideally response would return updated user)
        const updatedUser = { ...user, ...updateData };
        // This is a simplified way to update. AuthProvider might need a dedicated updateUser function.
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); 
        // Trigger a re-render or state update in AuthContext if it has such a function.
        // For now, using login as a hacky way to refresh, or just rely on next navigation to reflect.
        // A proper solution would be an `updateUserInContext` function in AuthContext.
        // login(user.role as any, updatedUser); // This isn't ideal, just for simulation.
         if (user.role === 'volunteer' || user.role === 'worker') {
            await login(user.role, updatedUser);
        }


      } else {
        toast({ title: "Update Failed", description: result.message || "Could not update profile.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>; // Should be handled by layout
  }
  
  const canEditEmail = user.role !== 'worker'; // Workers might use phone as primary ID
  const canEditPhone = user.role !== 'volunteer'; // Volunteers might use email as primary ID

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <UserCircle className="mr-2 h-7 w-7" />
          Your Profile
        </CardTitle>
        <CardDescription>View and update your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} disabled={!canEditEmail && !!user.email} />
                  </FormControl>
                  {!canEditEmail && !!user.email && <p className="text-xs text-muted-foreground">Email cannot be changed for your role.</p>}
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
                    <Input type="tel" placeholder="Your 10-digit phone number" {...field} disabled={!canEditPhone && !!user.phone} />
                  </FormControl>
                  {!canEditPhone && !!user.phone && <p className="text-xs text-muted-foreground">Phone number cannot be changed for your role.</p>}
                  <FormMessage />
                </FormItem>
              )}
            />
            {user.role === 'volunteer' && (
               <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your age" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
