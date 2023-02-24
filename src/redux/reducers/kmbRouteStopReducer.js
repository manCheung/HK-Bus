import { SET_KMB_ROUTE_STOP } from '../constants';

const initialState = [];

const kmbRouteStopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_KMB_ROUTE_STOP: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default kmbRouteStopReducer;
