import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground shadow-sm",
          "hover:bg-primary/90",
          "active:bg-primary/80",
          "dark:hover:bg-primary/80 dark:active:bg-primary/70"
        ],
        destructive: [
          "bg-destructive text-destructive-foreground shadow-sm",
          "hover:bg-destructive/90",
          "active:bg-destructive/80",
          "focus-visible:ring-destructive/30",
          "dark:hover:bg-destructive/80 dark:active:bg-destructive/70"
        ],
        outline: [
          "border border-input bg-background shadow-sm",
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80",
          "dark:border-input/30 dark:hover:bg-accent/20 dark:active:bg-accent/30"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground shadow-sm",
          "hover:bg-secondary/80",
          "active:bg-secondary/70",
          "dark:hover:bg-secondary/70 dark:active:bg-secondary/60"
        ],
        ghost: [
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80",
          "dark:hover:bg-accent/20 dark:active:bg-accent/30"
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline",
          "active:text-primary/80",
          "dark:active:text-primary/70"
        ]
      },
      size: {
        default: "h-10 px-4 py-2 [&_svg]:size-4",
        sm: "h-9 px-3 py-1.5 text-sm [&_svg]:size-3.5",
        lg: "h-11 px-6 py-3 text-base [&_svg]:size-5",
        icon: "size-10 p-0 justify-center [&_svg]:size-4",
        "icon-sm": "size-9 p-0 justify-center [&_svg]:size-3.5",
        "icon-lg": "size-11 p-0 justify-center [&_svg]:size-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), loading && "opacity-70")}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-flex animate-spin mr-2">
              {/* Replace with your loading spinner icon */}
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                />
                <path
                  fill="currentColor"
                  d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                />
              </svg>
            </span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }