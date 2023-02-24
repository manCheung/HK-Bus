import React, { useRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Modal, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateLanguage } from '../services/DbProcess';
import { change_language } from '../redux/actions';
import SettingButton from '../components/settingButton';
import { Modalize } from 'react-native-modalize';
import { Host, Portal } from 'react-native-portalize';
import * as Clipboard from 'expo-clipboard';

const SettingScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const modalizeRef = useRef(null);

    const language = useSelector((state) => state.language);

    const onChangeLanguage = () => {
        const lang = language == 'tc' ? 'en' : 'tc';
        UpdateLanguage(lang);
        dispatch(change_language(lang));
    };

    const onOpenContactUs = () => {
        modalizeRef.current?.open();
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('hkbuseta.contact@gmail.com');
        modalizeRef.current?.close();
    };

    return (
        <View style={styles.container}>
            <Portal>
                <Modalize style={{ flex: 1 }} modalHeight={300} ref={modalizeRef}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.topic}>{language == 'tc' ? '聯絡我們' : 'Contact Us'}</Text>
                        <Text style={styles.contact}>{language == 'tc' ? '點擊複製我們的聯繫郵箱' : 'Click to Copy Our Contact Email'}</Text>
                        <Text style={styles.contactEmail}>hkbuseta.contact@gmail.com</Text>
                        <Button title="Copy Contact Email" onPress={copyToClipboard} />
                    </View>
                </Modalize>
            </Portal>

            <TouchableOpacity style={styles.button} onPress={onChangeLanguage}>
                <SettingButton icon={'translate'} text={language == 'tc' ? 'Change To English' : '換成繁體中文'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onOpenContactUs()}>
                <SettingButton icon={'mail'} text={language == 'tc' ? '聯絡我們' : 'Contact Us'} />
            </TouchableOpacity>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    button: {
        backgroundColor: '#A3A3A3',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10
    },
    modalWrapper: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    topic: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10
    }
});
