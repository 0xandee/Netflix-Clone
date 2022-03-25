import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { rootReducer } from './reducers'
import {processReducer}  from '../../components/Chat/store/reducer'

// ** init middleware
const middleware = [thunk, createDebounce()]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(combineReducers({rootReducer,processReducer }), {}, composeEnhancers(applyMiddleware(...middleware)));

