
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Facebook, Link as LinkIcon, Instagram, Send, Users, HeartHandshake, ArrowRight, Landmark, Sprout, Wrench } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function StaticInfoSections() {
  return (
    <>
      <Card className="md:col-span-2 lg:col-span-3 animate-bounce-in-from-bottom delay-600">
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

      <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary/10 to-accent/10 animate-bounce-in-from-bottom delay-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <HeartHandshake className="h-7 w-7" />
            Support Our Mandir
          </CardTitle>
          <CardDescription>Your contributions help us maintain and grow our spiritual activities.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/donations/satsang-sponsorship" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow hover:scale-[1.02]">
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
             <Card className="h-full hover:shadow-lg transition-shadow hover:scale-[1.02]">
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
            <Card className="h-full hover:shadow-lg transition-shadow hover:scale-[1.02]">
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
    </>
  );
}
