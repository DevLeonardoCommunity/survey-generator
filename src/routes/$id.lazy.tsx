import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id")({
  component: SurveyComponent,
});

function SurveyComponent() {
  const { id } = Route.useParams();
  return <div>Survey {id}</div>;
}
