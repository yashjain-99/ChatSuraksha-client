import isFromMobile from "../../hooks/useIsFromMobile";

const Header = ({ metadata }) => {
  return (
    <header className="main-chat-header">
      {metadata ? (
        <>
          <div className="main-chat-header-avatar">
            <img
              src={metadata.avatar}
              className="main-chat-header-avatar-img"
              alt="avatar"
            />
          </div>
          <div className="main-chat-header-content">
            <h3 className="main-chat-header-content-name">{metadata.name}</h3>
          </div>
        </>
      ) : (
        <>
          <div className="main-chat-header-avatar">
            <img
              src="https://placekitten.com/100/100"
              className="main-chat-header-avatar-img"
              alt="avatar"
            />
          </div>
          <div className="main-chat-header-content">
            <h3 className="main-chat-header-content-name">Schimmer</h3>
          </div>
        </>
      )}
      {isFromMobile() && (
        <div className="main-chat-header-back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            onClick={() => {
              document.querySelector(".main-chat").style.display = "none";
              document
                .querySelector(".aside-inbox")
                .style.removeProperty("display");
            }}
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      )}
    </header>
  );
};

export default Header;
