import { motion } from "framer-motion";
const Conversations = ({ conversations, selectedConversation }) => {
  if (conversations.length === 0) return null;
  return (
    <>
      {conversations.map((conversation, index) => {
        if (conversation.message === "") return null;
        return (
          <motion.div
            className={`main-chat-messages-message main-chat-messages-message-${
              conversation.self ? "self" : "other"
            }`}
            initial={{ x: conversation.self ? "100vw" : "-100vw" }}
            animate={{ x: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.2,
              type: "spring",
            }}
            key={`${selectedConversation}-${index}`}
          >
            <div className="main-chat-messages-message-content">
              <p className="main-chat-messages-message-content-text">
                {conversation.message}
              </p>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};
export default Conversations;
