
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Youtube, Facebook, Link as LinkIcon, Instagram, Send, Users, HeartHandshake, ArrowRight, Landmark, Sprout, Wrench, Info, Megaphone } from 'lucide-react';
import { MANDIR_NAME, MANDIR_ADDRESS, SOCIAL_LINKS, IMPORTANT_DATES_EVENTS, APP_NAME, getDynamicPrayerTimes, PRAYER_TIMINGS_DEFAULT } from '@/lib/constants';
import type { PrayerTime } from '@/types';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(PRAYER_TIMINGS_DEFAULT);

  useEffect(() => {
    setPrayerTimes(getDynamicPrayerTimes());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
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
        {/* Krupa-Sarjanee Mahotsav Card */}
        <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-accent/20 to-primary/20 p-4 shadow-xl">
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

        {/* Important Announcements Placeholder Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-primary" />
              Important Announcements
            </CardTitle>
            <CardDescription>Latest updates and messages from the Mandir administration.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder content - this would be dynamically populated in a real app */}
            <p className="text-muted-foreground text-sm">No new announcements at this time. Please check back later.</p>
            {/* Example of an announcement item:
            <div className="p-3 border-b border-border last:border-b-0 bg-secondary/30 rounded-md">
              <h4 className="font-semibold text-primary">Special Meeting</h4>
              <p className="text-xs text-muted-foreground">Posted: 2 hours ago</p>
              <p className="text-sm mt-1">All volunteers are requested to attend a special meeting tomorrow at 4 PM regarding upcoming event preparations.</p>
            </div>
            */}
          </CardContent>
           <CardFooter>
             <Button variant="link" asChild className="text-primary p-0">
               <Link href="/announcements">View All Announcements <ArrowRight className="ml-1 h-4 w-4" /></Link>
             </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1">
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

        <Card>
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

        <Card>
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

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Connect With Us
            </CardTitle>
            <CardDescription>Join our community online and stay connected.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {[
              { Icon: Youtube, label: "YouTube", href: SOCIAL_LINKS.youtube },
              { Icon: Facebook, label: "Facebook", href: SOCIAL_LINKS.facebook },
              { Icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
              { Icon: LinkIcon, label: "Website", href: SOCIAL_LINKS.website },
              { Icon: Send, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp, hint: "social media" },
            ].map(({ Icon, label, href, hint }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className="group">
                <div className="p-4 bg-secondary rounded-lg hover:bg-primary/10 transition-colors flex flex-col items-center justify-center aspect-square">
                  <Icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" data-ai-hint={hint || label.toLowerCase()} />
                  <p className="mt-2 text-sm font-medium text-secondary-foreground group-hover:text-primary">{label}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <HeartHandshake className="h-7 w-7" />
              Support Our Mandir
            </CardTitle>
            <CardDescription>Your contributions help us maintain and grow our spiritual activities.</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/donations/satsang-sponsorship" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Sprout className="h-5 w-5 text-primary"/>Sponsor Next Satsang</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Be a yajman for an upcoming satsang and receive blessings.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">Sponsor Now <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </CardFooter>
              </Card>
            </Link>
            <Link href="/donations/thakur-bhog" className="block">
               <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Landmark className="h-5 w-5 text-primary"/>Offer Thakur Bhog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Make an offering for Thakur Ji's daily bhog seva.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">Offer Bhog <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </CardFooter>
              </Card>
            </Link>
            <Link href="/donations/maintenance" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Wrench className="h-5 w-5 text-primary"/>Maintenance Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Contribute towards the upkeep and development of our Mandir.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">Contribute <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </CardFooter>
              </Card>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
