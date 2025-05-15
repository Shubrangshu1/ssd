
import type { Metadata } from 'next';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donations & Seva',
  description: 'Offer your Seva through various donation options to support Satsang Vihar Hyderabad.',
};

export default function DonationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="py-8">
      {/* You can add a common header or breadcrumbs for donation pages here if needed */}
      {/* For example:
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <HeartHandshake className="mr-3 h-8 w-8" />
          Offer Your Seva
        </h1>
      </div>
      */}
      {children}
    </section>
  )
}
