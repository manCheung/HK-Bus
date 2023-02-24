import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORE_HISTORY = '@STORE_HISTORY';
export const STORE_FAVOURITE = '@STORE_FAVOURITE';

export const storeLocalData = async (key, value) => {
    try {
        if (typeof value === 'string') {
            await AsyncStorage.setItem(key, value);
        } else {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }
    } catch (e) {
        console.log('saving kicak store error: ' + e);
        // saving error
    }
};

export const getLocalData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value != null) {
            if (typeof value === 'string') {
                return value;
            } else {
                return JSON.parse(value);
            }
        }

        return null;
    } catch (e) {
        console.log('reading local store error: ' + e);
        // error reading value
    }
};
