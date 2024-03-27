import { QuestionType } from "@/types/survey";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  onAddQuestion: (surveyType: QuestionType) => void;
};

const surveyTypeOptions: { [key in QuestionType]: string } = {
  text: "Text",
  choice: "Choice",
};

export const SelectQuestionType = ({ onAddQuestion }: Props) => {
  const [surveyType, setSurveyType] = useState<QuestionType | "">("");

  const onConfirm = () => {
    if (!surveyType) return;

    onAddQuestion(surveyType);
    setSurveyType("");
  };

  return (
    <div className="flex flex-col gap-2">
      <h3>Add Question</h3>
      <Select
        onValueChange={(v) => setSurveyType(v as QuestionType)}
        value={surveyType}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(surveyTypeOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button disabled={!surveyType} onClick={onConfirm}>
        Add Question
      </Button>
    </div>
  );
};
