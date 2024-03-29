import AsideInbox from "../components/aside-inbox";
import MainChat from "../components/main-chat";
import { useState, useEffect } from "react";
import { getInbox } from "../hooks/useFetch";
import { io } from "socket.io-client";
import isFromMobile from "../hooks/useIsFromMobile";
import { config } from "../constants";
import Loader from "../components/loader";
import { motion, useIsPresent, AnimatePresence } from "framer-motion";
import UpdateProfilePictureModal from "../components/upload-profile-picture-modal";
import Add2FaModal from "../components/add-2fa-modal";

const Dashboard = () => {
  const metadata = JSON.parse(localStorage.getItem("metadata"));
  const userId = metadata.userId;
  const [inbox, setInbox] = useState({});
  const [userProfilePicture, setUserProfilePicture] = useState(
    metadata.profilePicture
  );
  const [loading, setLoading] = useState(true);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const isPresent = useIsPresent();
  getInbox(userId, setInbox, setLoading, setPercentCompleted);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(config.url, {
      query: { userId, fullName: metadata.fullName },
    });
    setSocket(newSocket);
    return () => {
      // Clean up the socket when the component unmounts
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.emit("addUser", userId);
    socket?.on("getMessage", (data) => {
      const newInbox = {
        otherUserId: data.senderId,
        lastMessage: data.text,
        lastMessageDate: new Date().toISOString(),
        otherUserName: data.fullName,
        otherUserProfilePicture: "",
      };
      setInbox((prevInbox) => {
        const updatedPrevInbox = prevInbox.filter(
          (inboxObj) => inboxObj.otherUserId != data.senderId
        );
        return [newInbox, ...updatedPrevInbox];
      });
    });
  }, [socket]);

  if (loading) return <Loader />;
  return (
    <div
      className="layout-grid"
      style={isFromMobile() ? { display: "block" } : {}}
    >
      <AnimatePresence key="AnimatePresence-dashboard">
        <AsideInbox
          setSelectedConversationId={setSelectedConversationId}
          inbox={inbox}
          setInbox={setInbox}
          userProfilePicture={userProfilePicture}
          metadata={metadata}
          key="AsideInbox"
        />
        <MainChat
          userId={userId}
          selectedConversationId={selectedConversationId}
          socket={socket}
          inbox={inbox}
          setInbox={setInbox}
          key="MainChat"
        />
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0,
            transition: { duration: 0.8, ease: "circOut" },
          }}
          exit={{ scaleX: 1, transition: { duration: 0.8, ease: "circIn" } }}
          style={{ originX: isPresent ? 0 : 1 }}
          className="privacy-screen"
          key="motion-div-dashboard"
        />
      </AnimatePresence>
      <UpdateProfilePictureModal
        setUserProfilePicture={setUserProfilePicture}
      />
      <Add2FaModal />
    </div>
  );
};

export default Dashboard;
