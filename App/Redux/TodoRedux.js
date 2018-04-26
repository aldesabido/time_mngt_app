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
    return state;
}

export const addTodo = (state = INITIAL_STATE, action) => {
  return [...state, action.text];
}

export const deleteTodo = (state = INITIAL_STATE, action) => {
  let index = action.index;
  return [
    ...state.slice( 0 , index ),
    ...state.slice( index + 1 )
  ];
}

export const editTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("editTodo",true);
  Reactotron.log("in editTodo: index: " + action.index,true);
  Reactotron.log("in editTodo: text: " + action.text,true);

  let index = action.index;
  let text = action.text;

  return state
    .slice(0,index)
    .concat(text)
    .concat(state.slice(index + 1));
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
