import { SET_CURRENT_ROUTE } from '../constants';

const initialState = {};

const currentRouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ROUTE: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default currentRouteReducer;
