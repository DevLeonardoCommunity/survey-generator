import { Input } from "@/components/ui/input";
import { SurveyDefinition } from "@/types/survey";
import { FormApi } from "@tanstack/react-form";
import {
  QuestionCard,
  QuestionCardItem,
  QuestionCardTitle,
} from "../question-card";
import { Label } from "@/components/ui/label";

type Props = {
  questionIndex: number;
  form: FormApi<SurveyDefinition, undefined>;
};

export const TextFormField = ({ questionIndex, form }: Props) => {
  return (
    <QuestionCard>
      <QuestionCardTitle>Text Question</QuestionCardTitle>
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
