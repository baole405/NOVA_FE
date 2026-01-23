"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "terms" | "privacy";
}

export function PolicyDialog({
  open,
  onOpenChange,
  defaultTab = "terms",
}: PolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Legal Information</DialogTitle>
          <DialogDescription>
            Please review our terms and privacy policy carefully.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={defaultTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 py-2 bg-muted/30 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>
          </div>

          {/* Nội dung Terms */}
          <TabsContent
            value="terms"
            className="flex-1 p-6 overflow-y-auto mt-0 space-y-4 text-sm text-muted-foreground"
          >
            <h3 className="text-lg font-bold text-foreground">
              1. Introduction
            </h3>
            <p>
              Welcome to NOVA. By accessing our website and using our services,
              you agree to comply with and be bound by the following terms and
              conditions.
            </p>

            <h3 className="text-lg font-bold text-foreground">
              2. User Responsibilities
            </h3>
            <p>
              As a resident using NOVA, you are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account. You agree to notify us immediately
              of any unauthorized use.
            </p>

            <h3 className="text-lg font-bold text-foreground">
              3. Payment Obligations
            </h3>
            <p>
              You agree to pay all service fees, utility bills, and other
              charges associated with your apartment unit by the due date.
              Failure to pay may result in late fees or service restrictions.
            </p>

            <h3 className="text-lg font-bold text-foreground">
              4. Termination
            </h3>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these Terms of Service or engage in illegal activities
              within the platform.
            </p>
          </TabsContent>

          {/* Nội dung Privacy - ĐÃ SỬA LỖI HTML */}
          <TabsContent
            value="privacy"
            className="flex-1 p-6 overflow-y-auto mt-0 space-y-4 text-sm text-muted-foreground"
          >
            <h3 className="text-lg font-bold text-foreground">
              1. Data Collection
            </h3>
            <p>
              We collect information you provide directly to us, such as your
              name, email address, phone number, and apartment details when you
              register for an account.
            </p>

            <h3 className="text-lg font-bold text-foreground">
              2. How We Use Your Data
            </h3>
            {/* FIX: Đóng thẻ p trước khi mở thẻ ul, hoặc dùng div bao quanh */}
            <div>
              We use your information to:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Process your monthly bill payments.</li>
                <li>
                  Send you notifications about due dates and announcements.
                </li>
                <li>Improve our services and platform security.</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-foreground">
              3. Data Sharing
            </h3>
            <p>
              We do not sell your personal data. We may share your information
              with third-party service providers (e.g., payment processors like
              PayOS) strictly for the purpose of providing our services.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
