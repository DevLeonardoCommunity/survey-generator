import { CreateSurvey } from "@/components/create-survey";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-5">Survey Generator</h1>
      <CreateSurvey />;
    </>
  );
}
