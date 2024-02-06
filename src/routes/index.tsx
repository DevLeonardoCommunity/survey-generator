import { useStorage } from "@/hooks/useStorage";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

export function Home() {
  const { allSurveysList } = useStorage();

  return (
    <>
      Recent Surveys {allSurveysList.length}
      <ul>
        {allSurveysList.map((survey) => (
          <li key={survey.id}>
            <Link to={`/$id`} params={{ id: survey.id }}>
              Survey: {survey.main.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
