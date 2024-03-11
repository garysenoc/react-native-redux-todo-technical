import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Button,
  Modal,
  Portal,
  Text,
  Appbar,
  TextInput,
} from 'react-native-paper';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TodoList from '../../src/components/TodoList';

import {useSelector, useDispatch} from 'react-redux';
import {
  addTodo,
  deleteTodo,
  sortNameAscending,
  sortNameDescending,
  sortPriorityAscending,
  sortPriorityDescending,
  updateComplete,
  updateTodo,
} from '../../redux/action';

export default function App({navigation, route}): React.JSX.Element {
  const {user} = route?.params;
  const isDarkMode = useColorScheme() === 'dark';

  const [task, setTask] = useState<string>('');
  const [priority, setPriority] = useState<number>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
    flex: 1,
  };
  //   const todoList = useSelector(state => state.todos);
  const todoList = useSelector(state =>
    state.todos.filter(todo => todo.user === user),
  );

  const countCompletedTodos = () => {
    const completedTodos = todoList.filter(todo => todo.complete);
    return completedTodos.length;
  };
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(task, priority, user));
    console.log(todoList);
    // hideModal();
  };

  const [visible, setVisible] = useState(false);
  const [visibleUpdateModal, setVisibleUpdateModal] = React.useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [todoId, setTodoId] = useState('');

  const showModal = () => setVisible(true);

  const hideModal = () => {
    setVisible(false);
    setTask('');
    setPriority(undefined);
  };

  const showUpdateModal = (task: any, priority: any) => {
    setVisibleUpdateModal(true);
    setTask(task);
    setPriority(priority);
  };
  const hideUpdateModal = () => setVisibleUpdateModal(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    alignSelf: 'center',
  };

  const priorityList = [
    {
      label: 'High',
      value: '3',
    },
    {
      label: 'Medium',
      value: '2',
    },
    {
      label: 'Low',
      value: '1',
    },
  ];

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Appbar.Header>
        <Appbar.Content title="My Todo" />
        <Button onPress={() => navigation.navigate('Login')}>Log out </Button>
      </Appbar.Header>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text variant="titleMedium">Add Task</Text>
          <TextInput
            style={{width: '80%'}}
            multiline
            label="Add Task"
            value={task}
            // onChange={event => setTask(event.nativeEvent.target.value)}
            onChangeText={value => setTask(value)}
          />
          <View style={{width: '80%'}}>
            <DropDown
              label={'Set Priority'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={priority}
              setValue={setPriority}
              list={priorityList}
            />
          </View>

          <Button
            mode="outlined"
            style={{marginTop: '5%', width: '80%'}}
            onPress={handleAddTodo}>
            Add Task
          </Button>

          <Button
            mode="contained"
            style={{marginTop: '5%', width: '80%'}}
            onPress={() => {
              hideModal();
            }}>
            Cancel
          </Button>
        </Modal>
      </Portal>

      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Button
          mode="elevated"
          onPress={showModal}
          buttonColor="#316FF6"
          style={{width: '40%'}}>
          <Text style={{fontSize: 20, color: 'white'}}>Add Todo</Text>
        </Button>
        <View>
          <Text>Total Task: {todoList.length}</Text>
          <Text>Completed Task: {countCompletedTodos()}</Text>
        </View>
      </View>
      <View style={{alignItems: 'left', marginLeft: '10%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>Sort By Priority: </Text>
          <Button onPress={() => dispatch(sortPriorityDescending())}>
            <Text>High to Low</Text>
          </Button>
          <Button onPress={() => dispatch(sortPriorityAscending())}>
            <Text>Low to High</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>Sort By Name: </Text>
          <Button onPress={() => dispatch(sortNameAscending())}>
            <Text>A to Z</Text>
          </Button>
          <Button onPress={() => dispatch(sortNameDescending())}>
            <Text>Z to A</Text>
          </Button>
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle.backgroundColor}>
        <View>
          {todoList?.map((todo: any) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Portal>
                <Modal
                  visible={visibleUpdateModal}
                  onDismiss={hideUpdateModal}
                  contentContainerStyle={containerStyle}>
                  <Text variant="titleMedium">Update Task</Text>
                  <TextInput
                    style={{width: '80%'}}
                    multiline
                    label="Update Task"
                    value={task}
                    onChangeText={value => setTask(value)}
                  />
                  <View style={{width: '80%'}}>
                    <DropDown
                      label={'Set Priority'}
                      mode={'outlined'}
                      visible={showDropDown}
                      showDropDown={() => setShowDropDown(true)}
                      onDismiss={() => setShowDropDown(false)}
                      value={priority}
                      setValue={setPriority}
                      list={priorityList}
                    />
                  </View>

                  <Button
                    mode="outlined"
                    style={{marginTop: '5%', width: '80%'}}
                    onPress={() => {
                      dispatch(updateTodo(task, priority, todoId));
                      hideUpdateModal();
                    }}>
                    Update Task
                  </Button>

                  <Button
                    mode="contained"
                    style={{marginTop: '5%', width: '80%'}}
                    onPress={hideUpdateModal}>
                    Cancel
                  </Button>
                </Modal>
              </Portal>
              <View style={{marginTop: 20, width: '95%'}}>
                <TodoList
                  task={todo.task}
                  comments={todo.comments}
                  priority={todo.priority}
                  deleteTodo={() => dispatch(deleteTodo(todo.id))}
                  updateComplete={() => dispatch(updateComplete(todo.id))}
                  complete={todo.complete}
                  showUpdateModal={() =>
                    showUpdateModal(todo.task, todo.priority)
                  }
                  todoId={todo.id}
                  setTodoId={setTodoId}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
