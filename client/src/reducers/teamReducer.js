import {
  START_EVENT,
  SUBMIT_ANSWER,
  SET_CURRENT_QUESTION,
  GET_LEADERBOARD,
} from "../actions/types";

const initialState = {
  event: null,
  team: null,
  eventTeams: [],
  questions: [],
  currentQuestion: null,
  score: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // start event
    case START_EVENT:
      return {
        ...state,
        team: action.payload.team,
        questions: action.payload.team.questionsAssigned.filter(
          (obj) => obj.question !== null
        ),
        score: 0,
        event: action.payload.event,
        eventTeams: action.payload.eventTeams,
      };

    // set current question
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };

    // submit answer
    case SUBMIT_ANSWER:
      return {
        ...state,
        score: action.payload.score,
      };

    // get leaderboard
    case GET_LEADERBOARD:
      return {
        ...state,
        eventTeams: state.eventTeams.sort((a, b) => b.score - a.score),
      };

    // Default
    default:
      return state;
  }
};
