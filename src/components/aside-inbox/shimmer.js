const Shimmer = () => {
  return (
    <div className="aside-inbox">
      <header className="aside-inbox-header">
        <div className="aside-inbox-header-avatar">
          <div className="aside-inbox-header-avatar-img-shimmer" />
        </div>
        <div className="aside-inbox-header-content">
          <div className="aside-inbox-header-content-name-shimmer" />
        </div>
      </header>
      <div className="aside-inbox-chats">
        <section className="chat-card" key="shimmer1">
          <div className="chat-card-avatar">
            <div className="chat-card-avatar-img-shimmer" />
          </div>
          <div className="chat-card-content-shimmer" />
        </section>
        <section className="chat-card" key="shimmer2">
          <div className="chat-card-avatar">
            <div className="chat-card-avatar-img-shimmer" />
          </div>
          <div className="chat-card-content-shimmer" />
        </section>
        <section className="chat-card" key="shimmer3">
          <div className="chat-card-avatar">
            <div className="chat-card-avatar-img-shimmer" />
          </div>
          <div className="chat-card-content-shimmer" />
        </section>
      </div>
    </div>
  );
};

export default Shimmer;
