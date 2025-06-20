
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut, UserCircle, Users, ChevronDown, ChevronUp, Settings } from 'lucide-react';
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
import { APP_NAME, NAV_LINKS, AUTH_NAV_LINKS_GUEST, AUTH_NAV_LINKS_USER } from '@/lib/constants';
import type { NavItem } from '@/types';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

const NavLinkItem = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));

  if (item.children) {
    // For mobile, render sub-items directly or use Accordion if deeper nesting is needed
    return (
      <div>
        <button
          className={cn(
            "flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-sm font-medium",
            isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={(e) => { // Basic toggle for mobile sub-menu, can be enhanced
            const nextEl = e.currentTarget.nextElementSibling;
            if (nextEl) nextEl.classList.toggle('hidden');
          }}
        >
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </div>
          <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
        </button>
        <div className="hidden pl-4 mt-1 space-y-1"> {/* Sub-menu container */}
          {item.children.map(child => (
            <NavLinkItem key={child.href} item={child} onClick={onClick} />
          ))}
        </div>
      </div>
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

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const getInitials = (name?: string) => {
    if (!name) return "SV";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const userNavItems = user && user.role !== 'guest' ? AUTH_NAV_LINKS_USER(user.role) : [];

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
          {userNavItems.map(item => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href}>
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
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
              <Image 
                src="https://placehold.co/32x32.png" 
                alt={`${APP_NAME} Logo`}
                width={32} 
                height={32}
                className="h-8 w-8"
                data-ai-hint="temple logo om"
                priority
              />
              <span className="font-semibold text-xl text-primary">{APP_NAME}</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((item) => (
              <DesktopNavLinkItem key={item.href + item.label} item={item} />
            ))}
            {!loading && user && user.role !== 'guest' ? (
              <>
                <UserMenu />
                <ThemeToggleButton />
              </>
            ) : !loading ? (
              <>
                {AUTH_NAV_LINKS_GUEST.map((item) => (
                  <DesktopNavLinkItem key={item.href + item.label} item={item} />
                ))}
                <ThemeToggleButton />
              </>
            ) : <ThemeToggleButton /> /* Show toggle even when loading or no user */}
          </nav>

          <div className="md:hidden flex items-center">
             <ThemeToggleButton />
            {!loading && user && user.role !== 'guest' ? (
                <UserMenu /> 
              ) : null }
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("ml-2", !(user && user.role !== 'guest') && "ml-0")}> {/* Adjust margin if user menu is not present */}
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                         <Image 
                            src="https://placehold.co/32x32.png"
                            alt={`${APP_NAME} Logo`}
                            width={32} 
                            height={32}
                            className="h-8 w-8"
                            data-ai-hint="temple logo om"
                            priority
                          />
                        <span className="font-semibold text-xl text-primary">{APP_NAME}</span>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                </div>
                  <nav className="flex flex-col space-y-1">
                    {NAV_LINKS.map((item) => (
                      <NavLinkItem key={item.href + item.label} item={item} onClick={() => setMobileMenuOpen(false)} />
                    ))}
                    <hr className="my-2"/>
                    {!loading && user && user.role !== 'guest' ? (
                      <>
                        {userNavItems.map(item => (
                           <NavLinkItem key={item.href + item.label} item={item} onClick={() => setMobileMenuOpen(false)} />
                        ))}
                        <div className="mt-2">
                            <Button variant="outline" className="w-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </div>
                      </>
                    ) : !loading ? (
                      AUTH_NAV_LINKS_GUEST.map((item) => (
                         <NavLinkItem key={item.href + item.label} item={item} onClick={() => setMobileMenuOpen(false)} />
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
