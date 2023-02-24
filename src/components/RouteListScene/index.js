import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import Accordian from '../accordian';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import moment from 'moment';
import GetGmbRouteByRegionAndRouteCode from '../../services/GetGmbRouteByRegionAndRouteCode';
import GetGmbRouteStopByRouteIdAndSeq from '../../services/GetGmbRouteStopByRouteIdAndSeq';

const ViewTypes = {
    EXPAND: 0,
    EXPANDED: 1
};

const RouteListScene = ({ params, direction, onClickMapModal }) => {
    const screenWidth = Dimensions.get('window').width;

    const { company, stops, route, district, multi } = params;

    const language = useSelector((state) => state.language);

    const [expandedIndexList, setExpandedIndexList] = useState([]);
    const [routeInfo, setRouteInfo] = useState([]);
    const [gmbRouteId, setGmbRouteId] = useState('');
    const [routeNotEta, setRouteNotEta] = useState(false);
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        }).cloneWithRows([])
    );
    const [layoutProvider, setLayoutProvider] = useState(
        new LayoutProvider(
            (index) => {
                if (expandedIndexList.includes(index)) {
                    return ViewTypes.EXPANDED;
                } else {
                    return ViewTypes.EXPAND;
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.EXPAND:
                        dim.width = screenWidth;
                        dim.height = 65;
                        break;
                    case ViewTypes.EXPANDED:
                        dim.width = screenWidth;
                        dim.height = 210;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        )
    );

    const renderItem = (type, data) => <Accordian datas={data} onClickRouteInfo={onClickRouteInfo} onClickMapModal={onClickMapModal} />;

    const onClickRouteInfo = (index) => {
        let temp = [...expandedIndexList];
        if (temp.includes(index)) {
            temp = temp.filter((item) => item !== index);
        } else {
            temp.push(index);
        }
        setExpandedIndexList(temp);
    };

    useEffect(() => {
        setLayoutProvider(
            new LayoutProvider(
                (index) => {
                    if (expandedIndexList.includes(index)) {
                        return ViewTypes.EXPANDED;
                    } else {
                        return ViewTypes.EXPAND;
                    }
                },
                (type, dim) => {
                    switch (type) {
                        case ViewTypes.EXPAND:
                            dim.width = screenWidth;
                            dim.height = 65;
                            break;
                        case ViewTypes.EXPANDED:
                            dim.width = screenWidth;
                            dim.height = 210;
                            break;
                        default:
                            dim.width = 0;
                            dim.height = 0;
                    }
                }
            )
        );
    }, [expandedIndexList]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (company != 'GMB') {
            if (direction === 'O') {
                setRouteInfo(JSON.parse(stops)[0].features);
            } else {
                setRouteInfo(JSON.parse(stops)[1].features);
            }
        } else {
            (async () => {
                const routeIdRes = await GetGmbRouteByRegionAndRouteCode(signal, district, route);

                if (typeof routeIdRes != 'undefined' && routeIdRes.length > 0) {
                    const routeId = routeIdRes[0].route_id;
                    setGmbRouteId(routeId);

                    const routes = await GetGmbRouteStopByRouteIdAndSeq(signal, routeId, direction);
                    if (routes) {
                        setRouteInfo(routes);
                    }
                } else {
                    setRouteInfo([]);
                    setRouteNotEta(true);
                    // no data
                }
            })();
        }

        return () => controller.abort();
    }, []);

    useEffect(() => {
        let didCancel = false;

        async function generateRouteStopInfo() {
            let routeStopInfo = [];
            let index = 0;

            for (const i in routeInfo) {
                index = index + 1;
                routeStopInfo.push({
                    stop: routeInfo[i],
                    index: index,
                    company,
                    direction,
                    route,
                    district,
                    gmbRouteId: gmbRouteId,
                    multi
                });

                if (!didCancel) {
                    setDataProvider(
                        new DataProvider((r1, r2) => {
                            return r1 !== r2;
                        }).cloneWithRows(routeStopInfo)
                    );
                }
            }
        }

        generateRouteStopInfo();

        return () => {
            didCancel = true;
        };
    }, [routeInfo]);

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {language === 'tc' ? `最後更新時間: ${moment().format('YYYY-MM-DD hh:mm:ss')}` : `Last update time: ${moment().format('YYYY-MM-DD hh:mm:ss')}`}
                </Text>
            </View>
            {routeNotEta ? (
                <View style={styles.routeNotEtaWrapper}>
                    <Text>{language === 'tc' ? '此路線暫時未有提供實時到站' : 'Estimated Time of Arrival is not available for this route currently'}</Text>
                </View>
            ) : dataProvider.getSize() > 0 ? (
                <RecyclerListView canChangeSize={true} style={styles.list} dataProvider={dataProvider} layoutProvider={layoutProvider} rowRenderer={renderItem} />
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            )}
        </View>
    );
};

export default RouteListScene;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignContent: 'center',
        justifyContent: 'center',
        zIndex: 11
    },
    routeNotEtaWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});
