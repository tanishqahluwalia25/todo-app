import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {Colors} from './colors';

export default (WrappedComponent: React.FC) => {
  const hocComponent = ({...props}) => (
    <SafeAreaView style={{backgroundColor: Colors.white, minHeight: '100%'}}>
      <WrappedComponent {...props} />
    </SafeAreaView>
  );

  hocComponent.propTypes = {};

  return hocComponent;
};
