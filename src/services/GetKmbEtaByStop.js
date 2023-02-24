import axios from 'axios';

const GetKmbEtaByStop = async (signal, stopId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    try {
        const url = `https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}`;

        const res = await axios.get(url, config);
        return res.data.data;
    } catch (error) {
        console.log('GetKmbEtaByStop err', error);
        console.log('stopId', stopId);
    }
};

export default GetKmbEtaByStop;
