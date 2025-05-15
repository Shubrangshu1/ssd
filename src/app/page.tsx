import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Clock, MapPin, Youtube, Facebook, Link as LinkIcon, Instagram, Send, Users, HeartHandshake, ArrowRight, Landmark } from 'lucide-react';
import { APP_NAME, MANDIR_NAME, MANDIR_ADDRESS, SOCIAL_LINKS, IMPORTANT_DATES_EVENTS, PRAYER_TIMINGS } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">Welcome to {APP_NAME}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Your companion for devotion and service at {MANDIR_NAME}.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/donations">
              <HeartHandshake className="mr-2 h-5 w-5" /> Offer Seva
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/information">
              <InfoIcon className="mr-2 h-5 w-5" /> View Information
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {IMPORTANT_DATES_EVENTS.slice(0,3).map(event => (
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
            <CardDescription>Daily and weekly prayer schedules.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {PRAYER_TIMINGS.map(prayer => (
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
            <Link href="/information#location" aria-label="View map and directions">
              <Image
                src="https://placehold.co/600x400.png?text=Mandir+Map+View"
                alt="Mandir Location Map"
                width={600}
                height={400}
                className="rounded-md object-cover aspect-video cursor-pointer hover:opacity-90 transition-opacity"
                data-ai-hint="map temple"
              />
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
                  <CardTitle className="flex items-center gap-2 text-lg"><SproutIcon className="h-5 w-5 text-primary"/>Sponsor Next Satsang</CardTitle>
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
                  <CardTitle className="flex items-center gap-2 text-lg"><WrenchIcon className="h-5 w-5 text-primary"/>Maintenance Contribution</CardTitle>
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

// Lucide icons that might not be directly available:
const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const SproutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 1.5 3.6C10.6 14.4 9 15 8 15A2.5 2.5 0 0 0 5.5 13c0-1.4.9-2.6 2.1-3.1" />
    <path d="M14.5 9.4c-1.1.8-1.8 2.2-1.5 3.6.3 1.4 1.9 2.8 2.9 2.8A2.5 2.5 0 0 0 18.5 13c0-1.4-.9-2.6-2.1-3.1" />
    <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 .9-.5 1.7-1.2 2.2" />
    <path d="M12 2A2.5 2.5 0 0 0 9.5 4.5C9.5 5.4 10 6.2 10.7 6.7" />
    <path d="M12 22s-3.25-1.33-4-4" />
    <path d="M12 22s3.25-1.33 4-4" />
  </svg>
);

const WrenchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l3.5-3.5a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0L14.7 6.3z"/>
        <path d="M9.6 12.9A5 5 0 0 1 5.8 17l-2.2 2.2a1.2 1.2 0 0 0 0 1.7l.9.9a1.2 1.2 0 0 0 1.7 0l2.2-2.2c.9-.9 1.5-2.1 1.6-3.3"/>
        <path d="m18.8 3.5-1.2 1.2"/>
        <path d="M10 11l-5.5 5.5"/>
        <path d="M13 8l5.5-5.5"/>
    </svg>
);

