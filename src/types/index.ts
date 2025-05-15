
export type UserRole = "guest" | "volunteer" | "worker" | "admin" | "pending_worker";

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  role: UserRole;
  familyCode?: string; 
  gotra?: string; 
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  login: (type: "volunteer" | "worker", details: Partial<User>) => Promise<void>;
  logout: () => void;
  signupVolunteer: (details: Omit<User, "id" | "role">) => Promise<void>;
  requestWorkerAccess: (details: { phone: string; name: string }) => Promise<void>;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
  authRequired?: boolean;
  roles?: UserRole[]; // Roles that can see this link
  children?: NavItem[];
}

export interface UpcomingEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
}

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
}

// For storing donation history in localStorage (simulation)
export interface StoredDonation {
  id: string; // Unique ID for the donation record
  userId: string; // To associate with a user
  type: 'Thakur Bhog' | 'Satsang Sponsorship' | 'Maintenance Contribution';
  date: string; // ISO string for timestamp
  amount: number;
  transactionId?: string;
  // Fields from original forms
  name?: string; // Donor's name
  phone?: string; // Donor's phone (for maintenance)
  familyCode?: string; // For maintenance
  sponsorshipDate?: string; // For sponsorship (original date of sponsorship)
  purpose?: string; // For sponsorship
  gotra?: string; // For bhog
}
