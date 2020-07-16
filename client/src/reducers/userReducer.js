import {
  LOAD_USER,
  LOGOUT_USER,
  GET_MY_TEAMS,
  SET_CURRENT_TEAM,
  CREATE_NEW_TEAM,
  JOIN_TEAM,
  LEAVE_TEAM,
} from "../actions/types";

const initialState = {
  user: null,
  loadingUser: true,
  isAuthenticated: false,
  teams: [],
  currentTeam: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Load User
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        loadingUser: false,
        isAuthenticated: true,
      };

    // Logout User
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        teams: [],
        isAuthenticated: false,
        currentTeam: null,
      };

    // Get My Teams
    case GET_MY_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    // Set Current Team
    case SET_CURRENT_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };

    // Create Team
    case CREATE_NEW_TEAM:
      return {
        ...state,
        teams: [action.payload, ...state.teams],
      };

    // Join Team
    case JOIN_TEAM:
      return {
        ...state,
        teams: [action.payload, ...state.teams],
      };

    // Leave Team
    case LEAVE_TEAM:
      return {
        ...state,
        teams: state.teams.filter((team) => team._id !== action.payload),
      };

    // Default
    default:
      return state;
  }
};
