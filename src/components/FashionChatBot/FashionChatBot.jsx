import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./FashionChatBot.scss";
import { UserMessage } from "./components/UserMessage";
import { ChatbotMessage } from "./components/ChatbotMessage";
import parseReponse from "../../utils/parseChatbotResponse";
import mockChatbotResponse from "../../store/mockChatbotResponse";

const cls = "fashion-chat-bot-wrapper";
const headerCls = `${cls}__header`;
const bodyCls = `${cls}__body`;
const footerCls = `${cls}__footer`;

export const FashionChatBot = ({ className, chatEndpoint }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: Date.now().toString(),
      role: "assistant",
      content: "Hi, how can I help you?",
      searchTermMap: {},
      products: [],
      show: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [anwserData, setAnwserData] = useState({
    message: "",
    searchTermMap: {},
    products: [],
    show: true,
  });

  const fetchAnswerFromChatbot = async (conversation) => {
    try {
      // Replace with your API endpoint
      // const response = await axios.get("https://api.example.com/data", {
      //   chatMessages: conversation.map(({ role, content }) => ({
      //     role,
      //     content,
      //   })),
      // });
      const chatbotAnswer = parseReponse(mockChatbotResponse);
      setAnwserData(chatbotAnswer);

      // TODO: remove setTimeout later
      setTimeout(() => {
        setChatMessages((chatMsgs) => {
          const { message, searchTermMap, products, show } = chatbotAnswer;
          chatMsgs[chatMsgs.length - 1] = {
            ...chatMsgs[chatMsgs.length - 1],
            content: message,
            searchTermMap,
            products,
            show,
            isLoading: false,
          };

          return [...chatMsgs];
        });
      }, 2000);
    } catch (error) {
      setAnwserData({
        message: "Sorry, I don't understand your question",
        searchTermMap: {},
        products: [],
      });
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputMessage) return;

    const newChatMessages = [
      ...chatMessages,
      {
        id: `user-${Date.now().toString()}`,
        role: "user",
        content: inputMessage,
      },
      {
        id: `assistant-${Date.now().toString()}`,
        role: "assistant",
        isLoading: true,
        content: "......",
      },
    ];
    setChatMessages(newChatMessages);
    setInputMessage("");
    fetchAnswerFromChatbot(newChatMessages.slice(0, -1));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={classNames(cls, className)}>
      <div className={headerCls}>
        <span className={`${headerCls}__title`}>GFG Fashion Chatbot</span>
      </div>
      <div className={bodyCls}>
        {chatMessages.map((chat) =>
          chat.role === "user" ? (
            <UserMessage
              key={`message-id-${chat.id}`}
              message={chat.content}
              className={`${bodyCls}__user-message`}
            />
          ) : (
            <ChatbotMessage
              key={`message-id-${chat.id}`}
              {...chat}
              className={`${bodyCls}__chatbot-message`}
            />
          )
        )}
      </div>
      <div className={footerCls}>
        <input
          className={`${footerCls}__input`}
          placeholder="Ask your question here"
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
