import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList({ data, handleDelete }) {

    const [posx, setPosx] = useState(new Animated.Value(0));

    // useEffect(() => {
    //     Animated.spring(posx, {
    //         useNativeDriver: true,
    //         toValue: 0,
    //         duration: 1000,
    //     }).start()
    // }, [])

    const click = useCallback(() => {
        Animated.parallel(posx, {
            useNativeDriver: true,
            toValue: 500,
            duration: 1000,
        }).start()
    }, [])

    return (
        <Animated.View onTouchStart={click}
            style={{ 
                transform: [{ translateX: posx }],
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
            }}
            animation="bounceIn"
            useNativeDriver
        >
            <TouchableOpacity onPress={() => handleDelete(data)}>
                <Ionicons name="checkmark-circle" size={20} color="#0094ff" />
            </TouchableOpacity>

            <View>
                <Text style={styles.task}> {data.task} </Text>
            </View>
        </Animated.View>
    );
}

//Styles
const styles = StyleSheet.create({
    task: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    }
});