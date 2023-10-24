import Footer from "./footer";
import Header from "./header";
import Conversations from "./conversations";
import { useEffect } from "react";

const MainChat = ({
  selectedConversation,
  conversationHistory,
  userId,
  socket,
  setConversations,
}) => {
  if (selectedConversation === null) return null;
  const { fullName, avatar, data } = conversationHistory;
  const metadata = {
    name: fullName,
    avatar,
  };
  useEffect(() => {
    var objDiv = document.getElementById("main-chat-messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  });
  return (
    <div className="main-chat">
      <Header metadata={metadata} />
      <main className="main-chat-messages" id="main-chat-messages">
        <Conversations
          conversations={data}
          selectedConversation={selectedConversation}
        />
      </main>
      <Footer
        selectedConversation={selectedConversation}
        userId={userId}
        socket={socket}
        setConversations={setConversations}
      />
    </div>
  );
};

export default MainChat;
