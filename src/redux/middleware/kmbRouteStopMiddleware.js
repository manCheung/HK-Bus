import axios from 'axios';
import { FETCH_KMB_ROUTE_STOP } from '../constants';
import { set_kmb_route_stop } from '../actions';

const kmbRouteStopMiddleware = (storeAPI) => (next) => async (action) => {
    switch (action.type) {
        case FETCH_KMB_ROUTE_STOP:
            const config = {
                'Content-Type': 'application/json'
            };

            try {
                const url = 'https://data.etabus.gov.hk/v1/transport/kmb/route-stop';

                const res = await axios.get(url, config);
                storeAPI.dispatch(set_kmb_route_stop(res.data.data));
                return next(action);
            } catch (error) {
                console.log('kmbRouteStopMiddleware err', error);
                return next(error);
            }
        default:
            return next(action);
    }
};

export default kmbRouteStopMiddleware;
