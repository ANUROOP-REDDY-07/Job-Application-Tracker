import { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

const InterviewAssistant = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Interview Prep Assistant. Ask me a behavioral or technical question, or ask me to interview you!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5002/api/ai/interview", {
        chatHistory: newHistory
      });
      
      setMessages([...newHistory, { role: "assistant", content: response.data.text }]);
    } catch (error) {
      console.error(error);
      setMessages([...newHistory, { role: "assistant", content: "*Sorry, I encountered an error. Please try again.*" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col pt-4 max-w-4xl mx-auto pb-4">
      <h2 className="text-3xl font-semibold mb-6">Interview Prep Assistant</h2>
      
      <div className="flex-1 glass-gradient flex flex-col overflow-hidden mb-6">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl p-5 shadow-sm ${
                msg.role === "user" 
                  ? "bg-gradient-to-br from-brand to-brand-dark text-white rounded-tr-sm" 
                  : "bg-white/80 backdrop-blur-sm text-primary-text border border-white/40 shadow-soft rounded-tl-sm"
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-[80%] bg-white/80 backdrop-blur-sm text-primary-text border border-white/40 shadow-soft rounded-2xl rounded-tl-sm p-5">
                  <div className="flex items-center gap-1.5 h-6">
                    <span className="w-2.5 h-2.5 bg-brand-light rounded-full animate-bounce"></span>
                    <span className="w-2.5 h-2.5 bg-brand rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                    <span className="w-2.5 h-2.5 bg-brand-dark rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-white/30 bg-surface/40 backdrop-blur-md">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer or question here..."
              className="flex-1 border border-white/50 rounded-full px-6 py-4 bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand shadow-sm transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-brand to-brand-dark text-white rounded-full p-4 hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewAssistant;
