import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const QuestionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("flex flex-col gap-4 p-6 w-full relative", className)}
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

const QuestionCardDeleteButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("absolute top-4 right-4", className)}
    variant={"ghost"}
    size={"icon-sm"}
    {...props}
  >
    {children ?? <X />}
  </Button>
));

export {
  QuestionCard,
  QuestionCardItem,
  QuestionCardTitle,
  QuestionCardDeleteButton,
};
