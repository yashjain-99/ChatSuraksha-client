import { defaultUserImage } from "../../constants";
import isFromMobile from "../../hooks/useIsFromMobile";
const ChatCard = ({
  name,
  avatar,
  lastMessage,
  userInInbox,
  setSelectedConversationId,
  id,
  index,
  setInbox = () => {},
}) => {
  return (
    <section
      className="chat-card "
      onClick={() => {
        if (userInInbox) {
          setSelectedConversationId(id);
          if (isFromMobile()) {
            document.querySelector(".aside-inbox").style.display = "none";
            try {
              document
                .querySelector(".main-chat")
                .style.removeProperty("display");
            } catch (error) {}
          }
        } else {
          const newInbox = {
            otherUserId: id,
            lastMessage: "",
            lastMessageDate: new Date().toISOString(),
            otherUserName: name,
            otherUserProfilePicture: avatar,
          };
          const newConversation = {
            date: new Date().toISOString(),
            message: "",
            self: true,
          };
          setInbox((prevInbox) => {
            return [newInbox, ...prevInbox];
          });
        }
      }}
      key={id}
    >
      <div className="chat-card-avatar">
        <img
          src={avatar}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultUserImage;
          }}
          className="chat-card-avatar-img"
          alt="avatar"
        />
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
