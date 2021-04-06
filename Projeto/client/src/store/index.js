import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './modules/index';

export const initStore = () => {
    return createStore(
        rootReducer,
        process.env.NODE_ENV === 'development' ?
            composeWithDevTools(applyMiddleware(thunk), applyMiddleware(logger)) :
            compose(applyMiddleware(thunk))
    );
};

export default createWrapper(initStore, { debug: false });