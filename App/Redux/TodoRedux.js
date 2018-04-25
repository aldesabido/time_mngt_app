import { createReducer, createActions } from 'reduxsauce'
import { Types as ReduxSauceTypes } from 'reduxsauce'
import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTodos: null,
  addTodo : ['text'],
  editTodo : ['text','index'],
  deleteTodo : ['index'],
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const INITIAL_STATE = ({
  tasks : [],
})

/* ------------- Reducers ------------- */

export const getTodos = (state = INITIAL_STATE) => {
    Reactotron.log("Getting Todos",true);
    let newThings = ["Hello", "World","!"];
    console.tron.log(newThings);
    return {
      ...state,
      tasks : newThings,
    }

 /*    AsyncStorage.getItem("TASKS_000")
    .then((things) => {
      Reactotron.log("newThings: " + newThings,true);
      Reactotron.log("things: " + things,true);
      if(things){
        newThings = JSON.parse(things);
        Reactotron.log("things found!",true);
        console.tron.log(newThings);
        
        return {
            ...state,
            tasks : newThings
        }
      }else{
        Reactotron.log("no things found",true);
        Tasks.save(newThings);
        return {
            ...state,
            tasks : newThings,
        };
      }
    })
    .catch((reason) => {
      Reactotron.log("TodoRedux:\nSomething happened!\n" + reason,true);
      return state;
      throw reason;
    }) */
}

export const addTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("addTodo");
  return [...state.tasks, action];
}

export const editTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("editTodo");
  return state;
}

export const deleteTodo = (state = INITIAL_STATE, action) => {
  Reactotron.log("deleteTodo");
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
