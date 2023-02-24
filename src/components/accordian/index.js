import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import GetKmbEtaByStop from '../../services/GetKmbEtaByStop';
import GetCityAndNwfbEta from '../../services/GetCityAndNwfbEta';
import GetCityAndNwfbStopListByRoute from '../../services/GetCityAndNwfbStopListByRoute';
import GetGmbEta from '../../services/GetGmbEta';
import GetGmbCoordinates from '../../services/GetGmbCoordinates';
import { GetKmbBusStopFromDb } from '../../services/DbProcess';

const Accordian = ({ datas, onClickRouteInfo, onClickMapModal }) => {
    const { index, stop, company, direction, route, gmbRouteId, multi } = datas;

    //console.log(datas);

    const language = useSelector((state) => state.language);
    // const kmbRouteStop = useSelector((state) => state.kmbRouteStop);

    const [expanded, setExpanded] = useState(false);
    const [etaList, setEtaList] = useState([]);
    const [eta, setEta] = useState([]);
    const [stopName, setStopName] = useState('');
    const [coordinate, setCoordinate] = useState({});

    useEffect(() => {
        if (company != 'GMB') {
            setCoordinate({
                latitude: stop.geometry.coordinates[1],
                longitude: stop.geometry.coordinates[0]
            });
        }
    }, [stop]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }

            const kmbRouteStop = await GetKmbBusStopFromDb();

            if (company === 'KMB' || company === 'LWB') {
                const stopId = kmbRouteStop.filter((s) => s.route == route && s.bound == direction && s.seq == stop.properties.stopSeq)[0].stop;
                const etas = await GetKmbEtaByStop(signal, stopId);
                if (typeof etas !== 'undefined') {
                    setEta(etas.filter((e) => e.dir === direction && e.route === route));
                }
            } else if (company === 'CTB' || company === 'NWFB') {
                const stopIds = await GetCityAndNwfbStopListByRoute(signal, company, route, direction);
                if (typeof stopIds !== 'undefined') {
                    const stopId = stopIds.filter((s) => s.route == route && s.seq == stop.properties.stopSeq)[0].stop;

                    const etas = await GetCityAndNwfbEta(signal, company, route, stopId);
                    if (typeof etas !== 'undefined') {
                        setEta(etas.filter((e) => e.dir === direction && e.route === route));
                    }
                }
            } else if (company === 'GMB') {
                const etas = await GetGmbEta(signal, stop.stop_id);
                const gmbCoordinate = await GetGmbCoordinates(signal, stop.stop_id);
                if (gmbCoordinate) {
                    setCoordinate(gmbCoordinate.coordinates.wgs84);
                }

                if (typeof etas !== 'undefined') {
                    const seq = direction == 'O' ? 1 : 2;
                    const etaData = etas.filter((e) => e.route_id == gmbRouteId && e.route_seq == seq && e.enabled);
                    if (etaData.length > 0) {
                        setEta(etaData[0].eta);
                    }
                }
            }
        })();

        if (language === 'tc') {
            if (multi != null) {
                if (company != 'GMB') {
                    const n = stop.properties.stopNameC.split('/<br>');
                    setStopName(n[multi]);
                }
            } else {
                if (company != 'GMB') {
                    setStopName(stop.properties.stopNameC);
                } else {
                    setStopName(stop.name_tc);
                }
            }
        } else {
            if (multi != null) {
                if (company != 'GMB') {
                    const n = stop.properties.stopNameE.split('/<br>');
                    setStopName(n[multi]);
                }
            } else {
                if (company != 'GMB') {
                    setStopName(stop.properties.stopNameE);
                } else {
                    setStopName(stop.name_en);
                }
            }
        }

        return () => {
            setEta([]);
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (eta.length > 0 && isMounted) {
            const list = [];
            eta.forEach((e) => {
                let duration = -1;
                if (company != 'GMB') {
                    duration = moment.duration(moment(e.eta).diff(moment()));
                    list.push({
                        eta: Math.ceil(duration.asMinutes()) > 0 ? Math.ceil(duration.asMinutes()) : 0,
                        rmk_tc: e.rmk_tc,
                        rmk_sc: e.rmk_sc,
                        rmk_en: e.rmk_en
                    });
                } else {
                    duration = moment.duration(moment(e.timestamp).diff(moment()));
                    list.push({
                        eta: Math.ceil(duration.asMinutes()) > 0 ? Math.ceil(duration.asMinutes()) : 0,
                        rmk_tc: e.remarks_tc,
                        rmk_sc: e.remarks_sc,
                        rmk_en: e.remarks_en
                    });
                }
            });
            setEtaList(list);
        }

        return () => {
            isMounted = false;
        };
    }, [eta]);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
        onClickRouteInfo(index - 1);
    };

    return (
        <View>
            <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
                <View style={styles.index}>
                    <Text style={styles.indexText}>{index}</Text>
                </View>
                <Text style={[styles.title]}>{stopName}</Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#a9a9a9'} />
            </TouchableOpacity>
            <View style={styles.parentHr} />
            {expanded ? (
                <View style={{ height: 145 }}>
                    {/* <View style={styles.mapWrapper}>
                        <Icon style={{ marginRight: 20 }} name={'pin-drop'} size={40} color={'#757575'} onPress={() => onClickMapModal(coordinate)} />
                    </View> */}
                    {etaList.length > 0 ? (
                        etaList.map((d, i) => {
                            return (
                                <View style={styles.etaWrapper} key={`time_${i}`}>
                                    <Text style={[styles.font, styles.itemInActive, styles.etaText]}>
                                        {d.eta} {language === 'tc' ? '分鐘' : 'minutes'}
                                    </Text>
                                    {d.rmk_tc != null && d.rmk_en != null && d.rmk_tc != '' && d.rmk_en != '' ? (
                                        <Text style={[styles.itemInActive, styles.etaText, styles.etaRmk]}>{language === 'tc' ? d.rmk_tc : d.rmk_en}</Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                    )}
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

export default Accordian;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height: 54,
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 12
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#757575'
    },
    index: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#cccccc'
    },
    indexText: {
        color: '#878787',
        fontSize: 14,
        fontWeight: 'bold'
    },
    itemActive: {
        fontSize: 12,
        color: 'green'
    },
    itemInActive: {
        fontSize: 17,
        color: '#a9a9a9'
    },
    btnActive: {
        borderColor: 'green'
    },
    btnInActive: {
        borderColor: '#a9a9a9'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: '#f6f6f6'
    },
    childRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f6f6f6'
    },
    parentHr: {
        height: 1,
        color: 'white',
        width: '100%'
    },
    childHr: {
        height: 1,
        backgroundColor: '#d3d3d3',
        width: '100%'
    },
    colorActive: {
        borderColor: 'green'
    },
    colorInActive: {
        borderColor: '#a9a9a9'
    },
    etaWrapper: {
        textAlign: 'right',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    etaText: {
        textAlign: 'right',
        padding: 10,
        color: '#757575'
    },
    etaRmk: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#263238',
        color: 'white',
        fontSize: 10
    },
    mapWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        padding: 10
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        padding: 10
    }
});
