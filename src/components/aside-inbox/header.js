import { config, defaultUserImage } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useProfilePictureModalStateContext } from "../../contexts/ProfilePictureModalStateProvider";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Header = ({ metadata, userProfilePicture }) => {
  const { setAuth } = useAuthContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const { setIsModalOpen } = useProfilePictureModalStateContext();
  const axiosPrivate = useAxiosPrivate();

  const openUpdateProfilePictureModal = () => {
    setShowDropDown(false);
    setIsModalOpen(true);
  };
  const navigate = useNavigate();

  const logout = async () => {
    const url = `${config.url}/api/auth/logout`;
    const res = await axiosPrivate.post(
      url,
      { userId: metadata.userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      localStorage.clear();
      setAuth({});
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="aside-inbox-header">
      <div
        className="aside-inbox-header-avatar"
        key="aside-inbox-header-avatar"
      >
        <img
          className="aside-inbox-header-avatar-img"
          src={userProfilePicture}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultUserImage;
          }}
          alt="avatar"
        />
      </div>
      <div
        className="aside-inbox-header-content"
        key="aside-inbox-header-content"
      >
        <h3 className="aside-inbox-header-content-name">{metadata.fullName}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          style={{ cursor: "pointer" }}
          onClick={() => setShowDropDown(!showDropDown)}
          viewBox="0 0 448 512"
        >
          <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
        </svg>
        <div
          className={`drop-down-menu ${
            showDropDown ? "drop-down-menu-active" : ""
          }`}
        >
          <div className="drop-down-menu-item" onClick={() => logout()}>
            <span>Logout</span>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 0.5 0.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.256 0c0.079 0 0.151 0.035 0.2 0.094a0.016 0.016 0 0 1 -0.003 0.023 0.017 0.017 0 0 1 -0.024 -0.003 0.224 0.224 0 0 0 -0.174 -0.081c-0.123 0 -0.223 0.097 -0.223 0.217 0 0.12 0.1 0.217 0.223 0.217 0.069 0 0.133 -0.031 0.175 -0.084a0.017 0.017 0 0 1 0.024 -0.003 0.016 0.016 0 0 1 0.003 0.023C0.41 0.464 0.336 0.5 0.256 0.5 0.115 0.5 0 0.388 0 0.25S0.115 0 0.256 0Zm0.171 0.179 0.068 0.068c0.007 0.007 0.007 0.017 0 0.023l-0.066 0.066a0.017 0.017 0 0 1 -0.023 0 0.017 0.017 0 0 1 0 -0.023l0.039 -0.039H0.187a0.017 0.017 0 0 1 -0.017 -0.016c0 -0.009 0.007 -0.016 0.017 -0.016h0.257l-0.039 -0.039a0.017 0.017 0 0 1 0 -0.023 0.017 0.017 0 0 1 0.023 0Z" />
            </svg>
          </div>
          <div
            className="drop-down-menu-item"
            onClick={() => openUpdateProfilePictureModal()}
          >
            <span>Update profile picture</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
