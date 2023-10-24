import { useEffect, useState } from "react";
import { config } from "../../constants";
const Footer = ({ selectedConversation, userId, socket, setConversations }) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (message !== "") {
      socket.emit("sendMessage", {
        senderId: userId,
        reciepientId: selectedConversation,
        text: message,
      });
      const newConversations = {
        date: new Date().toISOString(),
        otherUserId: selectedConversation,
        otherUserName: "",
        otherUserProfilePicture: "",
        reciepientId: selectedConversation,
        senderId: userId,
        text: message,
      };
      setConversations((prev) => {
        return {
          ...prev,
          conversationsWithUserDetails: [
            ...prev.conversationsWithUserDetails,
            newConversations,
          ],
        };
      });
      fetch(`${config.url}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          reciepientId: selectedConversation,
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
