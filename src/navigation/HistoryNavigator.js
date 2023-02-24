import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from '../screens/HistoryScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const HistoryNavigator = () => {
    const language = useSelector((state) => state.language);
    const currentRoute = useSelector((state) => state.currentRoute);

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    tabBarLabel: 'History',
                    headerTitle: language == 'tc' ? '記錄' : 'History',
                    headerStyle: {
                        backgroundColor: '#7bbbda'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
                name="HistoryList"
                component={HistoryScreen}
            />
        </Stack.Navigator>
    );
};

export default HistoryNavigator;
