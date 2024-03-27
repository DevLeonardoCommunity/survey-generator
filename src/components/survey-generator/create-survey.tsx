import { useStorage } from "@/hooks/useStorage";
import {
  ChoiceQuestion,
  QuestionType,
  SurveyDefinition,
  TextQuestion,
} from "@/types/survey";
import { FieldApi, FormApi, Updater, useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { CardContainer } from "../ui/card-container";
import { Input } from "../ui/input";
import { SelectQuestionType } from "./select-question-type";

export const CreateSurvey = () => {
  const navigate = useNavigate();
  const { save } = useStorage();
  const form = useForm<SurveyDefinition>({
    defaultValues: {
      id: undefined,
      main: {
        title: "",
        description: "",
      },
      questions: [],
    },
    onSubmit: async ({ value }) => {
      const id = save(value);
      form.setFieldValue("id", id);
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
            question: "",
            options: [] as ChoiceQuestion["options"],
          } as ChoiceQuestion;
      }
    };

    form.pushFieldValue("questions", getDefault());
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
      className="w-full flex flex-col items-center"
    >
      <div className="flex flex-col gap-3 items-center w-[800px] max-w-[95%]">
        <Card className="w-full">
          <CardContainer>
            <form.Field
              name="main.title"
              children={(field) => (
                <Input
                  type="text"
                  placeholder="Title"
                  className="text-2xl h-15"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <form.Field
              name="main.description"
              children={(field) => (
                <Input
                  type="text"
                  placeholder="Description"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </CardContainer>
        </Card>

        <form.Field name="questions" mode="array">
          {(field) =>
            field.state.value.map((_, i) => {
              switch (field.state.value[i].type) {
                case "text":
                  return TextFormField(i, form);
                case "choice":
                  return ChoiceFormField(i, form);
              }
            })
          }
        </form.Field>

        <div className="w-[250px]">
          <SelectQuestionType onAddQuestion={onAddQuestion} />
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <Button>Save</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            console.log(form.state.values);
          }}
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
    </form>
  );
};
function ChoiceFormField(
  i: number,
  form: FormApi<SurveyDefinition, undefined>
) {
  return (
    <Card key={i} className="w-full">
      <CardContainer>
        <form.Field
          name={`questions[${i}].question`}
          children={(field) => (
            <Input
              type="text"
              placeholder="Question"
              className="text-lg h-12"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name={`questions[${i}].options`}
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
              <div>
                {field.state.value.map((_, j) => {
                  return (
                    <form.Field
                      key={j}
                      name={`questions[${i}].options[${j}].value`}
                      children={(subField) => {
                        return (
                          <Input
                            type="text"
                            placeholder="Option"
                            className="text-lg h-12"
                            name={subField.name}
                            value={subField.state.value}
                            onChange={(e) =>
                              // FIXME: This adds to questions[i]["options[j]"] instead of questions[i].options[j]
                              (
                                subField.handleChange as unknown as (
                                  updater: Updater<string, string>
                                ) => void
                              )(e.target.value)
                            }
                          />
                        );
                      }}
                    />
                  );
                })}
                <button
                  onClick={() =>
                    field.pushValue({
                      id: "a",
                      value: "b",
                    })
                  }
                  type="button"
                >
                  Add Option
                </button>
              </div>
            );
          }}
        />
      </CardContainer>
    </Card>
  );
}

function TextFormField(i: number, form: FormApi<SurveyDefinition, undefined>) {
  return (
    <Card key={i} className="w-full">
      <CardContainer>
        <form.Field
          name={`questions[${i}].question`}
          children={(field) => (
            <Input
              type="text"
              placeholder="Question"
              className="text-lg h-12"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <Input type="text" placeholder="Answer" disabled />
      </CardContainer>
    </Card>
  );
}
