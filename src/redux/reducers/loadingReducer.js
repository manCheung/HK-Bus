import { LOADING_START, LOADING_END } from '../constants';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START: {
            return true;
        }
        case LOADING_END: {
            return false;
        }
        default:
            return state;
    }
};

export default loadingReducer;
