"use client";

import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/client";
import { mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function UserNav() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
          router.refresh();
        },
      },
    });
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-background">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[calc(100vw-2rem)] sm:w-80"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="py-2">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold flex items-center gap-1">
              <Bell className="h-3 w-3" />
              Thông báo
            </span>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {unreadCount} mới
              </span>
            )}
          </div>

          <div className="max-h-[200px] overflow-y-auto">
            {mockNotifications.length > 0 ? (
              <div className="flex flex-col">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "px-2 py-2.5 hover:bg-accent cursor-pointer transition-colors border-b border-border/50 last:border-0",
                      notif.unread ? "bg-accent/30" : "",
                    )}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          notif.unread && "text-primary",
                        )}
                      >
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {notif.desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                Không có thông báo mới.
              </div>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-muted-foreground focus:text-foreground cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
