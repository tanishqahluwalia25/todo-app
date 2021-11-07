import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Colors} from '../../utils/colors';

interface propTypes {
  title: string;
  onPress: Function;
}

const PrimaryButton = ({title, onPress}: propTypes) => {
  return (
    <ButtonWrapper onPress={() => onPress()}>
      <IconText>{title}</IconText>
    </ButtonWrapper>
  );
};

export default PrimaryButton;

const ButtonWrapper = styled(TouchableOpacity)`
  border-radius: 5px;
  background-color: white;
  padding: 10px;
  /* elevation: 2; */
`;

const IconText = styled(Text)`
  color: ${Colors.black};
  font-weight: 700;
  font-size: 40px;
  text-align: center;
`;
