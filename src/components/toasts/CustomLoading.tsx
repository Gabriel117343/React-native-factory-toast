import React from 'react';
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
function CustomLoading({ color = '#FFF', size = 28 }) {
  // verify if the platform is android or ios to convert the size
  const sizeConvert =
    Platform.OS === 'android' ? size : size > 25 ? 'large' : 'small';
  return <ActivityIndicator size={sizeConvert} color={color} />;
}

export default CustomLoading;
