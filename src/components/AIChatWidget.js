import { useEffect, useRef, useState } from "react";
import "./AIChatWidget.css";

const STATUS_META = {
  processing: { label: "Processing", color: "#f59e0b", dot: "#fbbf24" },
  shipped: { label: "Shipped", color: "#3b82f6", dot: "#60a5fa" },
  delivered: { label: "Delivered", color: "#10b981", dot: "#34d399" },
  cancelled: { label: "Cancelled", color: "#ef4444", dot: "#f87171" },
  refunded: { label: "Refunded", color: "#8b5cf6", dot: "#a78bfa" },
  pending: { label: "Pending", color: "#6b7280", dot: "#9ca3af" },
};

const getStatus = (s = "") =>
  STATUS_META[s.toLowerCase()] ?? {
    label: s,
    color: "#6b7280",
    dot: "#9ca3af",
  };

const OrderCard = ({ order }) => {
  const status = getStatus(order.status);
  const [showAllItems, setShowAllItems] = useState(false);

  const visibleItems = showAllItems ? order.items : order.items.slice(0, 2);

  return (
    <div className="order-card">
      <div className="order-card-header">
        <span className="order-id">#{order.id ?? order.order_id}</span>
        <span className="order-status-badge" style={{ color: status.color }}>
          <span className="status-dot" style={{ background: status.dot }} />
          {status.label}
        </span>
      </div>

      <div className="order-card-body">
        {order.date && (
          <span className="order-meta">
            📅{" "}
            {new Date(order.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}

        {order.total !== undefined && (
          <span className="order-meta order-total">
            ${Number(order.total).toFixed(2)}
          </span>
        )}
      </div>

      {order.items && order.items.length > 0 && (
        <div className="order-items">
          {visibleItems.map((item, i) => (
            <span key={i} className="order-item-chip">
              {item.name ?? item}
            </span>
          ))}

          {order.items.length > 2 && !showAllItems && (
            <button
              type="button"
              className="order-item-chip muted more-btn"
              onClick={() => setShowAllItems(true)}
            >
              +{order.items.length - 2} more
            </button>
          )}

          {order.items.length > 2 && showAllItems && (
            <button
              type="button"
              className="order-item-chip muted more-btn"
              onClick={() => setShowAllItems(false)}
            >
              show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const TicketCard = ({ ticket }) => {
  const status = getStatus(ticket.status);
  return (
    <div className="order-card ticket-card">
      <div className="order-card-header">
        <span className="order-id">🎫 #{ticket.id ?? ticket.ticket_id}</span>
        <span className="order-status-badge" style={{ color: status.color }}>
          <span className="status-dot" style={{ background: status.dot }} />
          {status.label}
        </span>
      </div>
      {ticket.subject && <p className="ticket-subject">{ticket.subject}</p>}
      {ticket.created_at && (
        <span className="order-meta">
          📅 {new Date(ticket.created_at).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

const UIBlock = ({ ui, onNavigate, isLatest }) => {
  if (!ui || !ui.data?.length) return null;

  const { type, data, pagination } = ui;
  const isOrders = type === "orders";

  return (
    <div className="ui-block">
      {pagination?.showing && (
        <p className="ui-block-showing">{pagination.showing}</p>
      )}

      <div className="ui-cards">
        {isOrders
          ? data.map((item, i) => <OrderCard key={item.id ?? i} order={item} />)
          : data.map((item, i) => (
              <TicketCard key={item.id ?? i} ticket={item} />
            ))}
      </div>

      {isLatest && (pagination?.next || pagination?.previous) && (
        <div className="ui-pagination">
          {pagination.previous && (
            <button className="page-btn" onClick={() => onNavigate("previous")}>
              ← Previous
            </button>
          )}
          <span className="page-info">
            {pagination.page} / {pagination.total_pages}
          </span>
          {pagination.next && (
            <button className="page-btn" onClick={() => onNavigate("next")}>
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const BotMessage = ({ msg, isLatest, onNavigate }) => (
  <div className="message-group">
    <div className="bot-avatar">✦</div>
    <div className="bot-message-wrap">
      {msg.text && <div className="bot-message">{msg.text}</div>}
      {msg.ui && (
        <UIBlock ui={msg.ui} isLatest={isLatest} onNavigate={onNavigate} />
      )}
    </div>
  </div>
);

const AIChatWidget = () => {
  const apiUrl = process.env.REACT_APP_CHAT_BOAT_URL;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello! I'm your Ecommerce AI assistant. I can help with:\n\n" +
        "• Viewing and navigating your orders\n" +
        "• Checking order status and shipping information\n" +
        "• Cancelling orders\n" +
        "• Initiating refunds\n" +
        "• Viewing support tickets\n" +
        "• Creating or managing support tickets\n" +
        "• Answering policy questions (returns, shipping, warranty)\n\n" +
        "How can I assist you today?",
      ui: null,
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
      if (localStorage.getItem("conversation_id")) return;
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
        if (data.conversation_id)
          localStorage.setItem("conversation_id", data.conversation_id);
      } catch (err) {
        console.error("Session creation failed", err);
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

        const rendered = [];
        const navigationMap = {};

        data.messages.forEach((m) => {
          if (m.type === "navigation") {
            if (m.target_message_id)
              navigationMap[m.target_message_id] = m.button;
            return;
          }
          rendered.push({
            sender: m.role === "assistant" ? "bot" : "user",
            text: m.content,
            ui: m.ui ?? null,
            message_id: m.id,
          });
        });

        rendered.forEach((msg) => {
          if (msg.message_id && navigationMap[msg.message_id]) {
            msg.clicked = navigationMap[msg.message_id];
          }
        });

        setMessages(rendered);
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
        {
          sender: "bot",
          text: "⚠️ Please login to use the AI assistant.",
          ui: null,
        },
      ]);
      return;
    }
    if (!message.trim() || loading) return;

    if (actionType === "chat") {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: message, ui: null },
      ]);
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
          message,
          action_type: actionType,
          conversation_id: localStorage.getItem("conversation_id"),
          target_message_id: targetMessageId,
        }),
      });

      const data = await response.json();

      if (!localStorage.getItem("conversation_id") && data.conversation_id) {
        localStorage.setItem("conversation_id", data.conversation_id);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.message ?? "",
          ui: data.ui ?? null,
          message_id: data.message_id ?? null,
          clicked: null,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ AI server not responding", ui: null },
      ]);
    }

    setLoading(false);
  };

  const handleNavigate = (direction, messageIndex) => {
    const msg = messages[messageIndex];

    setMessages((prev) => {
      const updated = [...prev];
      updated[messageIndex] = { ...updated[messageIndex], clicked: direction };
      return updated;
    });

    sendMessage(direction, "navigation", msg.message_id);
  };

  const handleClose = () => {
    localStorage.removeItem("conversation_id");

    setMessages([
      {
        sender: "bot",
        text: `Hello! I'm your Ecommerce AI assistant. I can help with:

• Viewing and navigating your orders
• Checking order status and shipping information
• Cancelling orders
• Initiating refunds
• Viewing support tickets
• Creating or managing support tickets
• Answering policy questions (returns, shipping, warranty)

How can I assist you today?`,
        ui: null,
      },
    ]);

    setOpen(false);
  };

  const lastBotIndex = messages.reduce(
    (last, msg, i) => (msg.sender === "bot" ? i : last),
    -1,
  );

  return (
    <>
      <button
        className="ai-fab"
        onClick={() => setOpen(!open)}
        aria-label="Open AI chat"
      >
        {open ? "✕" : "✦"}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-header-avatar">✦</span>
              <div>
                <p className="chat-header-title">AI Assistant</p>
                <p className="chat-header-sub">Always here to help</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="icon-btn"
                title="Clear chat"
                onClick={handleClose}
              >
                🗑
              </button>
              <button className="icon-btn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.sender === "user" ? (
                  <div className="user-message">{msg.text}</div>
                ) : (
                  <BotMessage
                    msg={msg}
                    isLatest={index === lastBotIndex && !msg.clicked}
                    onNavigate={(dir) => handleNavigate(dir, index)}
                  />
                )}
              </div>
            ))}

            {loading && (
              <div className="message-group">
                <div className="bot-avatar">✦</div>
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input, "chat");
              }}
            />
            <button
              disabled={loading || !input.trim()}
              onClick={() => sendMessage(input, "chat")}
              className="send-btn"
            >
              {loading ? "…" : "↑"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
