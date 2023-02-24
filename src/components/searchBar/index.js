import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
    const language = useSelector((state) => state.language);

    return (
        <View style={styles.container}>
            <View style={styles.searchBar__unclicked}>
                {/* search Icon */}
                <Feather name="search" size={20} color="white" style={{ marginLeft: 1 }} />
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder={language == 'tc' ? '搜索' : 'Search'}
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    placeholderTextColor="white"
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}

                <Entypo
                    name="cross"
                    size={20}
                    color="black"
                    style={{ padding: 1, color: 'white' }}
                    onPress={() => {
                        setSearchPhrase('');
                    }}
                />
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {/* {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    ></Button>
                </View>
            )} */}
        </View>
    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#282828',
        width: '92%'
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#A3A3A3',
        shadowColor: '#DFEEEE',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: '80%',
        color: 'white'
    }
});
