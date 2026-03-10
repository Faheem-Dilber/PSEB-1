import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "bg-destructive/10 border border-destructive text-destructive",
        success: "bg-green-100 border border-green-400 text-green-700",
        warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({ className, variant, children, ...props }) {
  return (
    <div className={cn(alertVariants({ variant, className }))} {...props}>
      {children}
    </div>
  );
}

export { Alert };
