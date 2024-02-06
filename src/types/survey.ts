type SurveyId = { id: string };
export type SurveyDefinition = Partial<SurveyId> & {
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
