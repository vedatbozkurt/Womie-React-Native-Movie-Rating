/*
* @Author: @vedatbozkurt
* @Date:   2020-05-08 04:32:11
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 03:23:05
*/
import React, {useRef, useEffect} from 'react';
import { Animated } from 'react-native';


const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }
      ).start();
  }, [])
  return (
    <Animated.View                 // Special animatable View
    style={{
      ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
      >
      {props.children}
      </Animated.View>
      );
}
export default FadeInView
