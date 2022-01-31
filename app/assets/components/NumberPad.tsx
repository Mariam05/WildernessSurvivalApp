import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import colours from "../colours";

const numColumns = 3;

export default function NumberPad({ navigation, nextPage }) {
    const data = [
        { key: '0' }, { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: 'DEL' }, { key: '9' }, { key: 'ENTER' },
    ];

    const [value, setValue] = useState("");

    const determineValue = ({ itemClicked }) => {
        if (itemClicked == null) {
            return;
        }
        if (itemClicked.key == 'ENTER') {
            // save to db and navigate to other page.
            navigation.push(nextPage);
        }
        else if (itemClicked.key == 'DEL') {
            setValue(value.substring(0, value.length - 1));
        }
        else {
            setValue(value + itemClicked.key);
        }
    }

    const renderItem = ({ item, index }) => {
        if (item.key == 'ENTER' || item.key == 'DEL') {
            return (
                <TouchableOpacity
                    style={[styles.item, styles.itemSpecial]}
                    onPress={() => { determineValue({ itemClicked: item }); }}
                >
                    <Text style={styles.itemText}>{item.key}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => { determineValue({ itemClicked: item }); }}
            >
                <Text style={styles.itemText}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colours.blue }}>
            <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{value}</Text>
            </View>
            <FlatList
                data={data}
                style={styles.container}
                renderItem={renderItem}
                numColumns={numColumns}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        marginTop: 40,

    },
    item: {
        backgroundColor: colours.yellowBackground,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: 0.75 * (Dimensions.get('window').width) / numColumns, // approximate a square
        borderWidth: 1,

    },
    itemSpecial: {
        backgroundColor: colours.yellowDarker,
    },
    itemText: {
        color: colours.primary,
        fontSize: 25
    },
    valueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 0.15 * (Dimensions.get('window').height),
        backgroundColor: "#CFE7EF",
    },
    valueText: {
        fontSize: 50,
    }
});