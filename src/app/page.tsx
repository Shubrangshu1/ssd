
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export default function SplashScreenPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home'); // Redirect to the main home page
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <Image
        src="https://placehold.co/150x150.png" // Replace with your actual logo path e.g., /mandir-logo.png
        alt={`${APP_NAME} Logo`}
        width={150}
        height={150}
        className="mb-8 animate-pulse"
        data-ai-hint="temple logo spiritual"
        priority // Added priority for LCP
      />
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">{APP_NAME}</h1>
      <blockquote className="text-base md:text-lg text-muted-foreground italic max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
        <p>“You are for the Lord, not for others. And you are for the Lord, and so for others.”</p>
        <cite className="block text-right mt-2 text-sm not-italic">— Shree Shree Thakur Anukulchandra</cite>
      </blockquote>
      <Loader2 className="h-8 w-8 animate-spin text-primary mt-10 animate-in fade-in duration-700 delay-600" />
      <p className="text-sm text-muted-foreground mt-2 animate-in fade-in duration-700 delay-600">Loading...</p>
    </div>
  );
}
