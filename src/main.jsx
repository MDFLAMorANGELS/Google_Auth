import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <GoogleOAuthProvider clientId="115648165612-obosrl6rgrbum7aneqauu84ik02opq19.apps.googleusercontent.com">
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </GoogleOAuthProvider>
  </NextUIProvider>
);
