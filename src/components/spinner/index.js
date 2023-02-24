import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

const Spinner = () => {
    return (
        <>
            <View style={styles.container}></View>
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </>
    );
};

export default Spinner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        opacity: 0.3,
        zIndex: 10
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
    }
});
