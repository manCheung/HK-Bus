import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RouteScreen from '../screens/RouteScreen';
import RouteInfoScreen from '../screens/RouteInfoScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { InsertFavourite, IsRouteExist, DeleteRoute } from '../services/DbProcess';

const Stack = createStackNavigator();

const RouteNavigator = () => {
    const language = useSelector((state) => state.language);
    const currentRoute = useSelector((state) => state.currentRoute);

    const [favouriteId, setFavouriteId] = useState(-1);

    useEffect(() => {
        (async () => {
            if (Object.keys(currentRoute).length > 0) {
                const exist = await IsRouteExist('favourite', currentRoute.route.routes.routeId, currentRoute.route.routes.company);
                if (exist.length > 0) {
                    setFavouriteId(exist[0].id);
                } else {
                    setFavouriteId(-1);
                }
            }
        })();
    }, [currentRoute]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    tabBarLabel: 'Route',
                    headerTitle: language == 'tc' ? '路線' : 'Route',
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
                name="RouteList"
                component={RouteScreen}
            />
            <Stack.Screen
                options={{
                    tabBarLabel: 'Route',
                    headerTitle: language === 'tc' ? `${currentRoute.companyC} - ${currentRoute.routeNo}` : `${currentRoute.companyE} - ${currentRoute.routeNo}`,
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerRight: () => (
                        <Icon
                            style={{ marginRight: 20 }}
                            name={favouriteId !== -1 ? 'favorite' : 'favorite-border'}
                            size={20}
                            color={'white'}
                            onPress={() => {
                                if (favouriteId == -1) {
                                    InsertFavourite(currentRoute.route.routes);
                                } else {
                                    DeleteRoute('favourite', favouriteId);
                                }
                            }}
                        /> // favorite icon for fill
                    )
                }}
                name="RouteInfo"
                component={RouteInfoScreen}
            />
        </Stack.Navigator>
    );
};

export default RouteNavigator;
