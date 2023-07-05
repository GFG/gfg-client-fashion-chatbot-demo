import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./ChatbotMessage.scss";

const cls = "chatbot-message-wrapper";
const answerCls = `${cls}__answer`;
const avatarCls = `${cls}__avatar`;

export const ChatbotMessage = ({ className, question, message }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Replace with your API endpoint
        // const response = await axios.get("https://api.example.com/data", {
        //   question,
        // });
        setData({
          answer: "This is the anwser from the chat bot",
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setData({
          answer: "Sorry, I don't understand your question",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classNames(cls, className)}>
      <div className={avatarCls}>
        <FontAwesomeIcon icon={faRobot} className={`${avatarCls}__icon`} />
      </div>
      <div className={answerCls}>
        {message && message.length > 0
          ? message
          : isLoading
          ? "....."
          : data.answer}
        <div className={`${answerCls}__arrow`}></div>
      </div>
    </div>
  );
};

ChatbotMessage.propTypes = {
  className: PropTypes.string,
  question: PropTypes.string,
  message: PropTypes.string,
};
