import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn, generateId } from "@/lib/utils";
import { ChoiceQuestion } from "@/types/survey";
import {
  CheckCircle2,
  CheckSquare2,
  ChevronDown,
  Copy,
  LucideIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  QuestionCard,
  QuestionCardBarButton,
  QuestionCardButtonsBar,
  QuestionCardHeader,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";
import { BlockProps } from "./types";

const variants: {
  [key in ChoiceQuestion["variant"]]: {
    label: string;
    icon: LucideIcon;
  };
} = {
  multiple: {
    label: "Multiple Choice",
    icon: CheckSquare2,
  },
  single: {
    label: "Single Choice",
    icon: CheckCircle2,
  },
  dropdown: {
    label: "Dropdown",
    icon: ChevronDown,
  },
};

const iconClassName = "text-muted-foreground";

export const ChoiceFormField = ({
  questionIndex,
  form,
  onDuplicateQuestion,
}: BlockProps) => {
  const [isVariantSelectorOpen, setIsVarianSelectorOpen] = useState(false);

  return (
    <QuestionCard key={questionIndex}>
      <QuestionCardButtonsBar>
        <form.Field
          name={`questions[${questionIndex}].required`}
          children={(field) => (
            <div className="flex items-center space-x-2">
              <Switch
                id={`required-${questionIndex}`}
                checked={field.state.value}
                onCheckedChange={() => field.setValue(!field.state.value)}
              />
              <Label htmlFor={`required-${questionIndex}`}>Required</Label>
            </div>
          )}
        />
        <Separator orientation="vertical" />
        <QuestionCardBarButton
          onClick={onDuplicateQuestion}
          children={<Copy />}
        />
        <QuestionCardBarButton
          onClick={() => form.removeFieldValue(`questions`, questionIndex)}
          children={<X />}
        />
      </QuestionCardButtonsBar>
      <QuestionCardHeader>
        <form.Field
          name={`questions[${questionIndex}].variant`}
          children={(field) => {
            const selectedVariant =
              variants[field.state.value as ChoiceQuestion["variant"]];

            return (
              <Popover
                open={isVariantSelectorOpen}
                onOpenChange={setIsVarianSelectorOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-[150px] justify-start"
                  >
                    {selectedVariant && (
                      <>
                        <selectedVariant.icon className="mr-2 h-4 w-4 shrink-0" />
                        {selectedVariant.label}
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {Object.entries(variants).map(([value, variant]) => (
                          <CommandItem
                            key={value}
                            value={value}
                            onSelect={() => {
                              field.setValue(value);
                              setIsVarianSelectorOpen(false);
                            }}
                          >
                            <variant.icon className={cn("mr-2 h-4 w-4")} />
                            <span>{variant.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            );
          }}
        />
        <QuestionCardTitle>Choice Question</QuestionCardTitle>
      </QuestionCardHeader>
      <form.Field
        name={`questions[${questionIndex}].question`}
        children={(field) => (
          <QuestionCardItem>
            <Label>Question</Label>
            <Input
              type="text"
              placeholder="Question"
              className="text-md"
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </QuestionCardItem>
        )}
      />
      <form.Field
        name={`questions[${questionIndex}].options`}
        mode="array"
        children={(field) => {
          return (
            <QuestionCardItem>
              <Label>Choices</Label>
              <div className="flex flex-col gap-1">
                {(field.state.value as ChoiceQuestion["options"]).map(
                  (_, j) => {
                    return (
                      <form.Field
                        key={j}
                        name={`questions[${questionIndex}].options[${j}].value`}
                        children={(subField) => {
                          return (
                            <div className="flex gap-2 items-center">
                              <form.Subscribe
                                selector={(state) =>
                                  (
                                    state.values.questions[
                                      questionIndex
                                    ] as ChoiceQuestion
                                  ).variant
                                }
                                children={(variantValue) => {
                                  const Icon = variants[variantValue]?.icon;
                                  return (
                                    Icon && <Icon className={iconClassName} />
                                  );
                                }}
                              />
                              <Input
                                type="text"
                                placeholder="Option"
                                name={subField.name}
                                value={(subField.state.value as string) ?? ""}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                autoFocus
                              />
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => field.removeValue(j)}
                              >
                                <X />
                              </Button>
                            </div>
                          );
                        }}
                      />
                    );
                  }
                )}
              </div>
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    field.pushValue({
                      id: generateId(),
                      value: "",
                    } as never)
                  }
                  type="button"
                >
                  Add Option
                </Button>
              </div>
            </QuestionCardItem>
          );
        }}
      />
    </QuestionCard>
  );
};
