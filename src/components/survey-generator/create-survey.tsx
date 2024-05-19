import { useSurveyForm } from "@/hooks/useSurveyForm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChoiceFormField } from "./question-blocks/choice";
import { TextFormField } from "./question-blocks/text";
import { BlockProps } from "./question-blocks/types";
import {
  QuestionCard,
  QuestionCardItem,
  QuestionCardTitle,
} from "./question-card";
import { SelectQuestionType } from "./select-question-type";

export const CreateSurvey = () => {
  const { form, onAddQuestion, onDuplicateQuestion } = useSurveyForm();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="w-full flex flex-col items-center mb-6 gap-6"
    >
      <div className="flex flex-col gap-3 items-center w-[800px] max-w-[95%]">
        <QuestionCard>
          <QuestionCardTitle>Survey Definition</QuestionCardTitle>
          <form.Field
            name="main.title"
            children={(field) => (
              <QuestionCardItem>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  className="text-2xl h-15"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </QuestionCardItem>
            )}
          />
          <form.Field
            name="main.description"
            children={(field) => (
              <QuestionCardItem>
                <Label>Description</Label>
                <Input
                  type="text"
                  placeholder="Description"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </QuestionCardItem>
            )}
          />
        </QuestionCard>

        <form.Field name="questions" mode="array">
          {(field) =>
            field.state.value.map((_, i) => {
              const props: BlockProps = {
                questionIndex: i,
                form,
                onDuplicateQuestion: () => onDuplicateQuestion(i),
              };
              switch (field.state.value[i].type) {
                case "text":
                  return <TextFormField key={i} {...props} />;
                case "choice":
                  return <ChoiceFormField key={i} {...props} />;
              }
            })
          }
        </form.Field>

        <div className="w-[250px]">
          <SelectQuestionType onAddQuestion={onAddQuestion} />
        </div>
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit || isSubmitting}>Generate Survey</Button>
        )}
      />
    </form>
  );
};
