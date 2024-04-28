import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurveyDefinition } from "@/types/survey";
import { FormApi } from "@tanstack/react-form";
import {
  QuestionCard,
  QuestionCardDeleteButton,
  QuestionCardHeader,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";
import { Label } from "@/components/ui/label";
import { valibotValidator } from "@tanstack/valibot-form-adapter";

type Props = {
  questionIndex: number;
  form: FormApi<SurveyDefinition, typeof valibotValidator>;
};

export const TextFormField = ({ questionIndex, form }: Props) => {
  return (
    <QuestionCard>
      <QuestionCardDeleteButton
        onClick={() => form.removeFieldValue(`questions`, questionIndex)}
      />
      <QuestionCardHeader>
        <QuestionCardTitle>Text Question</QuestionCardTitle>
        <form.Field
          name={`questions[${questionIndex}].required`}
          children={(field) => (
            <Button
              variant={field.state.value ? "destructive" : "outline"}
              size="sm"
              onClick={() => field.setValue(!field.state.value)}
              className="ml-auto"
            >
              {field.state.value ? "Required" : "Optional"}
            </Button>
          )}
        />
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
