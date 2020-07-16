import axios from "axios";
import store from "../store";

import { START_EVENT, SUBMIT_ANSWER, SET_CURRENT_QUESTION } from "./types";

// start event
export const startEvent = (eventId) => async (dispatch) => {
  const res = await axios.get(`/api/team/start/${eventId}`);
  if (!res.data) return;
  console.log(res.data);
  dispatch({
    type: START_EVENT,
    payload: res.data,
  });
};

// set current question
export const setCurrentQuestion = (obj) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_QUESTION,
    payload: obj,
  });
};

// submit answer
export const submitAnswer = (questionId, answer) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.put(
    `/api/team/submit/${questionId}`,
    { submittedAnswer: answer },
    config
  );

  console.log(res.data);

  dispatch({
    type: SUBMIT_ANSWER,
    payload: res.data,
  });
};
