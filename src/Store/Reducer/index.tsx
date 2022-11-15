import addTodoReducer from "./reducer";
import {combineReducers}from 'redux';

const rootReducer:any=combineReducers({
    addTodoReducer,
});
export default rootReducer;