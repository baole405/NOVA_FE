import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/types";

export function ProfileHeader({ user }: { user: UserProfile }) {
  return (
    <Card className="h-fit">
      <CardContent className="flex flex-col items-center pt-8 text-center">
        <div className="relative group">
          <Avatar className="h-32 w-32 mb-4 border-4 border-background shadow-xl ring-2 ring-muted">
            <AvatarImage src={user.avatarUrl} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="text-white w-8 h-8" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-2">{user.name}</h3>
        <Badge variant="secondary" className="mt-2 capitalize px-3 py-1">
          {user.role}
        </Badge>

        <div className="w-full mt-6 space-y-4 text-left">
          <div className="flex justify-between text-sm py-2 border-b">
            <span className="text-muted-foreground">Joined</span>
            <span className="font-medium">Nov 2023</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b">
            <span className="text-muted-foreground">Family Members</span>
            <span className="font-medium">
              {user.familyMembers?.length || 0}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-muted-foreground">Vehicles</span>
            <span className="font-medium">{user.vehicles?.length || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
