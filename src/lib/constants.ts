import type { NavItem, UpcomingEvent, PrayerTime } from '@/types';
import { Home, Users, LogIn, HeartHandshake, Sprout, Wrench, Info, CalendarDays, Clock, MapPin, Youtube, Facebook, Instagram, Send, Landmark } from 'lucide-react';

export const APP_NAME = "Satsang Seva";
export const APP_DESCRIPTION = "Devotional app for Satsang Vihar Hyderabad: Updates, donations, and community connection.";

export const MANDIR_NAME = "Satsang Vihar Hyderabad";
export const MANDIR_ADDRESS = "123 Devotion Path, Hyderabad, Telangana, India";
// Replace with actual Google Maps embed URL or coordinates
export const MANDIR_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.080000000000!2d78.47000000000000!3d17.40000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDI0JzAwLjAiTiA3OMKwMjgnMTIuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin";

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/satsangviharhyderabad",
  facebook: "https://facebook.com/satsangviharhyderabad",
  website: "https://satsangviharhyderabad.org",
  instagram: "https://instagram.com/satsangviharhyderabad",
  whatsapp: "https://whatsapp.com/channel/satsangviharupdates", // Example link
};

export const UPI_ID = "satsangviharhyd@upi";
export const UPI_QR_CODE_URL = "https://placehold.co/250x250.png?text=Scan+UPI+QR"; // Placeholder QR code

export const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/information", label: "Information", icon: Info },
  {
    href: "/donations", label: "Donations", icon: HeartHandshake,
    children: [
      { href: "/donations/satsang-sponsorship", label: "Sponsor Satsang", icon: Sprout },
      { href: "/donations/thakur-bhog", label: "Offer Thakur Bhog", icon: Landmark },
    ]
  },
  { href: "/donations/maintenance", label: "Maintenance Seva", icon: Wrench },
];

export const AUTH_NAV_LINKS_GUEST: NavItem[] = [
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/signup", label: "Sign Up", icon: Users },
];

export const AUTH_NAV_LINKS_USER = (name?: string): NavItem[] => [
 {
    href: "/dashboard", label: name ? `Welcome, ${name}` : "Dashboard", icon: Users,
    children: [
      { href: "/dashboard/profile", label: "Profile", icon: Users },
      // More dashboard links based on role can be added here
    ]
  },
  // Logout is handled by a button, not a nav link typically
];


export const IMPORTANT_DATES_EVENTS: UpcomingEvent[] = [
  { id: "1", date: "Next Purnima", title: "Special Satsang & Kirtan", description: "Join us for an evening of devotion." },
  { id: "2", date: "Upcoming Festival", title: "Festival Celebrations", description: "Details to be announced soon." },
  { id: "3", date: "Every Sunday", title: "Weekly Satsang", description: "Timings: 10 AM - 12 PM" },
];

export const PRAYER_TIMINGS: PrayerTime[] = [
  { id: "1", name: "Morning Aarti", time: "6:00 AM" },
  { id: "2", name: "Evening Aarti", time: "7:00 PM" },
  { id: "3", name: "Satsang (Sunday)", time: "10:00 AM - 12:00 PM" },
];
