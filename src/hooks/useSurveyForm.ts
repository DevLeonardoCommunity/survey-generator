import { generateId } from "@/lib/utils";
import {
  ChoiceQuestion,
  QuestionType,
  SurveyDefinition,
  TextQuestion,
} from "@/types/survey";
import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { useStorage } from "./useStorage";

const defaultValues: SurveyDefinition = {
  id: generateId(),
  main: {
    title: "",
    description: "",
  },
  questions: [],
};

export const useSurveyForm = () => {
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
  };

  const onDuplicateQuestion = (questionIndex: number) => {
    const question = form.state.values.questions[questionIndex];
    form.pushFieldValue("questions", { ...question, id: generateId() });
    form.moveFieldValues(
      "questions",
      form.state.values.questions.length - 1,
      questionIndex + 1
    );
  };

  return {
    form,
    onAddQuestion,
    onDuplicateQuestion,
  };
};
