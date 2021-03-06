/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumEvents from '../components/dumEvents';

const Events = (
  state = {
    isLoading: true,
    errMess: null,
    allEvents: dumEvents,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_EVENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allEvents: action.payload,
      };

    case ActionTypes.EVENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.EVENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};

export default Events;
