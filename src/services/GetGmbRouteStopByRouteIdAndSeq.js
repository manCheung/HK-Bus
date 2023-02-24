import axios from 'axios';

const GetGmbRouteStopByRouteIdAndSeq = async (signal, routeId, direction) => {
    const seq = direction == 'O' ? 1 : 2;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    try {
        const url = `https://data.etagmb.gov.hk/route-stop/${routeId}/${seq}`;

        const res = await axios.get(url, config);
        return res.data.data.route_stops;
    } catch (error) {
        console.log('GetGmbRouteStopByRouteIdAndSeq err', error);
    }
};

export default GetGmbRouteStopByRouteIdAndSeq;
