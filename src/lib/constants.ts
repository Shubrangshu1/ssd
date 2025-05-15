
import type { NavItem, UpcomingEvent, PrayerTime, UserRole } from '@/types';
import { Home, Users, LogIn, HeartHandshake, Sprout, Wrench, Info, CalendarDays, Clock, MapPin, Youtube, Facebook, Instagram, Send, Landmark, ScrollText, History, ShieldCheck, UserCircle, LayoutDashboard, GanttChartSquare, Settings } from 'lucide-react';

export const APP_NAME = "Satsang Vihar Hyderabad";
export const APP_DESCRIPTION = "Devotional app for Satsang Vihar Hyderabad: Updates, donations, and community connection.";

export const MANDIR_NAME = "Satsang Vihar Hyderabad";
export const MANDIR_ADDRESS = "Dairyfarm junction, 1-1-5/1, Satsang Vihar, Rajendra Nagar Rd, opp. pillar no 216, Hyderabad, Telangana 500030";
export const MANDIR_MAP_EMBED_URL = "https://maps.app.goo.gl/UcVwb6AeEBKS6Vju5";

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/satsangviharhyderabad",
  facebook: "https://facebook.com/satsangviharhyderabad",
  website: "https://satsangviharhyderabad.org",
  instagram: "https://instagram.com/satsangviharhyderabad",
  whatsapp: "https://whatsapp.com/channel/satsangviharupdates",
};

export const UPI_ID = "satsangviharhyd@upi";
export const UPI_QR_CODE_URL = "https://placehold.co/250x250.png?text=Scan+UPI+QR";

// Reflecting the "Bottom Navigation Tabs" structure
export const NAV_LINKS: NavItem[] = [
  { href: "/home", label: "Home", icon: Home }, // Updated from / to /home
  { href: "/information", label: "Information", icon: Info },
  {
    href: "#", // Parent for dropdown
    label: "Donate",
    icon: HeartHandshake,
    children: [
      { href: "/donations/thakur-bhog", label: "Offer Thakur Bhog", icon: Landmark },
      { href: "/donations/maintenance", label: "Maintenance Seva", icon: Wrench },
    ]
  },
  { href: "/istabriti", label: "Istabriti", icon: ScrollText },
  { href: "/donations/satsang-sponsorship", label: "Sponsor Satsang", icon: Sprout },
];

export const AUTH_NAV_LINKS_GUEST: NavItem[] = [
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/signup", label: "Sign Up", icon: Users },
];

// Updated to include History and Admin Panel based on role
export const AUTH_NAV_LINKS_USER = (userRole?: UserRole): NavItem[] => {
  const items: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
    { href: "/dashboard/history", label: "Contribution History", icon: History, roles: ['volunteer', 'worker', 'admin'] },
  ];

  if (userRole === 'admin') {
    items.push({ href: "/admin", label: "Admin Panel", icon: Settings, roles: ['admin'] });
  }
  
  return items;
};


export const IMPORTANT_DATES_EVENTS: UpcomingEvent[] = [
  { id: "1", date: "Next Purnima", title: "Special Satsang & Kirtan", description: "Join us for an evening of devotion." },
  { id: "2", date: "Upcoming Festival", title: "Festival Celebrations", description: "Details to be announced soon." },
  { id: "3", date: "Every Sunday", title: "Weekly Satsang", description: "Timings: 11:00 am - 12:30 pm" },
];

export const PRAYER_TIMINGS: PrayerTime[] = [
  { id: "1", name: "Morning Prayer", time: "6:40 AM" },
  { id: "2", name: "Evening Prayer", time: "7:00 PM" },
  { id: "3", name: "Satsang (Sunday)", time: "11:00 am - 12:30 pm" },
];
