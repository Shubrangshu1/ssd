
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role === 'guest')) {
      router.replace('/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role === 'guest') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // Additional check for pending workers
  if (user.role === 'pending_worker') {
     return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-semibold text-primary mb-4">Access Pending</h1>
          <p className="text-lg text-muted-foreground">
            Your worker access request is currently pending approval.
          </p>
          <p className="mt-2 text-muted-foreground">
            You will be notified once your access is granted. Please check back later or contact administration.
          </p>
        </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard specific layout elements can go here, e.g., a sidebar */}
      {children}
    </div>
  );
}
