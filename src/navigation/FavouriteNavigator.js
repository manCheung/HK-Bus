import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavouriteScreen from '../screens/FavouriteScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const FavouriteNavigator = () => {
    const language = useSelector((state) => state.language);

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    tabBarLabel: 'Favourite',
                    headerTitle: language == 'tc' ? '最愛' : 'Favourite',
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
                name="FavouriteList"
                component={FavouriteScreen}
            />
        </Stack.Navigator>
    );
};

export default FavouriteNavigator;
