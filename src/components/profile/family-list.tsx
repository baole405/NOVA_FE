import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FamilyMember } from "@/types";

export function FamilyList({ members }: { members?: FamilyMember[] }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Family Members
        </CardTitle>
        <CardDescription>Registered residents in your unit.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {members?.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">
                  {member.relation}
                </p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="text-muted-foreground">DOB</p>
              <p className="font-medium">{formatDate(member.dob)}</p>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-secondary text-black rounded-lg hover:bg-primary/67 transition-colors"
        >
          Add
        </button>
        {(!members || members.length === 0) && (
          <p className="text-center text-muted-foreground py-4">
            No family members registered.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
