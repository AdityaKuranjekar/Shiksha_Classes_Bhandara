"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${variant === "danger" ? "bg-red-500/10" : "bg-amber-500/10"}`}>
              <AlertTriangle className={`h-5 w-5 ${variant === "danger" ? "text-red-400" : "text-amber-400"}`} />
            </div>
            <DialogTitle className="text-[#ECEDEE]">{title}</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="text-[#8B919A] mt-2 ml-[52px]">
          {description}
        </DialogDescription>
        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-[#8B919A]"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "destructive" : "outline"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={variant === "danger" ? "bg-red-600 hover:bg-red-700 text-white" : "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
