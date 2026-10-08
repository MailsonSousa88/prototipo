import { Animated } from 'react-native';
import { useEffect, useMemo } from 'react';

export function useSequencePlanetViewModel() {
  const float = useMemo(() => new Animated.Value(0), []);
  const orbit = useMemo(() => new Animated.Value(0), []);
  useEffect(() => {
    const floating = Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 1800, useNativeDriver: true }),
      Animated.timing(float, { toValue: 0, duration: 1800, useNativeDriver: true }),
    ]));
    let active = true;
    let orbiting: Animated.CompositeAnimation;
    const rotate = () => {
      orbit.setValue(0);
      orbiting = Animated.timing(orbit, { toValue: 1, duration: 8500, easing: value => value, useNativeDriver: true, isInteraction: false });
      orbiting.start(({ finished }) => finished && active && rotate());
    };
    floating.start(); rotate();
    return () => { active = false; floating.stop(); orbiting?.stop(); };
  }, [float, orbit]);
  return {
    translateY: float.interpolate({ inputRange: [0, 1], outputRange: [4, -7] }),
    rotate: orbit.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }),
  };
}
