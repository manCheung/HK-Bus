import axios from 'axios';

const GetGmbEta = async (signal, stopId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        signal
    };

    try {
        const url = `https://data.etagmb.gov.hk/eta/stop/${stopId}`;

        const res = await axios.get(url, config);
        return res.data.data;
    } catch (error) {
        console.log('GetGmbEta err', error);
    }
};

export default GetGmbEta;
