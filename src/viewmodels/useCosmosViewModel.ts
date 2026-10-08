import { Animated, PanResponder } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Star } from '../models/app';
import { colors as C } from '../theme';

export const cosmosStars: Star[] = [
  { x: 110, y: 235, r: 7, name: 'Primeiro passo', color: '#F7F5FF' }, { x: 175, y: 145, r: 10, name: 'Começo da jornada', color: '#F7F5FF' },
  { x: 255, y: 215, r: 7, name: 'Ritmo constante', color: '#F7F5FF' }, { x: 345, y: 115, r: 9, name: 'Foco profundo', color: '#F7F5FF' },
  { x: 430, y: 195, r: 10, name: 'Semana completa', color: C.gold }, { x: 510, y: 90, r: 6, name: 'Nova órbita', color: '#F7F5FF' },
  { x: 530, y: 275, r: 9, name: 'Constância', color: '#F7F5FF' }, { x: 385, y: 330, r: 7, name: 'Descoberta', color: C.mint },
  { x: 260, y: 365, r: 8, name: 'Curiosidade', color: '#F7F5FF' }, { x: 155, y: 415, r: 7, name: 'Dedicação', color: '#F7F5FF' },
  { x: 335, y: 485, r: 11, name: 'Planeta do saber', color: C.coral }, { x: 475, y: 455, r: 7, name: 'Próximo desafio', color: '#F7F5FF' },
  { x: 580, y: 520, r: 8, name: 'Horizonte', color: '#F7F5FF' },
];
export const cosmosLinks: Array<[number, number]> = [[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,7],[7,8],[8,9],[8,10],[10,11],[11,12],[7,11]];

export function useCosmosViewModel() {
  const [showStats, setShowStats] = useState(false); const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const pan = useMemo(() => new Animated.ValueXY({ x: -145, y: -105 }), []); const pulse = useMemo(() => new Animated.Value(0), []);
  const responder = useMemo(() => PanResponder.create({ onStartShouldSetPanResponder: () => false, onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 3 || Math.abs(g.dy) > 3, onPanResponderGrant: () => { pan.stopAnimation(); pan.extractOffset(); }, onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }), onPanResponderRelease: () => pan.flattenOffset(), onPanResponderTerminate: () => pan.flattenOffset() }), [pan]);
  useEffect(() => { const animation = Animated.loop(Animated.sequence([Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: true }), Animated.timing(pulse, { toValue: 0, duration: 1500, useNativeDriver: true })])); animation.start(); return () => animation.stop(); }, [pulse]);
  return { showStats, openStats: () => setShowStats(true), closeStats: () => setShowStats(false), selectedStar, selectStar: setSelectedStar, pan, panHandlers: responder.panHandlers, pulseScale: pulse.interpolate({ inputRange: [0,1], outputRange: [1,1.35] }), pulseOpacity: pulse.interpolate({ inputRange: [0,1], outputRange: [.22,.58] }) };
}
