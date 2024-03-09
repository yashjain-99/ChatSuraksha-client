import Header from "./header";
import ChatCard from "./chat-card";
import { useEffect, useState } from "react";
import { config, defaultUserImage } from "../../constants";
const AsideInbox = ({
  setSelectedConversationId,
  inbox,
  userProfilePicture,
  metadata,
  setInbox,
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
      fetch(`${config.url}/api/users/search/${apiQuery}`)
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
      <Header metadata={metadata} userProfilePicture={userProfilePicture} />
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
              const userInInbox = inbox.find(
                (item) => item.otherUserId === user.id
              );
              return (
                <ChatCard
                  key={user.id}
                  name={user.fullName}
                  avatar={user.profilePicture}
                  lastMessage={""}
                  userInInbox={userInInbox}
                  setSelectedConversationId={setSelectedConversationId}
                  id={user.id}
                  index={index}
                  setInbox={setInbox}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="aside-inbox-chats">
        {inbox.map((inboxObj, index) => {
          return (
            <ChatCard
              key={inboxObj.otherUserId}
              name={inboxObj.otherUserName}
              avatar={inboxObj.otherUserProfilePicture}
              lastMessage={inboxObj.lastMessage}
              userInInbox={true}
              setSelectedConversationId={setSelectedConversationId}
              id={inboxObj.otherUserId}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AsideInbox;
