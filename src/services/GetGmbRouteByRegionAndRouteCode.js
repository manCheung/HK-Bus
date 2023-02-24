import axios from 'axios';

const GetGmbRouteByRegionAndRouteCode = async (signal, region, routeCode) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    try {
        const url = `https://data.etagmb.gov.hk/route/${region}/${routeCode}`;

        const res = await axios.get(url, config);
        return res.data.data;
    } catch (error) {
        console.log('GetGmbRouteByRegionAndRouteCode err', error);
    }
};

export default GetGmbRouteByRegionAndRouteCode;
