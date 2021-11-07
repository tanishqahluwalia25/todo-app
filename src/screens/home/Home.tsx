import React, {useRef, useState} from 'react';
import {View, Text, FlatList, KeyboardAvoidingView, Alert} from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Card from '../../components/card/Card';
import {Colors} from '../../utils/colors';
import withSafeArea from '../../utils/withSafeArea';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useEffect} from 'react';
import TodoForm from '../../components/TodoForm/TodoForm';
import {todo} from '../../types/interfaces';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const Home = () => {
  const [todos, setTodos] = useState<any>([]);

  const getTodos = async () => {
    try {
      const value = await AsyncStorage.getItem('@todos');

      if (value !== null) {
        let temp = JSON.parse(value);
        setTodos([...temp]);
      } else {
        setTodos([]);
      }
    } catch (e: any) {
      showMessage({
        message: 'There was an error fetching the todos',
        type: 'danger',
        description: e?.message,
      });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const bottomSheet = useRef<any>(null);
  const [activeColor, setActiveColor] = useState<string>(Colors.blue);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addTodo = async (todo: todo) => {
    const newTodos = [todo, ...todos];

    if (todo.title === '') {
      showMessage({
        message: 'Todo not saved',
        type: 'danger',
        description: 'Todos must have a title',
      });
      return;
    }
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(newTodos));
      setTodos([...newTodos]);
      showMessage({
        message: 'New Todo added',
        type: 'success',
      });
    } catch (e: any) {
      showMessage({
        message: 'There was an error adding this todo',
        type: 'danger',
        description: e?.message,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    const newTodos = todos.filter((item: todo) => item.id !== id);
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(newTodos));
      setTodos([...newTodos]);
      showMessage({
        message: 'Todo deleted',
        type: 'danger',
      });
    } catch (e) {
      showMessage({
        message: 'There was an error deleting this todo',
        type: 'danger',
      });
    }
  };

  const editTodo = async (todo: todo) => {
    if (todo.title === '') {
      showMessage({
        message: 'Todo deleted',
        type: 'danger',
        description: 'Todos without a title will be deleted',
      });
      deleteTodo(todo.id);
      const newTodos = todos.filter((item: todo) => item.id !== todo.id);
      setTodos([...newTodos]);
      return;
    }

    const newTodos = todos.map((item: todo) => {
      if (todo.id === item.id) {
        return todo;
      } else {
        return item;
      }
    });

    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(newTodos));
      setTodos([...newTodos]);
      showMessage({
        message: 'Todo saved',
        type: 'success',
      });
    } catch (e: any) {
      showMessage({
        message: 'There was an error editing this todo',
        type: 'danger',
        description: e?.message,
      });
    }
  };

  return (
    <>
      <RBSheet
        ref={bottomSheet}
        openDuration={250}
        height={100}
        animationType="slide"
        closeOnPressBack
        closeOnDragDown
        customStyles={{
          container: {
            backgroundColor: 'transparent',
            height: '90%',
          },
        }}
        onClose={() => {
          addTodo({
            title,
            body,
            color: activeColor,
            date: new Date().toLocaleDateString(),
            id: uuid.v1() as string,
          });

          setTitle('');
          setBody('');
          setActiveColor(Colors.blue);
        }}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <TodoForm
            {...{
              title,
              setTitle,
              body,
              setBody,
              color: activeColor,
              setColor: setActiveColor,
              deleteTodo: () => {
                bottomSheet.current.close();
              },
            }}
          />
        </KeyboardAvoidingView>
      </RBSheet>
      <Wrapper>
        <Header>
          <Heading>Todos</Heading>
          <PrimaryButton
            title={'+'}
            onPress={() => {
              bottomSheet.current.open();
            }}
          />
        </Header>

        <FlatList
          ListEmptyComponent={
            <>
              <Text
                style={{
                  fontSize: 20,
                  padding: 20,
                  fontWeight: '700',
                  textAlign: 'center',
                  color: Colors.gray,
                }}>
                Add a todo by clicking on the + icon
              </Text>
            </>
          }
          contentContainerStyle={{
            paddingBottom: 200,
            paddingHorizontal: 10,
          }}
          data={todos}
          alwaysBounceVertical
          bounces
          renderItem={({item}) => (
            <Card todo={item} editTodo={editTodo} deleteTodo={deleteTodo} />
          )}
          numColumns={2}
        />
      </Wrapper>
    </>
  );
};

export default withSafeArea(Home);

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
const Heading = styled(Text)`
  font-weight: 700;
  font-size: 50px;
  color: ${Colors.black};
`;

const Wrapper = styled(View)`
  /* padding: 20px; */
  background-color: ${Colors.white};
`;
