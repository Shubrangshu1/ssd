
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Info, Megaphone, ArrowRight, HeartHandshake } from 'lucide-react';
import { MANDIR_NAME, MANDIR_ADDRESS, IMPORTANT_DATES_EVENTS, APP_NAME, getDynamicPrayerTimes, PRAYER_TIMINGS_DEFAULT } from '@/lib/constants';
import type { PrayerTime } from '@/types';
import { useEffect, useState } from 'react';
import MahotsavBanner from '@/components/home/MahotsavBanner';
import StaticInfoSections from '@/components/home/StaticInfoSections';

export default function HomePage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(PRAYER_TIMINGS_DEFAULT);

  useEffect(() => {
    setPrayerTimes(getDynamicPrayerTimes());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{APP_NAME}</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Your companion for devotion and service at {MANDIR_NAME}.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/donations/thakur-bhog">
              <HeartHandshake className="mr-2 h-5 w-5" /> Offer Seva
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/information">
              <Info className="mr-2 h-5 w-5" /> View Information
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MahotsavBanner />

        <Card className="lg:col-span-1 animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-primary" />
              Important Announcements
            </CardTitle>
            <CardDescription>Latest updates and messages from the Mandir administration.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">No new announcements at this time. Please check back later.</p>
          </CardContent>
           <CardFooter>
             <Button variant="link" asChild className="text-primary p-0">
               <Link href="/announcements">View All Announcements <ArrowRight className="ml-1 h-4 w-4" /></Link>
             </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1 animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out delay-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              Upcoming Events & Dates
            </CardTitle>
            <CardDescription>Stay updated with important satsangs and celebrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {IMPORTANT_DATES_EVENTS.slice(0,2).map(event => (
                <li key={event.id} className="pb-3 border-b border-border last:border-b-0">
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  {event.description && <p className="text-sm">{event.description}</p>}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
             <Button variant="link" asChild className="text-primary p-0">
                <Link href="/information#events">View All Events <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out delay-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Prayer Timings
            </CardTitle>
            <CardDescription>
              🕊️ <strong>“Prayer is the call of the soul towards its source. It awakens the inner self, purifies the heart, and brings man nearer to his Ideal.”</strong> &mdash; Shree Shree Thakur Anukulchandra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {prayerTimes.map(prayer => (
                <li key={prayer.id} className="flex justify-between">
                  <span>{prayer.name}</span>
                  <span className="font-medium">{prayer.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
           <CardFooter>
             <Button variant="link" asChild className="text-primary p-0">
                <Link href="/information#timings">Full Schedule <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out delay-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Mandir Location
            </CardTitle>
            <CardDescription>{MANDIR_ADDRESS}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/information#location" aria-label="View map and directions" className="block relative group overflow-hidden rounded-md shadow-md">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Mandir Location Map"
                width={600}
                height={400}
                className="object-cover aspect-video w-full rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
                data-ai-hint="temple aerial map"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-end p-4">
                <MapPin className="h-8 w-8 text-white mb-1 drop-shadow-lg" />
                <span className="text-white font-semibold text-md text-center drop-shadow-lg">View Map & Directions</span>
              </div>
            </Link>
          </CardContent>
           <CardFooter>
             <Button variant="link" asChild className="text-primary p-0">
                <Link href="/information#location">Get Directions <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <StaticInfoSections />
      </div>
    </div>
  );
}
