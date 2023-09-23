import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";

const app = document.getElementById("app")!;
createRoot(app).render(<Routes />);
