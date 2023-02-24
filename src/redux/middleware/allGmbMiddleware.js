import axios from 'axios';
import { FETCHING_GMB } from '../constants';
import { set_gmb } from '../actions';

const allGmbMiddleware = (storeAPI) => (next) => async (action) => {
    switch (action.type) {
        case FETCHING_GMB:
            const config = {
                'Content-Type': 'application/json'
            };

            try {
                const url = 'https://static.data.gov.hk/td/routes-fares-geojson/JSON_GMB.json';

                const res = await axios.get(url, config);
                storeAPI.dispatch(set_gmb(res.data));
                return next(action);
            } catch (error) {
                console.log('allGmbMiddleware err', error);
                return next(error);
            }
        default:
            return next(action);
    }
};

export default allGmbMiddleware;
