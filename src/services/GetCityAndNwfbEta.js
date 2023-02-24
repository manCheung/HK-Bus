import axios from 'axios';

const GetCityAndNwfbEta = async (signal, company, route, stopId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    try {
        const url = `https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/eta/${company}/${stopId}/${route}`;

        const res = await axios.get(url, config);
        return res.data.data;
    } catch (error) {
        console.log('GetCityAndNwfbEta err', error);
    }
};

export default GetCityAndNwfbEta;
