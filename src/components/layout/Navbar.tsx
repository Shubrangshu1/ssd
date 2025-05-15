
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut, UserCircle, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { APP_NAME, NAV_LINKS, AUTH_NAV_LINKS_GUEST } from '@/lib/constants';
import type { NavItem } from '@/types';

const NavLinkItem = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  if (item.children) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={cn(
            "flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-sm font-medium",
            isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}>
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {item.children.map(child => (
              <DropdownMenuItem key={child.href} asChild>
                <Link href={child.href} onClick={onClick} className="flex items-center gap-2">
                  {child.icon && <child.icon className="h-4 w-4" />}
                  {child.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "block px-3 py-2 rounded-md text-sm font-medium",
        isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="flex items-center gap-2">
        {item.icon && <item.icon className="h-4 w-4" />}
        {item.label}
      </div>
    </Link>
  );
};

const DesktopNavLinkItem = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "text-sm font-medium",
              isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.label}
              <ChevronDown className="h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {item.children.map(child => (
            <DropdownMenuItem key={child.href} asChild>
              <Link href={child.href} className="flex items-center gap-2">
                 {child.icon && <child.icon className="h-4 w-4" />}
                {child.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="ghost" asChild className={cn(isActive ? "text-primary" : "text-foreground/80 hover:text-foreground")}>
      <Link href={item.href}>
        {item.icon && <item.icon className="h-4 w-4 mr-1" />}
        {item.label}
      </Link>
    </Button>
  );
};

// Om SVG Icon
const OmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5" // Adjusted for better visual balance with fill
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    data-ai-hint="om symbol"
  >
    <path d="M10.163 4.037c.07-.07.149-.138.233-.203.584-.457 1.39-.734 2.254-.734 1.132 0 2.14.43 2.885 1.175.745.745 1.175 1.753 1.175 2.885 0 .833-.26 1.608-.69 2.227a4.006 4.006 0 0 1-.21.263M5.01 10.613c.31-.913.93-1.717 1.76-2.322m12.387 3.656c.2.628.313 1.285.313 1.966 0 2.485-2.015 4.5-4.5 4.5-1.14 0-2.165-.43-2.923-1.152-.742-.708-1.19-1.698-1.19-2.798 0-1.25.458-2.357 1.212-3.148M9.09 12.194c-2.56 1.866-2.84 5.047-1.414 7.121C9.512 21.54 12.56 22 15 20.292c2.44-1.708 2.7-5.042 1.414-7.122-1.285-2.08-4.177-2.708-6.324-1.976M8.23 16.06c.345.639 1.29.89 2.05.53.76-.36 1.035-1.425.69-2.064s-1.29-.89-2.05-.53c-.76.36-1.035 1.425-.69 2.064z" />
  </svg>
);


export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getInitials = (name?: string) => {
    if (!name) return "SV"; // Updated for Satsang Vihar
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.role === 'volunteer' || user?.role === 'worker' ? `https://placehold.co/100x100.png?text=${getInitials(user.name)}` : undefined} alt={user?.name || "User"} />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || user?.phone}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <OmIcon className="h-8 w-8 text-primary" />
              <span className="font-semibold text-xl text-primary">{APP_NAME}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((item) => (
              <DesktopNavLinkItem key={item.href} item={item} />
            ))}
            {!loading && user && user.role !== 'guest' ? (
               <UserMenu />
            ) : !loading ? (
              AUTH_NAV_LINKS_GUEST.map((item) => (
                <DesktopNavLinkItem key={item.href} item={item} />
              ))
            ) : null}
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
            {!loading && user && user.role !== 'guest' ? (
                <UserMenu />
              ) : null }
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                         <OmIcon className="h-8 w-8 text-primary" />
                        <span className="font-semibold text-xl text-primary">{APP_NAME}</span>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                </div>
                  <nav className="flex flex-col space-y-2">
                    {NAV_LINKS.map((item) => (
                      <NavLinkItem key={item.href} item={item} onClick={() => setMobileMenuOpen(false)} />
                    ))}
                    <hr className="my-2"/>
                    {!loading && user && user.role !== 'guest' ? (
                      <>
                        {/* <NavLinkItem item={{href: "/dashboard/profile", label: "Profile", icon: Users}} onClick={() => setMobileMenuOpen(false)} /> */}
                        {/* Logout handled by user menu, or a dedicated button here */}
                      </>
                    ) : !loading ? (
                      AUTH_NAV_LINKS_GUEST.map((item) => (
                         <NavLinkItem key={item.href} item={item} onClick={() => setMobileMenuOpen(false)} />
                      ))
                    ) : null}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

