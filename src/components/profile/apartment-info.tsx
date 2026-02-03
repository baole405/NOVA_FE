import { Building } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apartment } from "@/types";

export function ApartmentInfo({ apartment }: { apartment?: Apartment }) {
  if (!apartment) return null;

  const InfoBox = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="p-4 bg-muted/20 rounded-lg text-center border">
      <p className="text-xs text-muted-foreground uppercase font-bold">
        {label}
      </p>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Apartment Information
        </CardTitle>
        <CardDescription>Details about your registered unit.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <InfoBox label="Block" value={apartment.block} />
          <InfoBox label="Unit" value={apartment.unitNumber} />
          <InfoBox label="Floor" value={apartment.floor} />
          <InfoBox label="Area" value={`${apartment.area} m²`} />
        </div>
      </CardContent>
    </Card>
  );
}
