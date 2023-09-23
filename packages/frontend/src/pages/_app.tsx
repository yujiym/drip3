import { Outlet } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider>
      <main>
        <Outlet />
      </main>
    </NextUIProvider>
  );
}
