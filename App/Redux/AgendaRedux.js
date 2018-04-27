import { createReducer, createActions } from 'reduxsauce'
import { Types as ReduxSauceTypes } from 'reduxsauce'
import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native'
import uuid from 'uuid'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getEvents : null,
    addEvent : ['id','name','dateStr','start','end'],
    editEvent : ['id','name','dateStr','start','end'],
    deleteEvent : ['id','dateStr'],
    initializeDate : ['date'],
})

export const TodoTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
/*     '2018-04-25' : [{
        id: 123-25,
        name:"Activity1",
        date: "2018-04-26", 
        startTime: '12:00', 
        endTime : '12:30'
    },{
        id: 1234-25,
        name:"Activity2",
        date: "2018-04-26", 
        startTime: '13:00', 
        endTime : '13:30'
    }],
    '2018-04-26' : [{
        id: 123-26,
        name:"Activity1",
        date: "2018-04-26", 
        startTime: '12:00', 
        endTime : '12:30'
    },{
        id: 1234-26,
        name:"Activity2",
        date: "2018-04-26", 
        startTime: '13:00', 
        endTime : '13:30'
    }], 
*/
};
/* ------------- Reducers ------------- */

export const getEvents = (state = INITIAL_STATE) => {
    let data0 = {
        '2018-04-25' : [{
            id: "123_25",
            name:"Activity1",
            date: "2018-04-26", 
            startTime: '12:00', 
            endTime : '12:30'
        },{
            id: "1234_25",
            name:"Activity2",
            date: "2018-04-26", 
            startTime: '13:00', 
            endTime : '13:30'
        }],
        '2018-04-26' : [{
            id: "123_26",
            name:"Activity1",
            date: "2018-04-26", 
            startTime: '12:00', 
            endTime : '12:30'
        },{
            id: "1234_26",
            name:"Activity2",
            date: "2018-04-26", 
            startTime: '13:00', 
            endTime : '13:30'
        }],
    };
    return state;
}

export const addEvent = (state = INITIAL_STATE, action) => {
    Reactotron.log("addEvent");
    Reactotron.log("action info: ");
    console.tron.log(action);
    let newEvent = {
        id : action.id,
        name : action.name,
        date : action.date,
        startTime : action.start,
        endTime : action.end,
    };
    //return state;
    return state[action.date]
            .slice()
            .push(newEvent);
}


const initializeDate = (state = INITIAL_STATE, action) => {
    date = action.date;
    if (state[action.date]){
        return state;
    }else{
        return [...state, { date : []}];
    }
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
  [Types.GET_EVENTS]: getEvents,
  [Types.ADD_EVENT]: addEvent,
  [Types.EDIT_EVENT]: editEvent,
  [Types.DELETE_EVENT]: deleteEvent,
  [Types.INITIALIZE_DATE] : initializeDate,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,

})
