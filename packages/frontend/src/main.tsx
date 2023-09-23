import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import "./index.css";

const app = document.getElementById("app")!;
createRoot(app).render(<Routes />);
