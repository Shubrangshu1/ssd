
"use client";
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCheck, ShieldCheck, ClipboardList, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Layout handles redirect
  }

  return (
    <div>
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Welcome, {user.name || 'User'}!</CardTitle>
          <CardDescription className="text-lg">
            This is your personal dashboard. Your current role is: <span className="font-semibold capitalize text-primary">{user.role?.replace('_', ' ')}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you can manage your profile and access role-specific features.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCheck className="text-primary"/> Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">View and update your personal information.</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/profile">Manage Profile</Link>
            </Button>
          </CardContent>
        </Card>

        {user.role === 'volunteer' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ClipboardList className="text-primary"/> Volunteer Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">View upcoming volunteering opportunities and your schedule.</p>
              <Button variant="outline" disabled>View Activities (Coming Soon)</Button>
            </CardContent>
          </Card>
        )}

        {user.role === 'worker' && (
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/> Worker Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Access worker-specific tools and information.</p>
              <Button variant="outline" disabled>Access Portal (Coming Soon)</Button>
            </CardContent>
          </Card>
        )}
        
        {user.role === 'admin' && ( // Example for future admin role
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Settings className="text-primary"/> Admin Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage users, content, and application settings.</p>
              <Button variant="outline" disabled>Go to Admin Panel (Coming Soon)</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
