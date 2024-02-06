import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id")({
  component: Survey,
});

function Survey() {
  const { id } = Route.useParams();
  return <div>Survey {id}</div>;
}
