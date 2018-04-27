import { createReducer, createActions } from 'reduxsauce'
import { Types as ReduxSauceTypes } from 'reduxsauce'
import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'
import uuid from 'uuid'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setDate : ['date'],
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = '';
/* ------------- Reducers ------------- */

export const setDate = (state = INITIAL_STATE, action) => {
  Reactotron.log("setDate");
  console.tron.log(action);
  return action.date;
}

export const defaultHandler = (state = INITIAL_STATE) => {
  Reactotron.log("defaultHandler");
  return state;
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATE]: setDate,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
})
