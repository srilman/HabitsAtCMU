import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import indexReducer from '../indexReducer';

const configureStore = (initialState) => createStore(
    indexReducer,
    initialState,
    compose(
        applyMiddleware(
            logger
        ),
    ),
);

export default configureStore;