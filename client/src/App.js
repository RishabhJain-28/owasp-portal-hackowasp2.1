import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import result from "./store";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Navbar from "./components/layout/Navbar";
import UserPage from "./components/User/UserPage";
import TeamPage from "./components/Team/TeamPage";
import EventPage from "./components/Event/EventPage";
import TeamCollection from "./components/LeaderBoard/TeamCollection";
import TimelinePage from "./components/Timeline/TimelinePage";
import EventAdmin from "./components/Admin/EventAdmin";
import QuestionAdmin from "./components/Admin/QuestionAdmin";
import AdminPage from "./components/Admin/AdminPage";
import InviteUser from "./components/Admin/InviteUser";
import Permissions from "./components/Admin/Permissions";
import CodeQuestion from "./components/Question/CodeQuestion";
import LandingPage from "./components/pages/LandingPage";

const App = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  const { store, persistor } = result;
  return (
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/user" component={UserPage} />
              <Route exact path="/team/:id" component={TeamPage} />
              <Route exact path="/eventPage/:eventId" component={EventPage} />
              <Route exact path="/leaderboard" component={TeamCollection} />
              <Route exact path="/code/:questionId" component={CodeQuestion} />
              <Route exact path="/timeline" component={TimelinePage} />
              <Route exact path="/admin/event/:id" component={QuestionAdmin} />
              <Route exact path="/admin/event" component={EventAdmin} />
              <Route exact path="/admin/permissions" component={Permissions} />
              <Route exact path="/admin/invite" component={InviteUser} />
              <Route exact path="/admin" component={AdminPage} />
            </Switch>
          </Fragment>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
