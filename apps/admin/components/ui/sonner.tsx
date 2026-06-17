"use client"
import { Toaster as Sonner } from "sonner"
type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-[#1C2025] group-[.toaster]:text-[#ECEDEE] group-[.toaster]:border-[#2C333C] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#8B919A]",
          actionButton: "group-[.toast]:bg-[#1E6FA8] group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-[#222830] group-[.toast]:text-[#8B919A]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
