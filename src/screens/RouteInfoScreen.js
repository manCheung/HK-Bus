import React, { useState, useEffect, useRef } from 'react';
import { composeInitialProps } from 'react-i18next';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import { LinearGradient } from 'expo-linear-gradient';
import RouteListScene from '../components/RouteListScene';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const RouteInfoScreen = ({ route, navigation }) => {
    const { params } = route;

    const screenHeight = Dimensions.get('window').height;

    const modalizeRef = useRef(null);

    const language = useSelector((state) => state.language);

    const [coordinate, setCoordinate] = useState({});
    const [tabs, setTabs] = useState({
        index: 0,
        routes: [
            { key: 'outBound', title: language == 'tc' ? `往\n${params.routes.dest_tc}` : `To\n${params.routes.dest_en}` },
            { key: 'inBound', title: language == 'tc' ? `往\n${params.routes.orig_tc}` : `To\n${params.routes.orig_en}` }
        ]
    });

    const renderScene = SceneMap({
        outBound: () => <RouteListScene params={params.routes} direction={'O'} onClickMapModal={onClickMapModal} />,
        inBound: () => <RouteListScene params={params.routes} direction={'I'} onClickMapModal={onClickMapModal} />
    });

    const _handleIndexChange = (index) => setTabs({ ...tabs, index });

    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5))
                    });

                    const colorLeft = ['#72c1d8', '#708cc9'];
                    const colorRight = ['#b07dcc', '#936bde'];

                    return (
                        <TouchableOpacity key={`tab_${i}`} style={styles.tabItem} onPress={() => setTabs({ ...tabs, index: i })}>
                            <LinearGradient style={styles.gradient} colors={i % 2 == 0 ? colorLeft : colorRight}>
                                <Animated.Text style={[{ opacity }, styles.tabItemText]}>{route.title}</Animated.Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const onClickMapModal = (data) => {
        modalizeRef.current?.open();
        setCoordinate({
            latitude: data.latitude,
            longitude: data.longitude
        });
    };

    return (
        <View style={styles.container}>
            <Portal>
                <Modalize handlePosition="inside" modalHeight={screenHeight - 80} style={styles.mapModalWrapper} ref={modalizeRef}>
                    <View>
                        {Object.keys(coordinate).length > 0 ? (
                            <MapView
                                style={styles.mapView}
                                initialRegion={{
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation={true}
                                onBackButtonPress={() => modalizeRef.current?.close()}
                            >
                                <Marker coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }} />
                            </MapView>
                        ) : (
                            <></>
                        )}
                    </View>
                </Modalize>
            </Portal>
            <TabView navigationState={tabs} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={_handleIndexChange} />
        </View>
    );
};

export default RouteInfoScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
        width: '100%',
        borderRadius: 15,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    gradient: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        borderRadius: 15
    },
    tabItemText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
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
    mapModalWrapper: {
        flex: 1,
        backgroundColor: 'yellow',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 16
    },
    mapView: {
        height: Dimensions.get('window').height,
        width: '100%',
        zIndex: 100
    }
});
