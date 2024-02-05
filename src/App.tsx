import "./App.css";
import { CreateSurvey } from "./components/create-survey";

function App() {
  return (
    <main className="text-center max-w-[1280px] mx-auto px-10 pt-5">
      <h1 className="text-5xl font-bold mb-5">Survey Generator</h1>
      <CreateSurvey />
    </main>
  );
}

export default App;
