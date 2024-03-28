import { Header } from "@/components/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <main className="max-w-[1280px] mx-auto px-10 pt-5">
        <Header />
        <Outlet />
      </main>
    </>
  );
}
