import React, { Fragment } from "react";
import "./userpage.css";

const Profile = ({ user }) => {
  return (
    <Fragment>
      <div className="col s12 l3">
        <div className="mypro_img">
          <img
            src="https://picsum.photos/400/300.jpg"
            className="responsive-img"
          />
        </div>

        <div>
          <span className="grey-text">
            SignedIn as:- <div className="divider"></div>
          </span>
          <h5>{user.name}</h5>
          <h5>{user.permission}</h5>
          <br />
          <br />
          <span className="grey-text">
            SKILLS <div className="divider"></div>
          </span>
          <h6>Branding</h6>
          <h6>Web Design</h6>
          <h6>App Development</h6>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
