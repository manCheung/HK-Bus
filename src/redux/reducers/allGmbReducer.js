import { SET_GMB } from '../constants';

const initialState = {};

const allGmbReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GMB: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default allGmbReducer;
