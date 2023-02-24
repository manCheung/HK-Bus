import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BusCard = ({ datas, onClickBusRoute }) => {
    const language = useSelector((state) => state.language);

    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={() => onClickBusRoute({ routes: datas })}>
            <View style={styles.busNumberWrapper}>
                <Text style={styles.busNumber}>{datas.route}</Text>
            </View>
            <View style={styles.busInfoWrapper}>
                {/* <Text numberOfLines={1} ellipsizeMode="tail" style={styles.currentDestination}>
                    {datas.company} {datas.routeId}
                </Text> */}
                {datas.remark_tc != '' && datas.remark_en != '' ? (
                    <View style={styles.remarkWrapper}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.currentDestination, styles.remark]}>
                            {language === 'tc' ? datas.remark_tc : datas.remark_en}
                        </Text>
                    </View>
                ) : (
                    <></>
                )}
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.currentDestination}>
                    {language === 'tc' ? datas.orig_tc : datas.orig_en}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.otherDestination}>
                    {language === 'tc' ? datas.dest_tc : datas.dest_en}
                </Text>
            </View>
            <View style={styles.comapnyWrapper}>
                <Icon
                    name={datas.company == 'GMB' ? 'airport-shuttle' : 'directions-bus'}
                    size={30}
                    color={
                        datas.company == 'KMB'
                            ? '#e51e32'
                            : datas.company == 'CTB'
                            ? '#0563ad'
                            : datas.company == 'NLB'
                            ? '#00897b'
                            : datas.company == 'GMB'
                            ? '#2E9127'
                            : datas.company == 'NWFB'
                            ? '#f47e35'
                            : datas.company == 'LWB'
                            ? '#fd4f00'
                            : '#a9a9a9'
                    }
                />
            </View>
        </TouchableOpacity>
    );
};

export default BusCard;

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        flex: 1
    },
    busNumberWrapper: {
        padding: 10,
        width: '20%',
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: '#7bbbda'
    },
    busNumber: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    busInfoWrapper: {
        width: '60%',
        marginLeft: 20
    },
    busBrand: {
        resizeMode: 'contain',
        width: 60
    },
    currentDestination: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        lineHeight: 20
    },
    otherDestination: {
        fontWeight: 'bold',
        color: '#70757a',
        fontSize: 15,
        lineHeight: 20
    },
    remarkWrapper: {
        borderRadius: 10,
        flexDirection: 'row'
    },
    remark: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#263238',
        color: 'white'
    },
    comapnyWrapper: {
        padding: 10
    }
});
