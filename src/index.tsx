import React from "react";
import ReactDOM from "react-dom/client";
import { CustomTheme } from "@lipihipi/rtc-ui-components";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomTheme>
      <App />
    </CustomTheme>
  </React.StrictMode>
);
