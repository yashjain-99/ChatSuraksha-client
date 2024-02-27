import { useState } from "react";
import { config } from "../../constants";
const Footer = ({
  selectedConversationId,
  setInbox,
  userId,
  socket,
  setConversations,
  metadata,
}) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (message !== "") {
      socket.emit("sendMessage", {
        senderId: userId,
        reciepientId: selectedConversationId,
        text: message,
      });
      const newInbox = {
        otherUserId: selectedConversationId,
        lastMessage: message,
        lastMessageDate: new Date().toISOString(),
        otherUserName: metadata.name,
        otherUserProfilePicture: metadata.avatar,
      };
      const newConversation = {
        date: new Date().toISOString(),
        message,
        self: true,
      };
      setInbox((prevInbox) => {
        const updatedPrevInbox = prevInbox.filter(
          (inboxObj) => inboxObj.otherUserId != selectedConversationId
        );
        return [newInbox, ...updatedPrevInbox];
      });
      setConversations((prev) => {
        return [...prev, newConversation];
      });
      fetch(`${config.url}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          reciepientId: selectedConversationId,
          text: message,
        }),
      }).then((res) => {
        if (res.status === 201) {
          setMessage("");
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <footer>
      <form className="main-chat-footer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="main-chat-footer-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="main-chat-footer-send-button">
          &gt;
        </button>
      </form>
    </footer>
  );
};

export default Footer;
