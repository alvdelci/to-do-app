import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function CheckList({ data }) {
    return (
        <Animatable.View
            style={styles.container}
            animation="bounceIn"
            useNativeDriver
        >
            <TouchableOpacity >
                <Ionicons name="md-checkmark-circle" size={20} color="#16c144" />
            </TouchableOpacity>

            <View>
                <Text style={styles.task}> {data.task} </Text>
            </View>
        </Animatable.View>
    );
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 7,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3,
        }
    },
    task: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    }
});