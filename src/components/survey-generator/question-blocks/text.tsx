import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SurveyDefinition } from "@/types/survey";
import { FormApi } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { Copy, X } from "lucide-react";
import {
  QuestionCard,
  QuestionCardBarButton,
  QuestionCardButtonsBar,
  QuestionCardHeader,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";
import { Separator } from "@/components/ui/separator";
import { generateId } from "@/lib/utils";

type Props = {
  questionIndex: number;
  form: FormApi<SurveyDefinition, typeof valibotValidator>;
};

export const TextFormField = ({ questionIndex, form }: Props) => {
  const duplicateQuestion = () => {
    const question = form.state.values.questions[questionIndex];
    form.insertFieldValue("questions", questionIndex + 1, { ...question, id: generateId() }, { touch: true });
  };

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
          onClick={duplicateQuestion}
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
