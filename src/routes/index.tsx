import { Button } from "@/components/ui/button";
import { useStorage } from "@/hooks/useStorage";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

export function Home() {
  const { allSurveysList } = useStorage();

  return (
    <main className="flex flex-col gap-6">
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Welcome to Survey Generator</h2>
        <p>
          This is a simple survey generator app. You can create a new survey or
          view recent surveys.
        </p>
        <Link to="/new">
          <Button className="my-6">Create New Survey</Button>
        </Link>
      </div>
      <div>
        Recent Surveys: {allSurveysList.length}
        <ul>
          {allSurveysList.map((survey) => (
            <li key={survey.id}>
              <Link to={`/$id`} params={{ id: survey.id }}>
                Survey: {survey.main.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
