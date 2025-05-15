
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CalendarDays, Clock, MapPin, Youtube, Facebook, Link as LinkIcon, Instagram, Send, Info } from 'lucide-react';
import { APP_NAME, MANDIR_NAME, MANDIR_ADDRESS, MANDIR_MAP_EMBED_URL, SOCIAL_LINKS, IMPORTANT_DATES_EVENTS, PRAYER_TIMINGS } from '@/lib/constants';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mandir Information',
  description: `Find all important information about ${MANDIR_NAME}, including events, timings, location, and contact details.`,
};

export default function InformationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <Info className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary">{MANDIR_NAME} - Information Hub</h1>
        <p className="text-xl text-muted-foreground mt-2">Stay informed about all activities and details.</p>
      </header>

      <div className="space-y-10">
        <Card className="shadow-lg" id="events">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CalendarDays className="h-7 w-7 text-primary mr-3" />
              Important Dates & Upcoming Events
            </CardTitle>
            <CardDescription>Don't miss out on special satsangs, festivals, and celebrations.</CardDescription>
          </CardHeader>
          <CardContent>
            {IMPORTANT_DATES_EVENTS.length > 0 ? (
              <ul className="space-y-4">
                {IMPORTANT_DATES_EVENTS.map(event => (
                  <li key={event.id} className="p-4 border border-border rounded-lg bg-secondary/50">
                    <h4 className="font-semibold text-lg text-primary">{event.title}</h4>
                    <p className="text-md text-muted-foreground font-medium">{event.date}</p>
                    {event.description && <p className="text-sm mt-1">{event.description}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No upcoming events listed at the moment. Please check back soon.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg" id="timings">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Clock className="h-7 w-7 text-primary mr-3" />
              Prayer & Satsang Timings
            </CardTitle>
            <CardDescription>Regular schedule for daily prayers and weekly satsangs.</CardDescription>
          </CardHeader>
          <CardContent>
            {PRAYER_TIMINGS.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="p-3 font-semibold">Activity</th>
                      <th className="p-3 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRAYER_TIMINGS.map(prayer => (
                      <tr key={prayer.id} className="border-b border-border last:border-0">
                        <td className="p-3">{prayer.name}</td>
                        <td className="p-3 font-medium">{prayer.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">Prayer timings are not currently listed. Please contact the Mandir for details.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg" id="location">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="h-7 w-7 text-primary mr-3" />
              Mandir Location & Directions
            </CardTitle>
            <CardDescription>{MANDIR_ADDRESS}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-lg border relative bg-muted/20 flex items-center justify-center">
              <Image
                src="https://placehold.co/600x400.png"
                alt={`Map preview for ${MANDIR_NAME}`}
                width={600}
                height={400}
                className="object-cover opacity-30"
                data-ai-hint="map preview"
              />
              <Button asChild size="lg" className="absolute">
                <Link href={MANDIR_MAP_EMBED_URL} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-5 w-5" />
                  Open Map
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Click the button above to open the location in Google Maps. For detailed directions, you can also search for "{MANDIR_NAME}" on your preferred navigation app.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg" id="connect">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <LinkIcon className="h-7 w-7 text-primary mr-3" />
              Connect With Us Online
            </CardTitle>
            <CardDescription>Follow our social media channels and join our WhatsApp group for the latest updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { Icon: Youtube, label: "YouTube", href: SOCIAL_LINKS.youtube, color: "text-red-600" },
                { Icon: Facebook, label: "Facebook", href: SOCIAL_LINKS.facebook, color: "text-blue-600" },
                { Icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram, color: "text-pink-600" },
                { Icon: LinkIcon, label: "Official Website", href: SOCIAL_LINKS.website, color: "text-primary" },
                { Icon: Send, label: "WhatsApp Channel", href: SOCIAL_LINKS.whatsapp, color: "text-green-500", hint: "social media" },
              ].map(({ Icon, label, href, color, hint }) => (
                <Link key={label} href={href} target="_blank" rel="noopener noreferrer" 
                      className="flex items-center p-4 border border-border rounded-lg hover:bg-secondary transition-colors group">
                  <Icon className={`h-8 w-8 mr-4 ${color || 'text-primary'} group-hover:scale-110 transition-transform`} data-ai-hint={hint || label.toLowerCase()} />
                  <div>
                    <h4 className="font-semibold">{label}</h4>
                    <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Follow/Join Us</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Opt-in to our WhatsApp broadcast channel for instant notifications about satsangs, events, and important announcements.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
