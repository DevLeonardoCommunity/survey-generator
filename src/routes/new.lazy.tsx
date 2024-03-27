import { CreateSurvey } from "@/components/survey-generator/create-survey";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/new")({
  component: NewSurvey,
});

function NewSurvey() {
  return <CreateSurvey />;
}
