"use client";

import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

import { NavbarSidebar } from "@/modules/home/ui/components/navbar-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent border-transparent hover:border-primary px-3.5 text-lg",
        isActive && "bg-primary text-white hover:bg-primary hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const NavbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link className="pl-6 flex items-center" href="/">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          genstore
        </span>
      </Link>

      <NavbarSidebar
        items={NavbarItems}
        isAuthenticated={!!session.data?.user}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {NavbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={
              pathname === item.href ||
              (item.href === "/" && pathname === "/home")
            }
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="border-l border-r-0 border-t-0 border-b-0 px-12 h-full rounded-none bg-primary hover:bg-secondary text-white hover:text-primary transition-colors text-lg"
          >
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="border-l border-r-0 border-t-0 border-b-0 px-12 h-full rounded-none bg-white hover:bg-secondary text-primary transition-colors text-lg"
          >
            <Link prefetch href="/sign-in">
              Login
            </Link>
          </Button>
          <Button
            asChild
            className="border-l border-r-0 border-t-0 border-b-0 px-12 h-full rounded-none bg-primary hover:bg-secondary text-white hover:text-primary transition-colors text-lg"
          >
            <Link prefetch href="/sign-up">
              Start Selling
            </Link>
          </Button>
        </div>
      )}

      <div className="flex items-center lg:hidden justify-center bg-transparent">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(true)}
          className="size-12 border-transparent "
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
