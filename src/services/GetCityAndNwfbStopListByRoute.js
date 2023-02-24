import axios from 'axios';

const GetCityAndNwfbStopListByRoute = async (signal, company, route, direction) => {
    const d = direction === 'O' ? 'outbound' : 'inbound';

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    try {
        const url = `https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/${company}/${route}/${d}`;

        const res = await axios.get(url, config);
        return res.data.data;
    } catch (error) {
        console.log('GetCityAndNwfbStopListByRoute err', error);
    }
};

export default GetCityAndNwfbStopListByRoute;
