import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from '../../navigation/MainStackNavigator';
import Spinner from '../spinner';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Host } from 'react-native-portalize';
import { getLocalData } from '../../services/LocalStore';
import { initLoading } from '../../services/InitLoading';
import moment from 'moment';
import { GetSettingFromDb, UpdateSyncTime } from '../../services/DbProcess';
import { change_language } from '../../redux/actions';

import '../../i18n/i18n.config';

const AppWrapper = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [appIsReady, setAppIsReady] = useState(false);

    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();

                // await Font.loadAsync(Entypo.font);
                //await new Promise((resolve) => setTimeout(resolve, 3000));

                const setting = await GetSettingFromDb();
                if (setting.length > 0) {
                    const language = setting[0].value;
                    const syncTime = setting[1].value;

                    dispatch(change_language(language));

                    if (moment().isAfter(moment(syncTime, 'YYYY-MM-DD'))) {
                        await initLoading(false);
                        await UpdateSyncTime(moment().add(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD').toString());
                    }
                } else {
                    await initLoading(true);
                }
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <SafeAreaProvider>
                <StatusBar style="light" />
                <NavigationContainer>
                    <Host>
                        <MainStackNavigator />
                    </Host>
                </NavigationContainer>
                {isLoading ? <Spinner /> : <></>}
            </SafeAreaProvider>
        </View>
    );
};

export default AppWrapper;
