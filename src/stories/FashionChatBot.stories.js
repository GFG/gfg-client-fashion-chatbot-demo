import React from "react";
import { FashionChatBot } from "../components";

export default {
  title: "FashionChatBot",
  component: FashionChatBot,
};

export const DefaultChatbot = {
  render: () => {
    return (
      <div
        style={{
          width: "400px",
          height: "90vh",
          margin: "0 auto",
        }}
      >
        <FashionChatBot />
      </div>
    );
  },
};
