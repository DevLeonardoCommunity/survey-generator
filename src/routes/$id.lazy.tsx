import { useStorage } from "@/hooks/useStorage";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/$id")({
  component: Survey,
});

function Survey() {
  const { id } = Route.useParams();
  const { allSurveys } = useStorage();
  const survey = useMemo(() => allSurveys[id], [allSurveys, id]);

  return <div>Survey {JSON.stringify(survey)}</div>;
}
