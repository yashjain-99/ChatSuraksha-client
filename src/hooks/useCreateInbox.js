const useCreateInbox = (conversationsWithUserDetails) => {
  const inbox = {};
  const conversationHistory = {};
  const conversedWith = [];
  conversationsWithUserDetails.forEach((element) => {
    if (inbox[element.otherUserId]) {
      if (element.date > inbox[element.otherUserId].lastMessageTime) {
        inbox[element.otherUserId].lastMessage = element.text;
        inbox[element.otherUserId].lastMessageTime = element.date;
        inbox[element.otherUserId].lastMessageSelf =
          element.senderId !== element.otherUserId;
      }
      conversationHistory[element.otherUserId].data.push({
        message: element.text,
        date: element.date,
        self: element.senderId !== element.otherUserId,
      });
    } else {
      conversedWith.push(element.otherUserId);
      inbox[element.otherUserId] = {
        fullName: element.otherUserName,
        avatar:
          element.otherUserProfilePicture === ""
            ? "https://placekitten.com/100/100"
            : element.otherUserProfilePicture,
        lastMessage: element.text,
        lastMessageTime: element.date,
        conversationHistoryId: element.otherUserId,
        lastMessageSelf: element.senderId !== element.otherUserId,
      };
      conversationHistory[element.otherUserId] = {
        conversationHistoryId: element.otherUserId,
        fullName: element.otherUserName,
        avatar:
          element.otherUserProfilePicture === ""
            ? "https://placekitten.com/100/100"
            : element.otherUserProfilePicture,
        data: [
          {
            message: element.text,
            date: element.date,
            self: element.senderId !== element.otherUserId,
          },
        ],
      };
    }
  });
  return { inbox, conversationHistory, conversedWith };
};

export default useCreateInbox;
