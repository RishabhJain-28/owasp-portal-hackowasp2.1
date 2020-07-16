import axios from "axios";

import {
  LOAD_USER,
  LOGOUT_USER,
  GET_MY_TEAMS,
  SET_CURRENT_TEAM,
  CREATE_NEW_TEAM,
  JOIN_TEAM,
  LEAVE_TEAM,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  const res = await axios.get("/api/user/me");
  if (!res.data) return;
  dispatch({
    type: LOAD_USER,
    payload: res.data,
  });
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  const res = await axios.get("/api/user/logout");
  dispatch({
    type: LOGOUT_USER,
  });
};

// Get my teams
export const getMyTeams = () => async (dispatch) => {
  const res = await axios.get(`/api/team/me`);
  dispatch({
    type: GET_MY_TEAMS,
    payload: res.data,
  });
};

// Set Current Team
export const setCurrentTeam = (teamObj) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_TEAM,
    payload: teamObj,
  });
};

// Create new team
export const createTeam = (teamName) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post("/api/team/new", { teamName }, config);
  dispatch({
    type: CREATE_NEW_TEAM,
    payload: res.data,
  });
};

// Join team
export const joinTeam = (teamCode) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.put("/api/team/join", { teamCode }, config);
  dispatch({
    type: JOIN_TEAM,
    payload: res.data,
  });
};

// Leave Team
export const leaveTeam = (teamId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.put(`/api/team/leave/${teamId}`, {}, config);
  dispatch({
    type: LEAVE_TEAM,
    payload: teamId,
  });
};
