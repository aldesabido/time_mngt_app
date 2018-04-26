import { createReducer, createActions } from 'reduxsauce'
import { Types as ReduxSauceTypes } from 'reduxsauce'
import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTodos: null,
  addTodo : ['text'],
  deleteTodo : ['index'],
  editTodo : ['text','index'],
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = [];
/* ------------- Reducers ------------- */

export const getTodos = (state = []) => {
    Reactotron.log("Getting Todos",true);
    console.tron.log("in getTodos: state: " + state);
    return state;
}

export const addTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("addTodo"); 
  Reactotron.log("action text: " + action.text);
  return [...state, action.text];
}

export const deleteTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("deleteTodo",true);
  let index = action.index;
  return [
    ...state.slice(0,index),
    ...state.concat(state.slice(index + 1))
  ];
}

export const editTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("editTodo");
  return state;
}

export const defaultHandler = (state = INITIAL_STATE) => {
  Reactotron.log("defaultHandler");
  return state;
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TODOS]: getTodos,
  [Types.ADD_TODO]: addTodo,
  [Types.EDIT_TODO]: editTodo,
  [Types.DELETE_TODO]: deleteTodo,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
})
