import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import kmbRouteStopReducer from './kmbRouteStopReducer';
import allBusRouteReducer from './allBusRouteReducer';
import allGmbReducer from './allGmbReducer';
import languageReducer from './languageReducer';
import currentRouteReducer from './currentRouteReducer';

export const rootReducer = combineReducers({
    isLoading: loadingReducer,
    kmbRouteStop: kmbRouteStopReducer,
    allBusRoute: allBusRouteReducer,
    allGmbRoute: allGmbReducer,
    language: languageReducer,
    currentRoute: currentRouteReducer
});

export default rootReducer;
