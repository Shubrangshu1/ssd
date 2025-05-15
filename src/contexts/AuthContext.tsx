
"use client";
import type { ReactNode } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole, AuthState } from '@/types';
import { requestWorkerAccess as serverRequestWorkerAccess } from '@/lib/actions'; // Assuming you'll create this
import { useToast } from "@/hooks/use-toast";

const defaultUser: User = { id: 'guest', role: 'guest' };

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(defaultUser); // Default to guest
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (type: "volunteer" | "worker", details: Partial<User>) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    let loggedInUser: User;
    if (type === "worker") {
      // In a real app, verify credentials. For simulation:
      // If phone is 'adminapproved', role is 'worker', otherwise 'pending_worker'
      const isApproved = details.phone === '0000000000'; // Simulated approved worker
      loggedInUser = {
        id: details.email || details.phone || `worker-${Date.now()}`,
        name: details.name || "Worker User",
        email: details.email,
        phone: details.phone,
        role: isApproved ? 'worker' : 'pending_worker',
      };
      toast({ title: "Login Success", description: isApproved ? `Welcome Worker ${loggedInUser.name}` : `Welcome ${loggedInUser.name}. Your account is pending approval.` });
    } else { // Volunteer
      loggedInUser = {
        id: details.email || `volunteer-${Date.now()}`,
        name: details.name || "Volunteer User",
        email: details.email,
        age: details.age,
        role: 'volunteer',
      };
      toast({ title: "Login Success", description: `Welcome Volunteer ${loggedInUser.name}` });
    }
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    setLoading(false);
  }, [toast]);

  const logout = useCallback(() => {
    setLoading(true);
    setUser(defaultUser);
    localStorage.removeItem('currentUser');
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    setLoading(false);
  }, [toast]);

  const signupVolunteer = useCallback(async (details: Omit<User, "id" | "role">) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newVolunteer: User = {
      id: details.email || `volunteer-${Date.now()}`,
      ...details,
      role: 'volunteer',
    };
    setUser(newVolunteer);
    localStorage.setItem('currentUser', JSON.stringify(newVolunteer));
    toast({ title: "Signup Successful", description: `Welcome, ${newVolunteer.name}! You are now logged in.` });
    setLoading(false);
  }, [toast]);

  const requestWorkerAccess = useCallback(async (details: { phone: string; name: string }) => {
    setLoading(true);
    // This would call a server action
    // For now, simulate and set user as pending
    try {
      // const response = await serverRequestWorkerAccess(details); // This is a server action
      // For now, mock the server action's effect client-side for immediate UI update.
      // In real app, you might not auto-login or wait for admin. Here, we show request submitted.
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating server action
      
      // This part is tricky. Usually, signup doesn't auto-login as pending worker.
      // User is notified that request is submitted. Admin then approves.
      // For this simulation, we won't log them in. Just show a message.
      // A real flow would be: submit form -> admin approves -> worker can login.
      // Let's just show a success message.
      toast({ title: "Request Submitted", description: "Your request for worker access has been submitted for approval." });
    } catch (error) {
      toast({ title: "Request Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Placeholder for admin functionality
  // const approveWorker = (userId: string) => { ... }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signupVolunteer, requestWorkerAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
