import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import SearchBar from '../components/searchBar';
import BusCard from '../components/busCard';
import { fetch_gmb, fetch_kmb_route_stop, fetch_all_bus_route } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar, Colors } from 'react-native-paper';
import { set_current_route } from '../redux/actions';
import { storeLocalData, STORE_HISTORY, getLocalData } from '../services/LocalStore';
import { GetBusRouteFromDb, InsertHistory, GetSettingFromDb } from '../services/DbProcess';

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const RouteScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const screenWidth = Dimensions.get('window').width;

    // const allBusRoute = useSelector((state) => state.allBusRoute);
    // const allGmbRoute = useSelector((state) => state.allGmbRoute);

    const [searchPhrase, setSearchPhrase] = useState('');
    const [clicked, setClicked] = useState(false);
    const [busRoutes, setBusRoutes] = useState([]);
    const [fullBusRoutes, setFullBusRoutes] = useState([]);
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

        InsertHistory(route.routes);
        navigation.navigate('RouteInfo', route);
    };

    useEffect(() => {
        (async () => {
            const busRoute = await GetBusRouteFromDb();

            setFullBusRoutes(busRoute);
            setBusRoutes(busRoute);

            // await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/hk_bus_eta.db', { dialogTitle: 'share or copy your DB via' }).catch((error) => {
            //     console.log(error);
            // });
        })();
    }, []);

    // useEffect(() => {
    //     if (allBusRoute.length > 0 && allGmbRoute.length > 0) {
    //         const formatAllBusRoute = (routes) => {
    //             const busRoute = [];

    //             routes.map((route) => {
    //                 if (route.companyCode.includes('+')) {
    //                     let companyCodes = route.companyCode.split('+');
    //                     companyCodes.map((code, index) => {
    //                         busRoute.push({
    //                             route: route.routeNameE,
    //                             routeId: route.routeId,
    //                             district: route.district,
    //                             company: code,
    //                             orig_en: route.locStartNameE,
    //                             orig_tc: route.locStartNameC,
    //                             dest_en: route.locEndNameE,
    //                             dest_tc: route.locEndNameC,
    //                             stops: route.rstop,
    //                             remark_en: route.routeRemarkE,
    //                             remark_tc: route.routeRemarkC,
    //                             multi: index
    //                         });
    //                     });
    //                 } else {
    //                     busRoute.push({
    //                         route: route.routeNameE,
    //                         routeId: route.routeId,
    //                         district: route.district,
    //                         company: route.companyCode,
    //                         orig_en: route.locStartNameE,
    //                         orig_tc: route.locStartNameC,
    //                         dest_en: route.locEndNameE,
    //                         dest_tc: route.locEndNameC,
    //                         stops: route.rstop,
    //                         remark_en: route.routeRemarkE,
    //                         remark_tc: route.routeRemarkC,
    //                         multi: null
    //                     });
    //                 }
    //             });
    //             return busRoute;
    //         };

    //         const busRoute = formatAllBusRoute(allBusRoute.filter((b) => b.companyCode !== 'NLB'));
    //         const gmbRoute = formatAllBusRoute(allGmbRoute);

    //         let routes = busRoute.concat(gmbRoute);
    //         routes.sort((a, b) => a.route.localeCompare(b.route));

    //         setFullBusRoutes(routes);
    //         setBusRoutes(routes);
    //     }
    // }, [allBusRoute, allGmbRoute]);

    useEffect(() => {
        setDataProvider(
            new DataProvider((r1, r2) => {
                return r1 !== r2;
            }).cloneWithRows(busRoutes)
        );
    }, [busRoutes]);

    useEffect(() => {
        if (searchPhrase == '') {
            setBusRoutes(fullBusRoutes);
        } else {
            const searchedRoute = fullBusRoutes.filter((bus) => bus.route.includes(searchPhrase.toUpperCase()));
            setBusRoutes(searchedRoute);
        }
    }, [searchPhrase]);

    // useEffect(() => {
    //     dispatch(fetch_kmb_route_stop({}));
    //     dispatch(fetch_all_bus_route({}));
    //     dispatch(fetch_gmb({}));
    // }, []);

    return (
        <View style={styles.container}>
            <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} clicked={clicked} setClicked={setClicked} />
            {dataProvider.getSize() > 0 ? (
                <RecyclerListView style={styles.list} dataProvider={dataProvider} layoutProvider={layoutProvider} rowRenderer={renderItem} />
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#000000" />
                    {/* <View style={styles.progressBar}>
											<ProgressBar progress={0.5} color="#49B5F2" />
										</View> */}
                </View>
            )}
        </View>
    );
};

export default RouteScreen;

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
