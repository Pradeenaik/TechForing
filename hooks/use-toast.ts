// hooks/use-toast.ts
import { Toast, toast } from "@/components/ui/toast"

export const useToast = () => {
  return {
    toast,
  }
}

export type { Toast }