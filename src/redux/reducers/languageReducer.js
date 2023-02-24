import { CHANGE_LANGUAGE } from '../constants';

const initialState = 'tc';

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default languageReducer;
