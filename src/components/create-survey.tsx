import { useForm } from "@tanstack/react-form";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CardContainer } from "./ui/card-container";
import { Input } from "./ui/input";

type SurveyDefinition = {
  main: {
    title: string;
    description: string;
  };
  text: {
    question: string;
  };
  choice: {
    question: string;
    options: {
      a: string;
      b: string;
      c: string;
    };
  };
};

export const CreateSurvey = () => {
  const form = useForm<SurveyDefinition>({
    defaultValues: {
      main: {
        title: "",
        description: "",
      },
      text: {
        question: "",
      },
      choice: {
        question: "",
        options: {
          a: "",
          b: "",
          c: "",
        },
      },
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form.Provider>
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
              <form.Field
                name="choice.options.a"
                children={(field) => (
                  <Input
                    type="text"
                    placeholder="Option A"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
              <form.Field
                name="choice.options.b"
                children={(field) => (
                  <Input
                    type="text"
                    placeholder="Option B"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
              <form.Field
                name="choice.options.c"
                children={(field) => (
                  <Input
                    type="text"
                    placeholder="Option C"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </CardContainer>
          </Card>
          <div>
            <Button>Generate!</Button>
          </div>
        </div>
      </form>
    </form.Provider>
  );
};
