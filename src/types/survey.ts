import * as v from "valibot";

const SurveyId = v.object({
  id: v.string([v.minLength(1)]),
});
export type SurveyId = v.Output<typeof SurveyId>;

export const TextQuestion = v.merge([
  SurveyId,
  v.object({
    type: v.literal("text"),
    question: v.string([
      v.minLength(3, "Question must be at least 3 characters"),
    ]),
  }),
]);
export type TextQuestion = v.Output<typeof TextQuestion>;

export const ChoiceQuestion = v.merge([
  SurveyId,
  v.object({
    type: v.literal("choice"),
    question: v.string([
      v.minLength(3, "Question must be at least 3 characters"),
    ]),
    options: v.array(
      v.object({
        id: v.string(),
        value: v.string([
          v.minLength(1, "Option must be at least 1 character"),
        ]),
      }),
      [v.minLength(2, "There must be at least 2 options")]
    ),
  }),
]);
export type ChoiceQuestion = v.Output<typeof ChoiceQuestion>;

export const Questions = v.union([TextQuestion, ChoiceQuestion]);
export type Questions = v.Output<typeof Questions>;

export const SurveyDefinition = v.merge([
  SurveyId,
  v.object({
    main: v.object({
      title: v.string([v.minLength(3)]),
      description: v.string([v.minLength(2)]),
    }),
    questions: v.array(Questions),
  }),
]);
export type SurveyDefinition = v.Output<typeof SurveyDefinition>;

export const QuestionType = Questions.options[0].entries.type;
export type QuestionType = v.Output<typeof QuestionType>;

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
