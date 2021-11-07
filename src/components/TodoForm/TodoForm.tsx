import React from 'react';
import {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from '../../utils/colors';
const colors: string[] = [
  Colors.blue,
  Colors.darkBlue,
  Colors.green,
  Colors.yellow,
  Colors.peach,
  Colors.navy,
];

interface propTypes {
  title: string;
  setTitle: Function;
  body: string;
  setBody: Function;
  color: string;
  setColor: Function;
  deleteTodo: Function;
}

const TodoForm = (props: propTypes) => {
  return (
    <View style={[{borderColor: props.color}, styles.container]}>
      <ScrollView>
        <TextInput
          placeholder="Add title"
          placeholderTextColor={'gray'}
          style={styles.titleInput}
          value={props.title}
          onChangeText={text => props.setTitle(text)}
          multiline
        />
        <TextInput
          placeholderTextColor={'gray'}
          placeholder="Add body"
          style={styles.textInput}
          multiline
          value={props.body}
          onChangeText={text => props.setBody(text)}
        />
      </ScrollView>
      <View style={styles.colorRow}>
        {colors.map((color, index) => {
          return (
            <TouchableOpacity
              onPress={() => props.setColor(color)}
              style={[styles.color, {backgroundColor: color}]}
              key={color + index}
            />
          );
        })}
      </View>
      <Pressable
        onPress={() => {
          props.deleteTodo();
        }}
        style={{
          position: 'absolute',
          right: 15,
          bottom: 15,
          backgroundColor: Colors.white,
          borderRadius: 5,
          // padding: 5,
          // elevation: 10,
        }}>
        <Text style={{color: Colors.white, fontSize: 30}}>🗑️</Text>
      </Pressable>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 10,
  },
  titleInput: {
    fontWeight: '700',
    fontSize: 30,
    color: Colors.black,
  },
  textInput: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.black,
    // maxHeight: 200,
  },
  colorRow: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    height: 20,
    width: 30,
    borderRadius: 5,
    marginRight: 15,
  },
});
