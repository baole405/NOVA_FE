"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    const root = document.documentElement;
    if (checked) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Giao diện</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <Label htmlFor="theme-toggle" className="text-sm font-medium">
                Chế độ tối
              </Label>
              <p className="text-xs text-muted-foreground">
                {isDark
                  ? "Đang sử dụng giao diện tối"
                  : "Đang sử dụng giao diện sáng"}
              </p>
            </div>
          </div>
          <Switch
            id="theme-toggle"
            checked={isDark}
            onCheckedChange={toggleTheme}
          />
        </div>
      </CardContent>
    </Card>
  );
}
