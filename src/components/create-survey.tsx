import { useForm } from "@tanstack/react-form";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CardContainer } from "./ui/card-container";
import { Input } from "./ui/input";
import { SurveyDefinition } from "@/types/survey";
import { useStorage } from "@/hooks/useStorage";
import { useNavigate } from "@tanstack/react-router";

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
      text: {
        question: "",
      },
      choice: {
        question: "",
        //options: [] as Array<{ id: string; value: string }>,
      },
      things: [],
    },
    onSubmit: async ({ value }) => {
      const id = save(value);
      form.setFieldValue("id", id);
    },
  });

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
    >
      <div className="flex flex-col gap-3">
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

        <Card className="w-full">
          <CardContainer>
            <form.Field
              name="text.question"
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

        <Card className="w-full">
          <CardContainer>
            <form.Field
              name="choice.question"
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
            <form.Field name="things" mode="array">
              {(field) => {
                return (
                  <div>
                    {field.state.value.map((_, i) => {
                      return (
                        <form.Field key={i} name={`things[${i}].id`}>
                          {(subField) => {
                            return (
                              <Input
                                type="text"
                                placeholder="Question"
                                className="text-lg h-12"
                                name={subField.name}
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                            );
                          }}
                        </form.Field>
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
                      Add person
                    </button>
                  </div>
                );
              }}
            </form.Field>
          </CardContainer>
        </Card>
        <div className="flex justify-center gap-3">
          <Button>Save</Button>
          <Button
            type="button"
            onClick={onShowClick}
            disabled={!form.state.values.id}
          >
            Show
          </Button>
        </div>
      </div>
    </form>
  );
};
