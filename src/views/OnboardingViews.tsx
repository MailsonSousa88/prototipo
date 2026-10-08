import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Icon, IconName } from '../components/ui';
import { onboardingItems } from '../models/mockData';
import { colors as C } from '../theme';

export function SplashView({ onDone }: { onDone: () => void }) {
  useEffect(() => { const timer = setTimeout(onDone, 1800); return () => clearTimeout(timer); }, [onDone]);
  return <Pressable style={s.splash} onPress={onDone}><View style={s.art}><Text style={[s.sparkle, { top: 0, left: 14 }]}>✦</Text><Text style={[s.sparkle, { top: 38, right: 0, color: C.gold }]}>✦</Text><View style={s.planet}><View style={[s.crater, { width: 30, height: 30, top: 24, left: 28 }]} /><View style={[s.crater, { width: 18, height: 18, top: 62, right: 25 }]} /></View></View><Text style={s.logo}>COSMOS</Text><Text style={s.tagline}>Sua rotina de estudos, um universo de possibilidades.</Text><Text style={s.hint}>toque para começar</Text></Pressable>;
}

export function OnboardingView({ onFinish }: { onFinish: () => void }) {
  const [page, setPage] = useState(0); const item = onboardingItems[page]!;
  return <SafeAreaView style={s.onboarding}><View style={s.top}><View style={s.dots}>{[0, 1, 2].map(dot => <View key={dot} style={[s.dot, dot === page && s.dotActive]} />)}</View><Pressable onPress={onFinish}><Text style={s.skip}>Pular</Text></Pressable></View><View style={s.content}><View style={s.onboardArt}><View style={s.orbit} /><View style={s.icon}><Icon name={item.icon as IconName} size={54} color={C.primary} /></View></View><Text style={s.title}>{item.title}</Text><Text style={s.body}>{item.body}</Text></View><AppButton label={page === 2 ? 'Explorar meu cosmos' : 'Continuar'} icon="arrow-forward" onPress={() => page === 2 ? onFinish() : setPage(page + 1)} /></SafeAreaView>;
}

const s = StyleSheet.create({
  splash: { flex: 1, backgroundColor: C.background, alignItems: 'center', justifyContent: 'center', padding: 32 }, art: { width: 190, height: 190, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }, planet: { width: 132, height: 132, borderRadius: 70, backgroundColor: C.primary }, crater: { position: 'absolute', borderRadius: 20, backgroundColor: '#8175EB' }, sparkle: { position: 'absolute', color: C.primary, fontSize: 24 }, logo: { fontSize: 34, fontWeight: '900', letterSpacing: 6, color: C.ink }, tagline: { maxWidth: 290, marginTop: 12, textAlign: 'center', color: C.muted, fontSize: 16, lineHeight: 24 }, hint: { position: 'absolute', bottom: 42, fontSize: 12, color: '#AAA6B8', letterSpacing: 1.5, textTransform: 'uppercase' },
  onboarding: { flex: 1, padding: 24, backgroundColor: C.background }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, dots: { flexDirection: 'row', gap: 7 }, dot: { width: 8, height: 8, borderRadius: 5, backgroundColor: '#D5D1E2' }, dotActive: { width: 25, backgroundColor: C.primary }, skip: { fontSize: 15, color: C.muted, fontWeight: '600' }, content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }, onboardArt: { width: 210, height: 210, alignItems: 'center', justifyContent: 'center', marginBottom: 34 }, orbit: { position: 'absolute', width: 205, height: 112, borderWidth: 1.5, borderColor: '#CBC5F4', borderRadius: 100, transform: [{ rotate: '-25deg' }] }, icon: { width: 125, height: 125, borderRadius: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: C.lavender, elevation: 3 }, title: { color: C.ink, fontSize: 27, fontWeight: '800', textAlign: 'center' }, body: { color: C.muted, textAlign: 'center', fontSize: 16, lineHeight: 25, maxWidth: 310, marginTop: 12 },
});
