import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import RouteNavigator from './RouteNavigator';
import HistoryNavigator from './HistoryNavigator';
import FavouriteNavigator from './FavouriteNavigator';
import SettingNavigator from './SettingNavigator';

const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
    const language = useSelector((state) => state.language);

    return (
        <Tab.Navigator
            initialRouteName="Route"
            screenOptions={{
                tabBarActiveTintColor: '#F9F871',
                tabBarInactiveTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerTitleAlign: 'center',
                headerStyle: {
                    shadowColor: '#000000',
                    shadowOpacity: 0.4,
                    shadowRadius: 1,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    },
                    elevation: 2
                },
                tabBarStyle: {
                    backgroundColor: '#7bbbda'
                },
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Route"
                component={RouteNavigator}
                options={{
                    tabBarLabel: language == 'tc' ? '路線' : 'Route',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="route" color={color} size={size - 5} />,
                    headerTitle: language == 'tc' ? '路線' : 'Route',
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
            />
            <Tab.Screen
                name="History"
                component={HistoryNavigator}
                options={{
                    tabBarLabel: language == 'tc' ? '記錄' : 'History',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="history" color={color} size={size - 5} />,
                    headerTitle: language == 'tc' ? '記錄' : 'History',
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
            />
            <Tab.Screen
                name="Favourite"
                component={FavouriteNavigator}
                options={{
                    tabBarLabel: language == 'tc' ? '最愛' : 'Favourite',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="heart" color={color} size={size - 5} />
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingNavigator}
                options={{
                    tabBarLabel: language == 'tc' ? '設定' : 'Settings',
                    tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size - 5} />
                }}
            />
        </Tab.Navigator>
    );
};

export default MainStackNavigator;
