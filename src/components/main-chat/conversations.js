const Conversations = ({ conversations, socket }) => {
  if (conversations.length === 0) return null;
  return (
    <>
      {conversations.map((conversation, index) => {
        if (conversation.message === "") return null;
        return (
          <div
            className={`main-chat-messages-message main-chat-messages-message-${
              conversation.self ? "self" : "other"
            }`}
            key={index}
          >
            <div className="main-chat-messages-message-content">
              <p className="main-chat-messages-message-content-text">
                {conversation.message}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Conversations;
