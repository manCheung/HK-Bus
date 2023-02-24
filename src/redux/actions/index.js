import {
    LOADING_START,
    LOADING_END,
    TOAST_SHOW,
    TOAST_HIDE,
    FETCH_KMB_ROUTE_STOP,
    SET_KMB_ROUTE_STOP,
    FETCHING_GMB,
    SET_GMB,
    FETCHING_ALL_BUS,
    SET_ALL_BUS,
    CHANGE_LANGUAGE,
    SET_CURRENT_ROUTE
} from '../constants';

export const loading_start = () => ({
    type: LOADING_START
});

export const loading_end = () => ({
    type: LOADING_END
});

export const toast_show = (payload) => ({
    type: TOAST_SHOW
});

export const toast_hide = () => ({
    type: TOAST_HIDE
});

export const fetch_kmb_route_stop = () => ({
    type: FETCH_KMB_ROUTE_STOP
});

export const set_kmb_route_stop = (payload) => ({
    type: SET_KMB_ROUTE_STOP,
    payload
});

export const fetch_gmb = (payload) => ({
    type: FETCHING_GMB,
    payload
});

export const set_gmb = (payload) => ({
    type: SET_GMB,
    payload
});

export const change_language = (payload) => ({
    type: CHANGE_LANGUAGE,
    payload
});

export const fetch_all_bus_route = (payload) => ({
    type: FETCHING_ALL_BUS,
    payload
});

export const set_all_bus = (payload) => ({
    type: SET_ALL_BUS,
    payload
});

export const set_current_route = (payload) => ({
    type: SET_CURRENT_ROUTE,
    payload
});
