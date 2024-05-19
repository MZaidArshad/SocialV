import "./about.scss";

const About = ({ userData }) => {
  return (
    <div className="about-section">
      <h2>Contact Information</h2>
      <hr />
      <table className="info-table">
        <tbody>
          <tr>
            <td>
              <strong>Email:</strong>
            </td>
            <td>{userData?.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Mobile:</strong>
            </td>
            <td>{userData?.mobile}</td>
          </tr>
          <tr>
            <td>
              <strong>Address:</strong>
            </td>
            <td>{userData?.address}</td>
          </tr>
        </tbody>
      </table>

      <h2>Websites and Social Links</h2>
      <hr />
      <table className="info-table">
        <tbody>
          <tr>
            <td>
              <strong>Website:</strong>
            </td>
            <td>
              <a href={userData?.website}>{userData?.website}</a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Social Link:</strong>
            </td>
            <td>
              <a href={userData?.socialLink}>{userData?.socialLink}</a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Basic Information</h2>
      <hr />
      <table className="info-table">
        <tbody>
          <tr>
            <td>
              <strong>Birth Date:</strong>
            </td>
            <td>{userData?.birthDay}</td>
          </tr>
          <tr>
            <td>
              <strong>Gender:</strong>
            </td>
            <td>{userData?.gender}</td>
          </tr>
          <tr>
            <td>
              <strong>Interested in:</strong>
            </td>
            <td>{userData?.interestedIn}</td>
          </tr>
          <tr>
            <td>
              <strong>Language:</strong>
            </td>
            <td>{userData?.language}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default About;
