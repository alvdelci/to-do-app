import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  const [task, setTask] = useState([
    { key: 1, task: "Comprar pão" },
    { key: 2, task: "Comprar manteiga" },
    { key: 3, task: "Comprar café" },
    { key: 4, task: "Comprar leite" },
    { key: 5, task: "Comprar torrada" },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content"></StatusBar>

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} />}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView>
          <Text>texto</Text>
        </SafeAreaView>
      </Modal>


      <AnimatedBtn
        style={styles.fab}
        useNativeDriver
        animation="bounceIn"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color="#fff" />
      </AnimatedBtn>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: "#fff"
  },

  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  }
});
