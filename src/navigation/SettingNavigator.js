import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../screens/SettingScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const SettingNavigator = () => {
    const language = useSelector((state) => state.language);

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    tabBarLabel: 'Setting',
                    headerTitle: language == 'tc' ? '設定' : 'Setting',
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
                name="SettingList"
                component={SettingScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingNavigator;
