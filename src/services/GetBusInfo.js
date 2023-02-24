import { axios } from './Axios';

const ALL_BUS_ROUTE_END_POINT = 'https://static.data.gov.hk/td/routes-fares-geojson/';
const KMB_STOP_END_POINT = 'https://data.etabus.gov.hk/v1/';

export const getBusRoute = () => axios(ALL_BUS_ROUTE_END_POINT).get('JSON_BUS.json');
export const getGmbRoute = () => axios(ALL_BUS_ROUTE_END_POINT).get('JSON_GMB.json');
export const getKmbStop = () => axios(KMB_STOP_END_POINT).get('transport/kmb/route-stop');

export const getAllBusRoute = async () => {
    let valuesList = [];

    const busRoute = await getBusRoute();
    const busRouteData = busRoute.data;

    for (let i = 0; i < busRouteData.length; i++) {
        const route = busRouteData[i];

        if (route.companyCode == 'NLB' || 
				route.companyCode == 'PI' || 
				route.companyCode == 'DB' ||
				route.companyCode == 'XB' ||
				route.companyCode == 'LRTFeeder' ||
				route.companyCode == 'FERRY' ||
				route.companyCode == 'PTRAM' ||
				route.companyCode == 'TRAM'
				) continue;

        if (route.companyCode.includes('+')) {
            let companyCodes = route.companyCode.split('+');

            companyCodes.forEach((code, index) => {
                valuesList.push(route.routeNameE);
                valuesList.push(route.routeId);
                valuesList.push(route.district);
                valuesList.push(code);
                valuesList.push(route.locStartNameE);
                valuesList.push(route.locStartNameC);
                valuesList.push(route.locEndNameE);
                valuesList.push(route.locEndNameC);
                valuesList.push(JSON.stringify(route.rstop));
                valuesList.push(route.routeRemarkE);
                valuesList.push(route.routeRemarkC);
                valuesList.push(index);
            });
        } else {
            valuesList.push(route.routeNameE);
            valuesList.push(route.routeId);
            valuesList.push(route.district);
            valuesList.push(route.companyCode);
            valuesList.push(route.locStartNameE);
            valuesList.push(route.locStartNameC);
            valuesList.push(route.locEndNameE);
            valuesList.push(route.locEndNameC);
            valuesList.push(JSON.stringify(route.rstop));
            valuesList.push(route.routeRemarkE);
            valuesList.push(route.routeRemarkC);
            valuesList.push(null);
        }
    }

    const gmbRoute = await getGmbRoute();
    const gmbRouteData = gmbRoute.data;

    for (let i = 0; i < gmbRouteData.length; i++) {
        const route = gmbRouteData[i];

        if (route.companyCode.includes('+')) {
            let companyCodes = route.companyCode.split('+');

            companyCodes.forEach((code, index) => {
                valuesList.push(route.routeNameE);
                valuesList.push(route.routeId);
                valuesList.push(route.district);
                valuesList.push(code);
                valuesList.push(route.locStartNameE);
                valuesList.push(route.locStartNameC);
                valuesList.push(route.locEndNameE);
                valuesList.push(route.locEndNameC);
                valuesList.push(JSON.stringify(route.rstop));
                valuesList.push(route.routeRemarkE);
                valuesList.push(route.routeRemarkC);
                valuesList.push(index);
            });
        } else {
            valuesList.push(route.routeNameE);
            valuesList.push(route.routeId);
            valuesList.push(route.district);
            valuesList.push(route.companyCode);
            valuesList.push(route.locStartNameE);
            valuesList.push(route.locStartNameC);
            valuesList.push(route.locEndNameE);
            valuesList.push(route.locEndNameC);
            valuesList.push(JSON.stringify(route.rstop));
            valuesList.push(route.routeRemarkE);
            valuesList.push(route.routeRemarkC);
            valuesList.push(null);
        }
    }

    return {
        list: valuesList,
        length: gmbRouteData.length + busRouteData.length
    };
};

export const getKmbBusStop = async () => {
    let valuesList = [];

    const kmbBusStopRoute = await getKmbStop();

    const kmbBusStopRouteData = kmbBusStopRoute.data.data;

    for (let i = 0; i < kmbBusStopRouteData.length; i++) {
        const stop = kmbBusStopRouteData[i];

        valuesList.push(stop.route);
        valuesList.push(stop.bound);
        valuesList.push(stop.service_type);
        valuesList.push(stop.seq);
        valuesList.push(stop.stop);
    }

    return {
        list: valuesList,
        length: kmbBusStopRouteData.length
    };
};
