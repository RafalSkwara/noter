import {combineReducers} from 'redux'
import { mainReducer } from './mainReducer'
import { notesReducer } from './notesReducer'

const rootReducer = combineReducers({
	mainReducer,
	notesReducer
});
// const rootReducer = (state = 
// 	{ apiKey: "bcfe80d108c38d49f6ebc3fdf06942e0"
// }) => state

export default rootReducer