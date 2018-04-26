import { createReducer, createActions } from 'reduxsauce'
import { Types as ReduxSauceTypes } from 'reduxsauce'
import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'
import uuid from 'uuid'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addEvent : ['name','dateStr','start','end'],
    editEvent : ['id','name','dateStr','start','end'],
    deleteEvent : ['id','dateStr'],
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = {};
/* ------------- Reducers ------------- */

export const addEvent = (state = INITIAL_STATE, action) => {
    Reactotron.log("addEvent");
    return state;
}

export const deleteEvent = (state = INITIAL_STATE, action) => {
    Reactotron.log("deleteEvent");
    return state;
}

export const editEvent = (state = INITIAL_STATE, action) => {
    Reactotron.log("editItem");
    return state;
}

export const defaultHandler = (state = INITIAL_STATE) => {
  Reactotron.log("defaultHandler");
  return state;
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_EVENT]: addEvent,
  [Types.EDIT_EVENT]: editEvent,
  [Types.DELETE_EVENT]: deleteEvent,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
})
