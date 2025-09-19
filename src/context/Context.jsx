import { createContext, useState } from "react";
import runChat from "../config/atom";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    // Get the current prompt (either passed or from input)
    const currentPrompt = prompt || input;
    
    // Validate prompt
    if (!currentPrompt || !currentPrompt.trim()) {
      console.error("Empty prompt provided");
      return;
    }

    // Set loading and show result states
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    // Add to previous prompts if not already there
    if (!prevPrompts.includes(currentPrompt.trim())) {
      setPrevPrompts((prev) => [...prev, currentPrompt.trim()]);
    }

    try {
      console.log("Calling runChat with:", currentPrompt);
      const response = await runChat(currentPrompt);

      if (response) {
        // Clear old result first
        setResultData("");

        // Format bold text by replacing **text** with <b>text</b>
        const responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
          if (i % 2 === 0) {
            newResponse += responseArray[i];
          } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
          }
        }

        // Replace * with <br/> for line breaks
        let formattedResponse = newResponse.split("*").join("<br/>");

        // Animate word by word
        const newResponseArray = formattedResponse.split(" ");
        newResponseArray.forEach((word, i) => {
          delayPara(i, word + " ");
        });
      } else {
        console.warn("Empty response received");
        setResultData("No response received from the AI.");
      }
    } catch (error) {
      console.error("Failed to fetch response:", error);
      setResultData("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput(""); // Clear input after sending
    }
  };

  const newChat = () => {
    setInput("");
    setRecentPrompt("");
    setShowResult(false);
    setResultData("");
    setLoading(false);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;