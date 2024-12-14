import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const LoaderComponent = () => {
  return (
    <>
      <ActivityIndicator
        size={100}
        color="#6b53ac"
        style={{
          position: 'absolute',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
};

export default LoaderComponent;
