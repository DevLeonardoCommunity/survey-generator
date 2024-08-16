import { SurveyDefinition } from "@/types/survey";
import { FormApi, ReactFormApi } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";

export type BlockProps = {
  questionIndex: number;
  form: FormApi<SurveyDefinition, typeof valibotValidator> &
    ReactFormApi<SurveyDefinition, typeof valibotValidator>;
  onDuplicateQuestion: () => void;
};
