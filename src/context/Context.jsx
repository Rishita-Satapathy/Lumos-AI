import { createContext, useState, useEffect } from "react";
import runChat from "../config/atom";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    
    const currentPrompt = prompt || input;
    console.log("Current prompt:", currentPrompt); // Debug log
    
    if (!currentPrompt.trim()) {
      console.error("Empty prompt provided");
      setLoading(false);
      return;
    }
    
    setRecentPrompt(currentPrompt);
    
    // Add to previous prompts if not already there
    if (currentPrompt && !prevPrompts.includes(currentPrompt)) {
      setPrevPrompts(prev => [...prev, currentPrompt]);
    }

    try {
      console.log("Calling runChat with:", currentPrompt); // Debug log
      const response = await runChat(currentPrompt);
      console.log("Response received:", response); // Debug log
      
      if (response) {
        setResultData(response);
      } else {
        console.warn("Empty response received");
        setResultData("No response received from the AI.");
      }
    } catch (error) {
      console.error("Failed to fetch response:", error);
      setResultData("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // Define the newChat function
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
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;