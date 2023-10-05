import isFromMobile from "../../hooks/useIsFromMobile";
const ChatCard = ({
  name,
  avatar,
  lastMessage,
  chatHistory,
  setSelectedConversation,
  id,
  index,
  setConversations,
  isFromSearch = false,
}) => {
  return (
    <section
      className="chat-card "
      onClick={() => {
        if (chatHistory) {
          setSelectedConversation(chatHistory);
          if (isFromMobile()) {
            document.querySelector(".aside-inbox").style.display = "none";
            try {
              document
                .querySelector(".main-chat")
                .style.removeProperty("display");
            } catch (error) {}
          }
        } else {
          const newConversation = {
            otherUserId: id,
            otherUserName: name,
            otherUserProfilePicture: avatar,
            reciepientId: id,
            senderId: JSON.parse(localStorage.getItem("metadata")).userId,
            text: "",
          };
          setConversations((prev) => {
            return {
              ...prev,
              conversationsWithUserDetails: [
                ...prev.conversationsWithUserDetails,
                newConversation,
              ],
            };
          });
        }
      }}
      key={id}
    >
      <div className="chat-card-avatar">
        <img src={avatar} className="chat-card-avatar-img" alt="avatar" />
      </div>
      <div
        className="chat-card-content"
        style={{ border: index === 0 ? "none" : "" }}
      >
        <h3 className="chat-card-content-name">{name}</h3>
        <p className="chat-card-content-message">{lastMessage}</p>
      </div>
    </section>
  );
};

export default ChatCard;
