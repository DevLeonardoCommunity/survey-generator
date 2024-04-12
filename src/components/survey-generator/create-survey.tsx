import { useStorage } from "@/hooks/useStorage";
import { generateId } from "@/lib/utils";
import {
  ChoiceQuestion,
  QuestionType,
  SurveyDefinition,
  TextQuestion,
} from "@/types/survey";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChoiceFormField } from "./question-blocks/choice";
import { TextFormField } from "./question-blocks/text";
import {
  QuestionCard,
  QuestionCardItem,
  QuestionCardTitle,
} from "./question-card";
import { SelectQuestionType } from "./select-question-type";

const defaultValues: SurveyDefinition = {
  id: generateId(),
  main: {
    title: "",
    description: "",
  },
  questions: [],
};

export const CreateSurvey = () => {
  const navigate = useNavigate();
  const { save } = useStorage();
  const form = useForm({
    validatorAdapter: valibotValidator,
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChange: SurveyDefinition,
    },
    defaultValues,
    onSubmitInvalid: (x) => {
      console.log(x);
    },
    onSubmit: async ({ value }) => {
      save(value);
    },
  });

  const onAddQuestion = (questionType: QuestionType) => {
    const getDefault = () => {
      switch (questionType) {
        case "text":
          return {
            type: "text",
            question: "",
          } as TextQuestion;
        case "choice":
          return {
            type: "choice",
            variant: "multiple",
            question: "",
            options: [
              {
                id: generateId(),
              },
            ] as ChoiceQuestion["options"],
          } as ChoiceQuestion;
      }
    };

    const newQuestion = {
      ...getDefault(),
      id: generateId(),
    };

    form.pushFieldValue("questions", newQuestion);
    console.log(form.state.values);
  };

  const onShowClick = () => {
    if (!form.state.values.id) return;

    navigate({ to: "/$id", params: { id: form.state.values.id } });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="w-full flex flex-col items-center mb-6"
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
              switch (field.state.value[i].type) {
                case "text":
                  return (
                    <TextFormField key={i} questionIndex={i} form={form} />
                  );
                case "choice":
                  return (
                    <ChoiceFormField key={i} questionIndex={i} form={form} />
                  );
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
          <div className="flex justify-center gap-3 mt-6">
            <Button disabled={!canSubmit || isSubmitting}>Save</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => console.log(form.state.values)}
            >
              Peek
            </Button>
            <Button
              type="button"
              onClick={onShowClick}
              disabled={!form.state.values.id}
            >
              Show
            </Button>
          </div>
        )}
      />
    </form>
  );
};
