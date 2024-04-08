import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateId } from "@/lib/utils";
import { ChoiceQuestion, SurveyDefinition } from "@/types/survey";
import { FieldApi, FormApi } from "@tanstack/react-form";
import { X } from "lucide-react";
import {
  QuestionCard,
  QuestionCardDeleteButton,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";

type Props = {
  questionIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<SurveyDefinition, any>;
};

/*
[ ] Toggle Single/Multiple
*/

export const ChoiceFormField = ({ questionIndex, form }: Props) => {
  return (
    <QuestionCard key={questionIndex}>
      <QuestionCardDeleteButton
        onClick={() => form.removeFieldValue(`questions`, questionIndex)}
      />
      <QuestionCardTitle>Choice Question</QuestionCardTitle>
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
        children={(
          field: FieldApi<
            SurveyDefinition,
            `questions[${number}].options`,
            undefined,
            undefined,
            ChoiceQuestion["options"]
          >
        ) => {
          return (
            <QuestionCardItem>
              <Label>Choices</Label>
              <div className="flex flex-col gap-1">
                {field.state.value.map((_, j) => {
                  return (
                    <form.Field
                      key={j}
                      name={`questions[${questionIndex}].options[${j}].value`}
                      children={(subField) => {
                        return (
                          <div className="flex gap-2 items-center">
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
                })}
              </div>
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    field.pushValue({
                      id: generateId(),
                      value: "",
                    })
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
