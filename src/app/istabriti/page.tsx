
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, AlertTriangle, Building, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import { MANDIR_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Istabriti Submission Guidelines',
  description: `Official ways to submit Istabriti for ${MANDIR_NAME}.`,
};

export default function IstabritiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
        <CardHeader className="text-center">
          <ScrollText className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-3xl font-bold text-primary">Istabriti Submission Guidelines</CardTitle>
          <CardDescription className="text-lg mt-1">
            Please follow these official methods for submitting your Istabriti to ensure it is properly received and acknowledged.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 text-lg">
          <div className="my-6 flex justify-center">
            <Image
              src="https://placehold.co/600x300.png"
              alt="Istabriti Guidelines Visual"
              width={600}
              height={300}
              className="rounded-md shadow-md"
              data-ai-hint="official document guidelines"
            />
          </div>
          <div>
            <h3 className="flex items-center text-xl font-semibold text-primary mb-2">
              <Building className="mr-2 h-6 w-6" />
              1. In-Person Submission
            </h3>
            <p className="ml-8 text-muted-foreground">
              Submit your Istabriti directly at <strong>{MANDIR_NAME}</strong> during office hours (typically 7:00 AM – 1:00 PM).
              This method ensures same-day Arghya Prasty.
            </p>
          </div>

          <div>
            <h3 className="flex items-center text-xl font-semibold text-primary mb-2">
              <Globe className="mr-2 h-6 w-6" />
              2. Online Submission via Official Portal
            </h3>
            <p className="ml-8 text-muted-foreground">
              Use the official Satsang Philanthropy portal for online submissions:
              <Link href="https://www.satsangphilanthropy.com" target="_blank" rel="noopener noreferrer" className="block mt-1 text-accent hover:underline font-medium">
                satsangphilanthropy.com
              </Link>
            </p>
          </div>

          <div>
            <h3 className="flex items-center text-xl font-semibold text-primary mb-2">
              <Users className="mr-2 h-6 w-6" />
              3. Authorized Upoyojana Kendras
            </h3>
            <p className="ml-8 text-muted-foreground">
              Submit through designated Upoyojana Kendras (collection centers) located across Hyderabad and Telangana.
              Please verify the authenticity of the Kendra.
            </p>
          </div>

          <div className="mt-10 p-6 border-l-4 border-destructive bg-destructive/10 rounded-md">
            <div className="flex">
              <div className="shrink-0">
                <AlertTriangle className="h-7 w-7 text-destructive" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold text-destructive">Important Warning!</h3>
                <div className="mt-2 text-md text-destructive/90">
                  <p>
                    Please <strong>do not</strong> submit your Istabriti contributions through any unauthorized individuals or channels.
                    Satsang Vihar Hyderabad is not responsible for submissions made through unofficial means.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8">
            For any queries regarding Istabriti submission, please contact the Mandir office directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
