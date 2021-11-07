import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import styled from 'styled-components';
import {Colors} from '../../utils/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import TodoForm from '../TodoForm/TodoForm';
import {todo} from '../../types/interfaces';

interface propTypes {
  todo: todo;
  editTodo: any;
  deleteTodo: any;
}

const Card = (props: propTypes) => {
  const bottomSheet = useRef<any>(null);
  const [activeColor, setActiveColor] = useState<string>(props?.todo?.color);
  const [title, setTitle] = useState(props.todo.title);
  const [body, setBody] = useState(props.todo.body);
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
          props.editTodo({
            ...props.todo,
            title,
            body,
            color: activeColor,
          });
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
                props.deleteTodo(props.todo.id);
              },
            }}
          />
        </KeyboardAvoidingView>
      </RBSheet>
      <CardWrapper
        color={activeColor}
        onPress={() => {
          bottomSheet.current.open();
        }}>
        <Heading numberOfLines={3}>{title}</Heading>
        <Date>{props.todo.date}</Date>
      </CardWrapper>
    </>
  );
};

export default Card;

const CardWrapper = styled(TouchableOpacity)<{color: string}>`
  border-radius: 5px;
  background-color: ${props => (props.color ? props.color : 'dodgerblue')};
  height: 200px;
  flex: 1;
  /* width: 100%; */
  padding: 20px;
  margin-vertical: 5px;
  margin-horizontal: 5px;
  justify-content: space-between;
`;

const Heading = styled(Text)`
  color: ${Colors.white};
  font-size: 30px;
  font-weight: 700;
`;

const Date = styled(Text)`
  color: ${Colors.white};
`;
