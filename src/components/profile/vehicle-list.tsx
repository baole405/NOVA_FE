import { Bike, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Vehicle } from "@/types";

export function VehicleList({ vehicles }: { vehicles?: Vehicle[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          Registered Vehicles
        </CardTitle>
        <CardDescription>Vehicles authorized for parking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {vehicles?.map((veh) => (
          <div
            key={veh.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                {veh.type === "car" ? (
                  <Car className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <Bike className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-bold text-lg">{veh.licensePlate}</p>
                <Badge variant="outline" className="capitalize">
                  {veh.type}
                </Badge>
              </div>
            </div>
            {veh.imageUrl && (
              <div className="hidden sm:block h-12 w-20 bg-muted rounded overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${veh.imageUrl})` }}
                />
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-secondary text-black rounded-lg hover:bg-primary/67 transition-colors"
        >
          Add
        </button>
        {(!vehicles || vehicles.length === 0) && (
          <p className="text-center text-muted-foreground py-4">
            No vehicles registered.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
