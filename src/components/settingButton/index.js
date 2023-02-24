import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingButton = ({ icon, text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%' }}>
                    <Icon name={icon} size={25} color={'#ffffff'} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </View>
    );
};

export default SettingButton;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    text: {
        color: 'white',
        fontSize: 18
    },
    buttonWrapper: {
        flexDirection: 'row'
    }
});
