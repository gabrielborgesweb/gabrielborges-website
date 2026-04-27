import React from "react";
import ReactDOM from "react-dom/client";
import App, { Repo } from "./App";
import "./index.css";

// Read initial data injected during prerender
const initialRepos = (
  window as unknown as { __INITIAL_DATA__: Repo[] | undefined }
).__INITIAL_DATA__;

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <App initialRepos={initialRepos} />
  </React.StrictMode>,
);
