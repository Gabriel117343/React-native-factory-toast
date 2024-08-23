import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutLeft,
  FadeOutRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {
  SlideInLeft,
  SlideOutRight,
  BounceIn,
  BounceOut,
} from 'react-native-reanimated'; // esta es una importación adicional

import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';
import { TOAST_CONFIG } from './toastConfig';
import { toast } from '../../store/storeToast';
import { RenderIcon } from './RenderIcon';
export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  position,
  toastStyle = 'primary',
  icon,
  duration, // 3000 ms for default
  progress = true,
  border = true,
  styles, // Object with custom styles
  animationType = 'fade',
  animationInDuration = 500, // Duration for the animation
  animationOutDuration = 500, // Duration for the animation
}) => {
  const progressValue = useSharedValue(0);
  const [defaultAnimation, setDefaultAnimation] = useState(animationType);
  const [animationExitLeft, setAnimationExitLeft] = useState(false);
  const [progressAnimation, setProgressAnimation] = useState(false);
  useEffect(() => {
    // Reestablish the progressValue when the type changes
    progressValue.value = 0;
    // The animation of the progress bar is executed through the progressValue
    progressValue.value = withTiming(115, { duration: duration });
  }, [duration, progressValue, progress, type]);
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progressValue.value,
      [0, 50, 100],
      [0.6, 0.6, 1]
    );
    return {
      width: `${progressValue.value}%`,
      opacity: opacity,
    };
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // detect if the gesture is moving to the left or right
        setDefaultAnimation('fade');
        setProgressAnimation(true);
        // only executes the animation if the gesture is moving to the left or right 50px or more.
        if (gestureState.dx > 50 || gestureState.dx < -50) {
          setTimeout(() => {
            toast.dismiss(id);
            setAnimationExitLeft(gestureState.dx < -50);
          }, 100);
        } else {
          return;
        }
      },
      // aditional logic when the gesture is released
      // onPanResponderRelease: () => {
      // },
    })
  ).current;

  const handleAnimation = (type: string) => {
    switch (defaultAnimation) {
      case 'slide':
        if (type === 'entering')
          return SlideInLeft.duration(animationInDuration);
        return SlideOutRight.duration(animationOutDuration);

      case 'bounce':
        if (type === 'entering') return BounceIn.duration(animationInDuration);
        return BounceOut.duration(animationOutDuration);
      default:
        if (type === 'entering') {
          return FadeInUp.duration(animationInDuration);
        } else if (progressAnimation) {
          if (!animationExitLeft) {
            return FadeOutRight.duration(animationOutDuration);
          } else return FadeOutLeft.duration(animationOutDuration);
        } else return FadeOutLeft.duration(animationOutDuration);
    }
  };
  return (
    <Animated.View
      entering={handleAnimation('entering')}
      exiting={handleAnimation('exiting')}
      style={[
        toastStyles.container,
        positionStyles[position ?? 'top'],
        {
          borderWidth: border ? 1 : 0,
          width: styles?.width ?? '90%',
          minHeight: styles?.height ?? 60,
          borderColor:
            styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
          borderRadius: styles?.borderRadius ?? 15,
          // Apply top, bottom, left, whether the value is 0, otherwise it will be ignored
          ...(styles?.top !== undefined && { top: styles.top }),
          ...(styles?.bottom !== undefined && { bottom: styles.bottom }),
          ...(styles?.left !== undefined && { left: styles.left }),
          ...(styles?.right !== undefined && { right: styles.right }),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor:
              styles?.backgroundColor ??
              TOAST_CONFIG[type][toastStyle].backgroundColor,
            borderLeftColor:
              toastStyle === 'secondary'
                ? TOAST_CONFIG[type][toastStyle].borderColor
                : 'transparent',
            borderLeftWidth: toastStyle === 'secondary' ? 5 : 0,
            opacity: styles?.opacity ?? 0.9,
          },
        ]}
      />
      <View style={toastStyles.contentContainer}>
        <RenderIcon
          type={type}
          toastStyle={toastStyle}
          iconColor={
            styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor
          }
          icon={icon}
          iconSize={styles?.iconSize}
          iconStyle={styles?.iconStyle}
        />

        <View style={title ? {} : { alignItems: 'center' }}>
          {title && (
            <Text
              style={[
                toastStyles.title,
                {
                  fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
                  color:
                    styles?.titleColor ??
                    TOAST_CONFIG[type][toastStyle].titleColor,
                },
              ]}
            >
              {title ?? TOAST_CONFIG[type].title}
            </Text>
          )}
          <Text
            style={[
              toastStyles.text,
              {
                fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
                color:
                  styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor,
              },
              !title && { fontWeight: 'bold' },
            ]}
          >
            {message ?? TOAST_CONFIG[type].message}
          </Text>
        </View>

        {progress && (
          <View style={toastStyles.progressContainer}>
            <Animated.View
              style={[
                toastStyles.progressBar,
                animatedStyle,
                {
                  backgroundColor:
                    styles?.progressColor ??
                    TOAST_CONFIG[type][toastStyle].progressColor,
                },
              ]}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};
