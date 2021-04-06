import { combineReducers } from 'redux';
import interfaceReducer from './interface/reducer';
import authReducer from './auth/reducer';
import worldReducer from './world/reducer';

export default combineReducers({
    interface: interfaceReducer, 
    auth: authReducer,
    world: worldReducer
});