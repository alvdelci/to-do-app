import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';
import CheckList from './src/components/CheckList';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);
  const [input, setInput] = useState('');
  const [checkedTasks, setCheckedTasks] = useState([]);

  //Buscando todas as tarefas ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  //Salvando caso tenha alguma alteraçaão nas tarefas
  useEffect(() => {

    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks()

  }, [task]);

  //Salvando tarefas concluídas
  useEffect(() => {

    async function saveCheckedTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(checkedTasks));
    }

    saveCheckedTasks()

  }, [checkedTasks]);

  function handleAdd() {
    if (input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
    const removed = task.filter(r => r.key === data.key);
    setCheckedTasks(removed);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content"></StatusBar>

      {/** Botão visualizar tarefas concluídas */}
      <AnimatedBtn
        style={styles.checked}
        useNativeDriver
        animation="bounceIn"
        duration={1500}
        onPress={() => setCheckOpen(true)}
      >
        <Ionicons name="md-checkmark-circle" size={25} color="#fff" />
      </AnimatedBtn>


      {/** Tela inicial de exibição das tasks */}
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>
      {/**Lista de Tarefas*/}
      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />

      {/** Tela de criação de novas tasks */}
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Adicionar Tarefa</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp">
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              placeholder="Ex: Estudar algo novo."
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text styles={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      {/** Tela de exibição de tarefas concluídas */}

      <Modal animationType="slide" transparent={false} visible={checkOpen}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setCheckOpen(false)}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Tarefas Concluídas</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp">
            <View style={styles.content}>
              <Text style={styles.title}>Estamos a todo vapor!!!</Text>
            </View>
            {/**Lista de Tarefas concluídas*/}
            <FlatList
              marginHorizontal={10}
              showsHorizontalScrollIndicator={false}
              data={checkedTasks}
              keyExtractor={(item) => String(item.key)}
              renderItem={({ item }) => <CheckList data={item} />}
            />
          </Animatable.View>
        </SafeAreaView>
      </Modal>


      <AnimatedBtn
        style={styles.fab}
        useNativeDriver
        animation="bounceIn"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" size={25} color="#fff" />
      </AnimatedBtn>

    </SafeAreaView>
  );
}
//Styles
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
    width: 45,
    height: 45,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 10,
    bottom: 10,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },

  checked: {
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    left: 10,
    bottom: 10,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },

  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#fff',
    marginLeft: 65
  },

  modalBody: {
    marginTop: 15
  },

  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 80,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5
  },

  handleAdd: {
    backgroundColor: '#fff',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },

  handleAddText: {
    fontSize: 20,
  }
});
