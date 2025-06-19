
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
import { UserCircle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  email: z.string().email("Invalid email address.").optional(),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number.").optional(),
  age: z.number().min(16, "Must be at least 16 years old.").max(100).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, loading: authLoading, login } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
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
      const updateData: Partial<ProfileFormData> = {};
      if (data.name && data.name !== user.name) updateData.name = data.name;
      if (data.email && data.email !== user.email) updateData.email = data.email;
      if (data.phone && data.phone !== user.phone) updateData.phone = data.phone;
      if (data.age && data.age !== user.age) updateData.age = data.age;
      
      if (Object.keys(updateData).length === 0) {
        toast({ title: "No Changes", description: "No information was changed." });
        setIsSubmitting(false);
        return;
      }
      
      const result = await updateUserProfile(user.id, updateData);
      if (result.success) {
        toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
        const updatedUser = { ...user, ...updateData };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); 
        if (user.role === 'volunteer' || user.role === 'worker' || user.role === 'admin' || user.role === 'pending_worker') {
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
    return <p className="p-4 text-center">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-4 text-center">Please log in to view your profile.</p>;
  }
  
  const canEditEmail = user.role !== 'worker';
  const canEditPhone = user.role !== 'volunteer';

  return (
    <Card className="max-w-2xl mx-auto shadow-lg animate-bounce-in-from-bottom">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <UserCircle className="mr-2 h-7 w-7" />
          Your Profile
        </CardTitle>
        <CardDescription>View and update your personal information. Your current role is <span className="font-semibold capitalize text-primary">{user.role?.replace('_', ' ')}</span>.</CardDescription>
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
            {(user.role === 'volunteer' || user.role === 'admin') && ( // Allow admin to edit age for example
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
