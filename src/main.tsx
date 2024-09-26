import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app.tsx";
import { FavoritesProvider } from "./context";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>,
);
