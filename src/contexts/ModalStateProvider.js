import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  isProfilePictureModalOpen: false,
  is2faModalOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_PROFILE_PICTURE_MODAL":
      return {
        ...state,
        isProfilePictureModalOpen: !state.isProfilePictureModalOpen,
      };
    case "TOGGLE_2FA_MODAL":
      return { ...state, is2faModalOpen: !state.is2faModalOpen };
    default:
      return state;
  }
};

const ModalStateContext = createContext();

const ModalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalStateContext.Provider>
  );
};

export const useModalStateContext = () => useContext(ModalStateContext);

export default ModalStateProvider;
