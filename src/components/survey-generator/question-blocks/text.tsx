import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Copy, X } from "lucide-react";
import {
  QuestionCard,
  QuestionCardBarButton,
  QuestionCardButtonsBar,
  QuestionCardHeader,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";
import { BlockProps } from "./types";

export const TextFormField = ({
  questionIndex,
  form,
  onDuplicateQuestion,
}: BlockProps) => {
  return (
    <QuestionCard>
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
        <QuestionCardTitle>Text Question</QuestionCardTitle>
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
    </QuestionCard>
  );
};
