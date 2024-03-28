type SurveyId = { id: string };
export type SurveyDefinition = SurveyId & {
  main: {
    title: string;
    description: string;
  };
  questions: Questions[];
};

export type TextQuestion = SurveyId & {
  type: "text";
  question: string;
};

export type ChoiceQuestion = SurveyId & {
  type: "choice";
  question: string;
  options: {
    id: string;
    value: string;
  }[];
};

export type Questions = TextQuestion | ChoiceQuestion;

export type QuestionType = Questions["type"];

export type SurveyDefinitionWithId = SurveyId & SurveyDefinition;

// TODO: When SurveyDefinition will be dynamic it will be interesting to autogenerate Survey
export type Survey = {
  id: string;
  text: {
    answer: string;
  };
  choice: {
    answer: "a" | "b" | "c";
  };
};
