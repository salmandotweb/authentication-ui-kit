import { useToast } from "@/hooks/use-toast";

export function useErrorToast() {
   const { toast } = useToast();

   const showErrorToast = (error: any) => {
      const errorMessage =
         error.response?.data?.meta?.errors?.[0] || "An unexpected error occurred";

      toast({
         title: "Error",
         description: typeof error === "object" ? errorMessage : error,
         variant: "destructive",
      });
   };

   return showErrorToast;
}

export function useSuccessToast() {
   const { toast } = useToast();

   const showSuccessToast = (message: string) => {
      toast({
         title: "Success",
         description: message,
      });
   };

   return showSuccessToast;
}
