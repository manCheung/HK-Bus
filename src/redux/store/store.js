import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';

//middleware
import kmbRouteStopMiddleware from '../middleware/kmbRouteStopMiddleware';
import allGmbMiddleware from '../middleware/allGmbMiddleware';

import allBusRouteMiddleware from '../middleware/allBusRouteMiddleware';

const inititalState = {};

const middleware = applyMiddleware(thunkMiddleware, kmbRouteStopMiddleware, allBusRouteMiddleware, allGmbMiddleware);

const store = createStore(rootReducer, inititalState, middleware);

export default store;
