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

  return (
    <footer className="main-chat-footer">
      <input
        type="text"
        className="main-chat-footer-input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="main-chat-footer-send-button" onClick={sendMessage}>
        &gt;
      </button>
    </footer>
  );
};

export default Footer;
