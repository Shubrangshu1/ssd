export type UserRole = "guest" | "volunteer" | "worker" | "admin" | "pending_worker";

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  role: UserRole;
  familyCode?: string; // For maintenance contribution
  gotra?: string; // For bhog
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  login: (type: "volunteer" | "worker", details: Partial<User>) => Promise<void>;
  logout: () => void;
  signupVolunteer: (details: Omit<User, "id" | "role">) => Promise<void>;
  requestWorkerAccess: (details: { phone: string; name: string }) => Promise<void>;
  // approveWorker: (userId: string) => void; // Example for admin action
}

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
  authRequired?: boolean;
  roles?: UserRole[];
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
