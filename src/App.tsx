import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <main className="text-center max-w-[1280px] mx-auto px-10 pt-5">
      <h1 className="text-5xl font-bold mb-5">Survey Generator</h1>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
