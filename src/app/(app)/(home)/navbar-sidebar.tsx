import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  isAuthenticated?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
  items,
  open,
  isAuthenticated,
  onOpenChange,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-secondary hover:text-primary transition-colors flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="border-t">
              <Link
                href="/admin"
                className="w-full text-left p-4 hover:bg-secondary hover:text-primary transition-colors flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="border-t">
              <Link
                href="/sign-in"
                className="w-full text-left p-4 hover:bg-secondary hover:text-primary transition-colors flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="w-full text-left p-4 hover:bg-secondary hover:text-primary transition-colors flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Start Selling
              </Link>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
