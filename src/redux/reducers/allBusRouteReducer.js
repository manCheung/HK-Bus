import { SET_ALL_BUS } from '../constants';

const initialState = [];

const allBusRouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_BUS: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default allBusRouteReducer;
