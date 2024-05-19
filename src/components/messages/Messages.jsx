import "./messages.scss";

import profile17 from "../../assets/images/profile-17.jpg";

const Messages = () => {
  return (
    <div className="messages">
      <div className="heading">
        <h4>Messages</h4>
        <i className="uil uil-edit"></i>
      </div>
      {/* <!------- SEARCH BAR -------> */}
      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input
          type="search"
          placeholder="Search messages"
          id="message-search"
        />
      </div>
      {/* <!------- MESSAGES CATEGORY -------> */}
      <div className="category">
        <h6 className="active">Primary</h6>
        <h6>General</h6>
        <h6 className="message-requests">Requests (7)</h6>
      </div>
      {/* <!------- MESSAGES -------> */}
      <div className="message">
        <div className="profile-photo">
          <img src={profile17} />
        </div>
        <div className="message-body">
          <h5>Edem Quist</h5>
          <p className="text-muted">Just woke up bruh</p>
        </div>
      </div>
      {/* <!------- MESSAGES -------> */}
      <div className="message">
        <div className="profile-photo">
          <img src={profile17} />
        </div>
        <div className="message-body">
          <h5>Daniella Jackson</h5>
          <p className="text-bold">2 new messages</p>
        </div>
      </div>
      {/* <!------- MESSAGES -------> */}
      <div className="message">
        <div className="profile-photo">
          <img src={profile17} />
          <div className="active"></div>
        </div>
        <div className="message-body">
          <h5>Chantel Msiza</h5>
          <p className="text-muted">lol u right</p>
        </div>
      </div>
      {/* <!------- MESSAGES -------> */}
      <div className="message">
        <div className="profile-photo">
          <img src={profile17} />
        </div>
        <div className="message-body">
          <h5>Juliet Makarey</h5>
          <p className="text-muted">Birtday Tomorrow</p>
        </div>
      </div>
      {/* <!------- MESSAGES -------> */}
      <div className="message">
        <div className="profile-photo">
          <img src={profile17} />
          <div className="active"></div>
        </div>
        <div className="message-body">
          <h5>Keylie Hadid</h5>
          <p className="text-bold">5 new messages</p>
        </div>
      </div>
      {/* <!------- MESSAGES -------> */}
      <div className="message">
        <div className="profile-photo">
          <img src={profile17} />
        </div>
        <div className="message-body">
          <h5>Benjamin Dwayne</h5>
          <p className="text-muted">haha got that!</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
