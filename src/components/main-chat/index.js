import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Conversations from "./conversations";
import { getConversation } from "../../hooks/useFetch";
import { defaultUserImage } from "../../constants";

const MainChat = ({
  selectedConversationId,
  setInbox,
  userId,
  socket,
  inbox,
}) => {
  if (selectedConversationId === null) return null;
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      if (data.senderId == selectedConversationId) {
        const newConversation = {
          date: new Date().toISOString(),
          message: data.text,
          self: false,
        };

        setConversations((prev) => {
          return [...prev, newConversation];
        });
      }
    });
  }, [socket]);

  useEffect(() => {
    setLoading(true);
    getConversation(
      userId,
      selectedConversationId,
      setConversations,
      setLoading
    );
  }, [userId, selectedConversationId]);

  useEffect(() => {
    if (conversations.length > 0) {
      var objDiv = document.getElementById("main-chat-messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [conversations]);
  const selectedUser = inbox.find(
    (item) => item.otherUserId === selectedConversationId
  );
  const metadata = {
    name: selectedUser.otherUserName,
    avatar:
      selectedUser.otherUserProfilePicture === ""
        ? defaultUserImage
        : selectedUser.otherUserProfilePicture,
  };

  return (
    <div className="main-chat">
      <Header metadata={metadata} />
      <main className="main-chat-messages" id="main-chat-messages">
        {!loading && (
          <Conversations
            conversations={conversations}
            selectedConversationId={selectedConversationId}
          />
        )}
      </main>
      <Footer
        selectedConversationId={selectedConversationId}
        userId={userId}
        socket={socket}
        setConversations={setConversations}
        setInbox={setInbox}
        metadata={metadata}
      />
    </div>
  );
};

export default MainChat;
