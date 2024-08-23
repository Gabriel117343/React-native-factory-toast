import React from 'react';
import {
  withTiming,
  withRepeat,
  Easing,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Animated, StyleSheet, View } from 'react-native';
export const CustomActivityIndicator = ({ size = 30, color = 'white' }) => {
  const spinValue = useSharedValue(0);

  spinValue.value = withRepeat(
    withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    }),
    -1
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinValue.value * 360}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          animatedStyle,
          {
            width: size,
            height: size,
            borderWidth: 2,
            borderColor: color,
            borderTopColor: 'transparent',
            opacity: 1,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.spinner,
          animatedStyle,
          {
            width: size,
            height: size,
            borderWidth: 2,
            borderColor: color,
            borderTopColor: 'transparent',
            opacity: 0.7,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.spinner,
          animatedStyle,
          {
            width: size,
            height: size,
            borderWidth: 2,
            borderColor: color,
            borderTopColor: 'transparent',
            opacity: 0.4,
            transform: [{ rotate: '90deg' }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    borderRadius: 50,
  },
});
