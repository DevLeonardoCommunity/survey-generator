import { cn } from "@/lib/utils";
import React, { Children } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

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

const QuestionCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-flow-col justify-center items-center w-full",
      Children.count(props.children) === 1 ? "grid-cols-1" : "grid-cols-3",
      className
    )}
    {...props}
  />
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

const QuestionCardButtonsBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-end gap-4 h-8", className)}
    {...props}
  />
));

const QuestionCardBarButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <Button ref={ref} variant={"ghost"} size={"icon-sm"} {...props}>
    {children}
  </Button>
));

export {
  QuestionCard,
  QuestionCardBarButton,
  QuestionCardButtonsBar,
  QuestionCardHeader,
  QuestionCardItem,
  QuestionCardTitle,
};
