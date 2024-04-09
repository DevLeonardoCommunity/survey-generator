import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateId } from "@/lib/utils";
import { ChoiceQuestion, SurveyDefinition } from "@/types/survey";
import { FormApi, useField } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { CheckSquare2, ChevronDown, CircleDot, X } from "lucide-react";
import {
  QuestionCard,
  QuestionCardDeleteButton,
  QuestionCardHeader,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";

type Props = {
  questionIndex: number;
  form: FormApi<SurveyDefinition, typeof valibotValidator>;
};

const variants: { [key in ChoiceQuestion["variant"]]: string } = {
  single: "Single Choice",
  multiple: "Multiple Choice",
  dropdown: "Dropdown",
};

const iconClassName = "text-muted-foreground";

export const ChoiceFormField = ({ questionIndex, form }: Props) => {
  const variantField = useField({
    name: `questions[${questionIndex}].variant`,
    form,
  });

  const variantValue = variantField.getValue() as string;

  return (
    <QuestionCard key={questionIndex}>
      <QuestionCardDeleteButton
        onClick={() => form.removeFieldValue(`questions`, questionIndex)}
      />
      <QuestionCardHeader>
        <Select
          onValueChange={(variant) => variantField.setValue(variant)}
          defaultValue={variantValue}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Variants</SelectLabel>
              {Object.entries(variants).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

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
              value={field.state.value}
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
                              {variantValue === "single" && (
                                <CircleDot className={iconClassName} />
                              )}
                              {variantValue === "multiple" && (
                                <CheckSquare2 className={iconClassName} />
                              )}
                              {variantValue === "dropdown" && (
                                <ChevronDown className={iconClassName} />
                              )}
                              <Input
                                type="text"
                                placeholder="Option"
                                name={subField.name}
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value as never)
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
