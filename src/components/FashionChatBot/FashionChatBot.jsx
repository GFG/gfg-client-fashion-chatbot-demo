import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./FashionChatBot.scss";
import { UserMessage } from "./components/UserMessage";
import { ChatbotMessage } from "./components/ChatbotMessage";

const cls = "fashion-chat-bot-wrapper";
const headerCls = `${cls}__header`;
const bodyCls = `${cls}__body`;
const footerCls = `${cls}__footer`;

export const FashionChatBot = ({ className, chatEndpoint }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputMessage) return;

    setChatMessages([
      ...chatMessages,
      { id: Date.now().toString(), type: "user", message: inputMessage },
      {
        id: Date.now().toString(),
        type: "chatbot",
        question: inputMessage,
      },
    ]);
    setInputMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={classNames(cls, className)}>
      <div className={headerCls}>
        <span className={`${headerCls}__title`}>
          Conversation with fashion chatbot
        </span>
      </div>
      <div className={bodyCls}>
        {chatMessages.map(({ type, message, id }) =>
          type === "user" ? (
            <UserMessage
              key={`message-id-${id}`}
              message={message}
              className={`${bodyCls}__user-message`}
            />
          ) : (
            <ChatbotMessage
              key={`message-id-${id}`}
              question={message}
              className={`${bodyCls}__chatbot-message`}
            />
          )
        )}
      </div>
      <div className={footerCls}>
        <input
          className={`${footerCls}__input`}
          placeholder="Write your message here"
          value={inputMessage}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
        ></input>
        <button
          className={`${footerCls}__send-btn`}
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={`${footerCls}__send-btn__icon`}
          />
        </button>
      </div>
    </div>
  );
};

FashionChatBot.propTypes = {
  className: PropTypes.string,
  chatEndpoint: PropTypes.string,
};
