import type { Metadata } from 'next';
import { Inter as Geist } from 'next/font/google'; // Using Inter as Geist, can be changed if Geist is specifically needed
import { Geist_Mono } from 'next/font/google'; // Assuming Geist_Mono is available or similar mono
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
// import Navbar from '@/components/layout/Navbar'; // Navbar removed
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  icons: {
    // Add a placeholder or actual icon path if available
    // icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`} suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            {/* <Navbar /> */} {/* Navbar component removed */}
            <main className="flex-grow"> {/* Removed container and padding, pages will handle their own layout */}
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
