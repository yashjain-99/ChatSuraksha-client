import { createContext, useContext, useState } from "react";

const ProfilePictureModalStateContext = createContext({});

const ProfilePictureModalStateProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProfilePictureModalStateContext.Provider
      value={{ isModalOpen, setIsModalOpen }}
    >
      {children}
    </ProfilePictureModalStateContext.Provider>
  );
};

export const useProfilePictureModalStateContext = () =>
  useContext(ProfilePictureModalStateContext);

export default ProfilePictureModalStateProvider;
