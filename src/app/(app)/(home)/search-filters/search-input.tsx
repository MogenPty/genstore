"use client";

import { ListFilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CategoriesSidebar } from "./categories-sidebar";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
      </div>
      <Button
        variant="elevated"
        className="size-9 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* library button */}
    </div>
  );
};
