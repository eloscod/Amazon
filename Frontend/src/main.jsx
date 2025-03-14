import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./Components/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider reducer={reducer} initialState={initialState}>
        <App />
        <Analytics />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);
