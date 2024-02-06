import { CreateSurvey } from "@/components/create-survey";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/new")({
  component: NewSurvey,
});

function NewSurvey() {
  return (
    <>
      <CreateSurvey />
    </>
  );
}
