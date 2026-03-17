import { useEffect, useRef, useState } from "react";
import "./AIChatWidget.css";

const AIChatWidget = () => {
  const apiUrl = process.env.REACT_APP_CHAT_BOAT_URL;

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your Ecommerce AI assistant. I can help with:\n\n• Viewing and navigating your orders  \n• Checking order status and shipping information  \n• Cancelling orders  \n• Initiating refunds  \n• Viewing support tickets  \n• Creating or managing support tickets  \n• Answering policy questions (returns, shipping, warranty)  \n\nHow can I assist you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.token) setToken(parsed.token);
    }
  }, []);

  useEffect(() => {
    if (!open || !token) return;

    const createConversationIfNeeded = async () => {
      let conversationId = localStorage.getItem("conversation_id");

      if (conversationId) return;

      try {
        const res = await fetch(`${apiUrl}/api/v1/chat/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-API-Key": "sk-kajGzlc98N_HWZYE4n9SHG_r4w5uTHqc7BdVmBjE3DA",
          },
          body: JSON.stringify({
            message: "hello",
            action_type: "chat",
            conversation_id: null,
          }),
        });

        const data = await res.json();

        if (data.conversation_id) {
          localStorage.setItem("conversation_id", data.conversation_id);
        }
      } catch (err) {
        console.error("Conversation creation failed", err);
      }
    };

    createConversationIfNeeded();
  }, [open, token]);

  useEffect(() => {
    if (!token) return;

    const loadChat = async () => {
      try {
        const conversationId = localStorage.getItem("conversation_id");
        const res = await fetch(
          `${apiUrl}/api/v1/chat/latest-messages?conversation_id=${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-API-Key": "sk-kajGzlc98N_HWZYE4n9SHG_r4w5uTHqc7BdVmBjE3DA",
            },
          },
        );

        const data = await res.json();

        if (!data?.conversation_id) return;

        localStorage.setItem("conversation_id", data.conversation_id);

        const assistantMessages = [];
        const navigationMessages = [];

        data.messages.forEach((m) => {
          if (m.type === "navigation") {
            navigationMessages.push(m);
            return;
          }

          assistantMessages.push({
            sender: m.role === "assistant" ? "bot" : "user",
            text: m.content,
            buttons: m.ui_buttons || null,
            message_id: m.id,
            clicked: null,
          });
        });

        navigationMessages.forEach((nav) => {
          const index = assistantMessages.findIndex(
            (msg) => msg.message_id === nav.target_message_id,
          );

          if (index !== -1) {
            assistantMessages[index].clicked = nav.button;
          }
        });

        setMessages(assistantMessages);
      } catch (err) {
        console.error("Load chat failed", err);
      }
    };

    loadChat();
  }, [token]);

  const sendMessage = async (
    message,
    actionType = "chat",
    targetMessageId = null,
  ) => {
    const stored = localStorage.getItem("userInfo");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.token) setToken(parsed.token);
    }
    if (!token) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Please login to use the AI assistant." },
      ]);
      return;
    }

    if (!message.trim() || loading) return;

    if (actionType === "chat") {
      setMessages((prev) => [...prev, { sender: "user", text: message }]);
    }

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/v1/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": "sk-kajGzlc98N_HWZYE4n9SHG_r4w5uTHqc7BdVmBjE3DA",
        },
        body: JSON.stringify({
          message: message,
          action_type: actionType,
          conversation_id: localStorage.getItem("conversation_id"),
          target_message_id: targetMessageId,
        }),
      });

      const data = await response.json();

      if (!localStorage.getItem("conversation_id") && data.conversation_id) {
        localStorage.setItem("conversation_id", data.conversation_id);
      }

      const botReply = {
        sender: "bot",
        text: data.message,
        buttons: data.ui_buttons || null,
        message_id: data.message_id || null,
        clicked: null,
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

  const handleClose = () => {
    localStorage.removeItem("conversation_id");

    setMessages([{ sender: "bot", text: "Hello 👋 How can I help you?" }]);

    setOpen(false);
  };
  const handleButtonClick = (direction, index) => {
    const message = messages[index];

    if (!message.message_id) {
      console.error("Navigation message_id missing", message);
      return;
    }

    setMessages((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        clicked: direction,
      };

      return updated;
    });

    sendMessage(direction, "navigation", message.message_id);
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
              <div key={index}>
                <div
                  className={
                    msg.sender === "user" ? "user-message" : "bot-message"
                  }
                >
                  {msg.text}
                </div>

                {msg.buttons && (
                  <div className="chat-buttons">
                    {msg.buttons.previous && (
                      <button
                        className={`nav-button ${
                          msg.clicked === "previous" ? "active-nav" : ""
                        }`}
                        disabled={msg.clicked !== null}
                        onClick={() => handleButtonClick("previous", index)}
                      >
                        ← Previous
                      </button>
                    )}

                    {msg.buttons.next && (
                      <button
                        className={`nav-button ${
                          msg.clicked === "next" ? "active-nav" : ""
                        }`}
                        disabled={msg.clicked !== null}
                        onClick={() => handleButtonClick("next", index)}
                      >
                        Next →
                      </button>
                    )}

                    {msg.buttons.close_chat && (
                      <button
                        className="nav-button"
                        onClick={() => handleClose("close")}
                      >
                        Close Chat →{" "}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="bot-message">Assistant is typing...</div>
            )}

            <div ref={bottomRef}></div>
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input, "chat");
                }
              }}
            />

            <button
              disabled={loading}
              onClick={() => sendMessage(input, "chat")}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
