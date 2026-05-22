"use client";

import { Menu } from "lucide-react";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function DashboardHeader({ title }: { title: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/60 px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open sidebar"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Dashboard navigation</SheetTitle>
            </SheetHeader>
            <DashboardSidebar className="w-full border-0" />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
