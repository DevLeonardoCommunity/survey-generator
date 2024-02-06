import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-around items-center mb-5">
      <div className="flex-1 text-left">
        <Button variant={"outline"} onClick={() => navigate({ to: "/" })}>
          Home
        </Button>
      </div>
      <h1 className="text-5xl font-bold">Survey Generator</h1>
      <div className="flex-1" />
    </header>
  );
};
