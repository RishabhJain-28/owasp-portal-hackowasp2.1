import React from "react";
import TimelinesComponent from "./TimelinesComponent";

import { connect } from "react-redux";

const TimelinePage = ({
  user: { user, loadingUser, isAuthenticated, teams },
}) => {
  return (
    <>
      {loadingUser === false && isAuthenticated === true && user !== null ? (
        <>
          <div className="row mypro_row" style={{ marginTop: "15px" }}>
            <div className="header"></div>
            <div className="heading">Event Managing...</div>
            <div className="container center">
              <TimelinesComponent />
            </div>
          </div>
        </>
      ) : (
        <h1>Login To View</h1>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(TimelinePage);
