const Header = ({ metadata }) => {
  return (
    <header className="aside-inbox-header">
      <div className="aside-inbox-header-avatar">
        <img
          className="aside-inbox-header-avatar-img"
          src="https://placekitten.com/100/100"
          alt="avatar"
        />
      </div>
      <div className="aside-inbox-header-content">
        <h3 className="aside-inbox-header-content-name">{metadata.fullName}</h3>
      </div>
    </header>
  );
};

export default Header;
