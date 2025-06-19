
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, MapPin } from 'lucide-react';

export default function MahotsavBanner() {
  return (
    <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-accent/20 to-primary/20 p-4 shadow-xl animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out delay-100">
      <CardHeader className="text-center pb-2">
        <p className="text-xs sm:text-sm text-primary font-semibold">BY THE BLESSINGS OF PARAM PUJYAPAD SREE SREE ACHARYADEV</p>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary filter drop-shadow-lg my-2">KRUPA-SARJANEE MAHOTSAV</CardTitle>
        <CardDescription className="text-md sm:text-lg font-semibold" style={{color: "hsl(var(--primary-foreground))"}}>15<sup>th</sup> Anniversary Celebrations</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="my-4">
          <Image
            src="https://placehold.co/800x300.png" 
            alt="Krupa-Sarjanee Mahotsav Banner"
            width={800}
            height={300}
            className="object-cover w-full max-w-2xl rounded-md shadow-lg mx-auto border-2 border-primary/50"
            data-ai-hint="Krupa Sarjanee festival"
            priority
          />
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            <CalendarDays className="inline-block mr-2 h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            7<sup>th</sup> December 2025, Sunday
          </p>
          <p className="text-base md:text-lg lg:text-xl font-semibold text-muted-foreground mt-2">
            <MapPin className="inline-block mr-2 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            AT NTR GROUNDS, OPP. INDIRA PARK, HYDERABAD, TELANGANA
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
