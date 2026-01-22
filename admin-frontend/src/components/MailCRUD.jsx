import React, { useEffect, useState } from "react";
import { getInbox, getMessage, sendMail } from "../api";

const MailCRUD = () => {
  const [inbox, setInbox] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [inboxError, setInboxError] = useState(null);

  const [selectedUid, setSelectedUid] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [messageError, setMessageError] = useState(null);

  const [composeOpen, setComposeOpen] = useState(false);
  const [compose, setCompose] = useState({ to: "", subject: "", text: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  useEffect(() => {
    const loadInbox = async () => {
      try {
        setInboxError(null);
        const { data } = await getInbox();
        setInbox(data);
      } catch (e) {
          console.error("MAIL INBOX ERROR FRONTEND", e);
        //console.error(e);
        setInboxError("Failed to load inbox");
      } finally {
        setLoadingInbox(false);
      }
    };
    loadInbox();
  }, []);

  const openMessage = async (uid) => {
    setSelectedUid(uid);
    setSelectedMessage(null);
    setMessageError(null);
    setLoadingMessage(true);

    try {
      const { data } = await getMessage(uid);
      setSelectedMessage(data);
    } catch (e) {
      console.error(e);
      setMessageError("Failed to load message");
    } finally {
      setLoadingMessage(false);
    }
  };

  const openCompose = (to = "", subject = "") => {
    setCompose({ to, subject, text: "" });
    setSendError(null);
    setComposeOpen(true);
  };

  const handleSend = async () => {
    if (!compose.to || !compose.subject || !compose.text) {
      setSendError("To, subject and message are required");
      return;
    }
    setSending(true);
    setSendError(null);
    try {
      await sendMail({
        to: compose.to,
        subject: compose.subject,
        text: compose.text,
      });
      alert("Email sent");
      setComposeOpen(false);
    } catch (e) {
      console.error(e);
      setSendError("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem", height: "100%" }}>
      {/* LEFT: Inbox */}
      <div
        style={{
          width: "40%",
          borderRight: "1px solid #ccc",
          paddingRight: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Inbox</h2>
          <button onClick={() => openCompose()}>New email</button>
        </div>

        {loadingInbox && <div>Loading inbox...</div>}
        {inboxError && <div style={{ color: "red" }}>{inboxError}</div>}
        {!loadingInbox && !inboxError && inbox.length === 0 && (
          <div>No messages</div>
        )}

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            overflowY: "auto",
            flex: 1,
          }}
        >
          {inbox
            .slice()
            .reverse()
            .map((m) => (
              <li
                key={m.uid}
                onClick={() => openMessage(m.uid)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background: m.uid === selectedUid ? "#eef" : "transparent",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {m.subject || "(no subject)"}
                </div>
                <div style={{ fontSize: 12 }}>{m.from}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{m.date}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{m.snippet}</div>
              </li>
            ))}
        </ul>
      </div>

      {/* RIGHT: Message detail */}
      <div
        style={{
          flex: 1,
          paddingLeft: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Message</h2>
        {loadingMessage && <div>Loading message...</div>}
        {messageError && <div style={{ color: "red" }}>{messageError}</div>}
        {!loadingMessage && !selectedMessage && !messageError && (
          <div>Select a message from the inbox</div>
        )}

        {!loadingMessage && selectedMessage && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 8 }}>
              <div>
                <strong>From:</strong> {selectedMessage.from}
              </div>
              <div>
                <strong>To:</strong> {selectedMessage.to}
              </div>
              <div>
                <strong>Subject:</strong> {selectedMessage.subject}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {selectedMessage.date
                  ? String(selectedMessage.date)
                  : "Unknown"}
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <button
                onClick={() =>
                  openCompose(
                    selectedMessage.from || "",
                    selectedMessage.subject
                      ? `Re: ${selectedMessage.subject}`
                      : ""
                  )
                }
              >
                Reply
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                background: "#f7f7f7",
                padding: 8,
                borderRadius: 4,
              }}
            >
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  margin: 0,
                  fontFamily: "inherit",
                }}
              >
                {selectedMessage.text || "(no text body)"}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* COMPOSE OVERLAY */}
      {composeOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 16,
              width: 450,
              maxWidth: "90%",
              borderRadius: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Compose email</h3>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 12 }}>To</label>
              <input
                style={{ width: "100%" }}
                placeholder="recipient@example.com"
                value={compose.to}
                onChange={(e) =>
                  setCompose({ ...compose, to: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 12 }}>Subject</label>
              <input
                style={{ width: "100%" }}
                placeholder="Subject"
                value={compose.subject}
                onChange={(e) =>
                  setCompose({ ...compose, subject: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 12 }}>Message</label>
              <textarea
                style={{ width: "100%", height: 150 }}
                placeholder="Write your message..."
                value={compose.text}
                onChange={(e) =>
                  setCompose({ ...compose, text: e.target.value })
                }
              />
            </div>

            {sendError && (
              <div style={{ color: "red", marginBottom: 8 }}>{sendError}</div>
            )}

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button onClick={() => setComposeOpen(false)} disabled={sending}>
                Cancel
              </button>
              <button onClick={handleSend} disabled={sending}>
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailCRUD;
