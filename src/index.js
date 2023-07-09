import React from "react";
import { createRoot } from "react-dom/client";

import { FashionChatBot } from "./components";
import "./index.scss";
import "animate.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const App = () => {
  return (
    <div className="app">
      <FashionChatBot className={"my-chat-bot"} />
    </div>
  );
};

root.render(<App />);
