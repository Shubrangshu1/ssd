
import type { NavItem, UpcomingEvent, PrayerTime, UserRole } from '@/types';
import { Home, Users, LogIn, HeartHandshake, Sprout, Wrench, Info, CalendarDays, Clock, MapPin, Youtube, Facebook, Instagram, Send, Landmark, ScrollText, History, ShieldCheck, UserCircle, LayoutDashboard, GanttChartSquare, Settings } from 'lucide-react';

export const APP_NAME = "Satsang Vihar Hyderabad";
export const APP_DESCRIPTION = "Devotional app for Satsang Vihar Hyderabad: Updates, donations, and community connection.";

export const MANDIR_NAME = "Satsang Vihar Hyderabad";
export const MANDIR_ADDRESS = "Dairyfarm junction, 1-1-5/1, Satsang Vihar, Rajendra Nagar Rd, opp. pillar no 216, Hyderabad, Telangana 500030";
export const MANDIR_MAP_EMBED_URL = "https://maps.app.goo.gl/UcVwb6AeEBKS6Vju5";

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@satsangviharhyderabad",
  facebook: "https://facebook.com/profile.php?id=61572984027492",
  website: "https://satsanghyderabad.org/",
  instagram: "https://instagram.com/satsanghyderabad",
  whatsapp: "https://whatsapp.com/channel/satsangviharupdates", // Assuming this is a placeholder or a generic link
};

export const UPI_ID = "satsangviharhyd@upi";
export const UPI_QR_CODE_URL = "https://placehold.co/250x250.png?text=Scan+UPI+QR";

export const NAV_LINKS: NavItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/information", label: "Information", icon: Info },
  {
    href: "#",
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

export const MONTHLY_PRAYER_SCHEDULE: Array<{ monthIndex: number; monthName: string; morning: string; evening: string }> = [
  { monthIndex: 0, monthName: "January", morning: "6:48 AM", evening: "6:03 PM" },
  { monthIndex: 1, monthName: "February", morning: "6:41 AM", evening: "6:18 PM" },
  { monthIndex: 2, monthName: "March", morning: "6:23 AM", evening: "6:26 PM" },
  { monthIndex: 3, monthName: "April", morning: "5:45 AM", evening: "6:40 PM" },
  { monthIndex: 4, monthName: "May", morning: "5:44 AM", evening: "6:50 PM" },
  { monthIndex: 5, monthName: "June", morning: "5:52 AM", evening: "6:40 PM" },
  { monthIndex: 6, monthName: "July", morning: "6:00 AM", evening: "6:18 PM" },
  { monthIndex: 7, monthName: "August", morning: "6:04 AM", evening: "5:55 PM" },
  { monthIndex: 8, monthName: "September", morning: "6:09 AM", evening: "5:42 PM" },
  { monthIndex: 9, monthName: "October", morning: "6:21 AM", evening: "5:46 PM" },
  { monthIndex: 10, monthName: "November", morning: "6:37 AM", evening: "5:46 PM" },
  { monthIndex: 11, monthName: "December", morning: "6:37 AM", evening: "5:46 PM" },
];

export const STATIC_SUNDAY_SATSANG_TIME = "11:00 am - 12:30 pm";

export const PRAYER_TIMINGS_DEFAULT: PrayerTime[] = [
  { id: "1", name: "Morning Prayer", time: "N/A" }, // Default shown while client loads
  { id: "2", name: "Evening Prayer", time: "N/A" }, // Default shown while client loads
  { id: "3", name: "Satsang (Sunday)", time: STATIC_SUNDAY_SATSANG_TIME },
];

export function getDynamicPrayerTimes(): PrayerTime[] {
  const now = new Date();
  const currentMonthIndex = now.getMonth(); // 0 for January, 1 for February, etc.
  const monthSchedule = MONTHLY_PRAYER_SCHEDULE.find(m => m.monthIndex === currentMonthIndex);

  if (monthSchedule) {
    return [
      { id: "1", name: `Morning Prayer (${monthSchedule.monthName})`, time: monthSchedule.morning },
      { id: "2", name: `Evening Prayer (${monthSchedule.monthName})`, time: monthSchedule.evening },
      { id: "3", name: "Satsang (Sunday)", time: STATIC_SUNDAY_SATSANG_TIME },
    ];
  }
  // Fallback to default if current month's schedule isn't found for some reason
  return PRAYER_TIMINGS_DEFAULT;
}
