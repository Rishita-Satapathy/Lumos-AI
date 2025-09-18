// Corrected import from the right package
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the correct package and API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(API_KEY);

// The updated function to interact with the Gemini API
export async function runChat(prompt) {
  try {
    // Correctly get the generative model and specify the latest version
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Correctly call generateContent with the prompt
    const result = await model.generateContent(prompt);

    // Correctly access the response text using .text() method
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (err) {
    console.error("Chat error:", err);
    return "Something went wrong. Please check the console for details.";
  }
}

export default runChat;