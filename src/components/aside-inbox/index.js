import Header from "./header";
import ChatCard from "./chat-card";
import { useEffect, useState } from "react";

const AsideInbox = ({
  setSelectedConversation,
  inbox,
  conversedWith,
  metadata,
  setConversations,
}) => {
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setApiQuery(query);
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [query]);
  useEffect(() => {
    if (apiQuery !== "") {
      fetch(
        `https://chat-suraksha-api.onrender.com/api/users/search/${apiQuery}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.users);
        });
    }
  }, [apiQuery]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="aside-inbox">
      <Header metadata={metadata} />
      <div className="aside-inbox-search-container">
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={query}
          className="aside-inbox-search-input"
        />
        {searchResults.length > 0 && query != "" && (
          <div className="aside-inbox-search-results">
            {searchResults.map((user, index) => {
              return (
                <ChatCard
                  key={user.id}
                  name={user.fullName}
                  avatar={
                    user.profilePicture === ""
                      ? "https://placekitten.com/100/100"
                      : user.profilePicture
                  }
                  lastMessage={""}
                  chatHistory={inbox[user.id]?.conversationHistoryId}
                  setSelectedConversation={setSelectedConversation}
                  id={user.id}
                  index={index}
                  isFromSearch={true}
                  setConversations={setConversations}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="aside-inbox-chats">
        {conversedWith.map((conversationId, index) => {
          return (
            <ChatCard
              key={conversationId}
              name={inbox[conversationId].fullName}
              avatar={inbox[conversationId].avatar}
              lastMessage={inbox[conversationId].lastMessage}
              chatHistory={inbox[conversationId].conversationHistoryId}
              setSelectedConversation={setSelectedConversation}
              id={conversationId}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AsideInbox;
