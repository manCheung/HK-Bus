import axios from 'axios';
import { FETCHING_ALL_BUS } from '../constants';
import { set_all_bus } from '../actions';

const allBusRouteMiddleware = (storeAPI) => (next) => async (action) => {
    switch (action.type) {
        case FETCHING_ALL_BUS:
            const config = {
                'Content-Type': 'application/json'
            };

            try {
                const url = 'https://static.data.gov.hk/td/routes-fares-geojson/JSON_BUS.json';

                const res = await axios.get(url, config);
                storeAPI.dispatch(set_all_bus(res.data));
                return next(action);
            } catch (error) {
                console.log('allBusRouteMiddleware err', error);
                return next(error);
            }
        default:
            return next(action);
    }
};

export default allBusRouteMiddleware;
