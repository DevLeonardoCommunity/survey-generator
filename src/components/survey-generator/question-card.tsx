import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const QuestionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("flex flex-col gap-4 p-6 w-full", className)}
    {...props}
  />
));
QuestionCard.displayName = "QuestionCard";

const QuestionCardItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 ", className)} {...props} />
));

const QuestionCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-center text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

export { QuestionCard, QuestionCardItem, QuestionCardTitle };
