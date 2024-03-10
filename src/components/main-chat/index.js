import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Conversations from "./conversations";
import { defaultUserImage } from "../../constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const endpoint = "/conversations";
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
    axiosPrivate
      .get(endpoint, {
        params: {
          userId,
          otherUserId: selectedConversationId,
        },
      })
      .then((response) => {
        setConversations(response.data.conversations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        navigate("/login");
      });
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
