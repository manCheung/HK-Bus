import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, View, Dimensions, Text } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { storeLocalData, STORE_HISTORY, getLocalData } from '../services/LocalStore';
import BusCard from '../components/busCard';
import { GetFavouriteFromDb } from '../services/DbProcess';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { set_current_route } from '../redux/actions';

const FavouriteScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const screenWidth = Dimensions.get('window').width;

    const [busFavouriteRoutes, setBusFavouriteRoutes] = useState([]);
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        }).cloneWithRows([])
    );
    const [layoutProvider, setLayoutProvider] = useState(
        new LayoutProvider(
            (index) => {
                return 0;
            },
            (type, dim) => {
                dim.width = screenWidth;
                dim.height = 95;
            }
        )
    );

    const renderItem = (type, data) => <BusCard datas={data} onClickBusRoute={onClickBusRoute} />;

    const onClickBusRoute = async (route) => {
        const company = route.routes.company;
        const current_route = {
            companyC: company == 'KMB' ? '九巴' : company == 'CTB' ? '城巴' : company == 'NWFB' ? '新巴' : company =='LWB' ? '龍運巴士' : '專線小巴',
            companyE: company,
            routeNo: route.routes.route,
            route: route
        };

        dispatch(set_current_route(current_route));

        navigation.navigate('RouteInfo', route);
    };

    useEffect(() => {
        // console.log(busRoutes);busFavouriteRoutes
        setDataProvider(
            new DataProvider((r1, r2) => {
                busFavouriteRoutes;
                return r1 !== r2;
            }).cloneWithRows(busFavouriteRoutes)
        );
    }, [busFavouriteRoutes]);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const favourite = await GetFavouriteFromDb();
                setBusFavouriteRoutes(favourite);
            })();
        }, [])
    );

    // useEffect(() => {
    //     (async () => {
    //         const history = await GetHistoryFromDb();
    //         console.log('hsitory', history);

    //         //     const storedHistory = await getLocalData(STORE_HISTORY);
    //         //     console.log(storedHistory);
    //         //     if (storedHistory) {
    //         //         const historys = JSON.parse(storedHistory);
    //         //         // console.log(storedHistory)
    //         //         if (historys.length > 0) {
    //         //             setBusRoutes(historys);
    //         //         }
    //         //     }
    //     })();
    // }, [useIsFocused]);

    return (
        <View style={styles.container}>
            {dataProvider.getSize() > 0 ? (
                <RecyclerListView style={styles.list} dataProvider={dataProvider} layoutProvider={layoutProvider} rowRenderer={renderItem} />
            ) : (
                <View style={styles.loading}>
                    <Text>No Favourite</Text>
                </View>
            )}
        </View>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    list: {
        width: '100%',
        minHeight: 1
    },
    loadingContainer: {
        flex: 1
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 11
    },
    progressBar: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
