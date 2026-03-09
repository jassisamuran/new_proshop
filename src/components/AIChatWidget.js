import { useEffect, useState } from "react";
import "./AIChatWidget.css";

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 How can I help you?" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Load token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userInfo");

    if (stored) {
      const parsed = JSON.parse(stored);

      if (parsed?.token) {
        setToken(parsed.token);
      }
    }
  }, []);

  // Load previous chat
  useEffect(() => {
    if (!token) return;

    const loadChat = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/chat/latest-messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-API-Key": "sk-kajGzlc98N_HWZYE4n9SHG_r4w5uTHqc7BdVmBjE3DA",
            },
          },
        );

        const data = await res.json();

        if (data?.conversation_id) {
          localStorage.setItem("conversation_id", data.conversation_id);

          const formatted = data.messages.map((m) => ({
            sender: m.role === "assistant" ? "bot" : "user",
            text: m.content,
          }));

          setMessages(formatted);
        }
      } catch (err) {
        console.error("Load chat failed", err);
      }
    };

    loadChat();
  }, [token]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      const response = await fetch(
        "http://localhost:8000/api/v1/chat/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            "X-API-Key": "sk-kajGzlc98N_HWZYE4n9SHG_r4w5uTHqc7BdVmBjE3DA",
          },
          body: JSON.stringify({
            message: question,
            conversation_id: localStorage.getItem("conversation_id") ?? null,
            channel: "web",
            stream: false,
          }),
        },
      );

      const data = await response.json();

      if (!localStorage.getItem("conversation_id") && data.conversation_id) {
        localStorage.setItem("conversation_id", data.conversation_id);
      }

      const botReply = {
        sender: "bot",
        text: data.message || "No response from AI",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ AI server not responding" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="ai-button" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            AI Assistant
            <span className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className="bot-message">Typing...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
