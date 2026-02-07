import { Menu } from "lucide-react";
import { ManagerSidebar } from "@/components/manager/manager-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-muted/20">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50 shadow-sm">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-72">
            <SheetTitle className="sr-only">Manager Navigation Menu</SheetTitle>
            <ManagerSidebar className="border-none" />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-primary/10 rounded-full">
            <span className="text-xs font-semibold text-primary">Manager</span>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 shrink-0 min-h-screen">
        <ManagerSidebar className="sticky top-0 h-screen" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
