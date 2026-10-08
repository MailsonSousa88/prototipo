import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tab, Task } from '../models/app';
import { colors as C } from '../theme';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];
export const Icon = ({ name, size = 22, color = C.ink }: { name: IconName; size?: number; color?: string }) => <Ionicons name={name} size={size} color={color} />;

export function AppButton({ label, onPress, secondary = false, icon }: { label: string; onPress: () => void; secondary?: boolean; icon?: IconName }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondary, pressed && s.pressed]}>
    {icon && <Icon name={icon} size={19} color={secondary ? C.primary : '#fff'} />}<Text style={[s.buttonText, secondary && s.secondaryText]}>{label}</Text>
  </Pressable>;
}

export function Header({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return <View style={s.header}><View style={{ flex: 1 }}>{eyebrow && <Text style={s.eyebrow}>{eyebrow}</Text>}<Text style={s.title}>{title}</Text></View>{action}</View>;
}

export function TaskRow({ task, onPress, onToggle }: { task: Task; onPress: () => void; onToggle?: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [s.task, pressed && s.pressed]}>
    <Pressable onPress={onToggle} hitSlop={12} style={[s.check, task.completed && s.checked]}>{task.completed && <Icon name="checkmark" size={15} color="#fff" />}</Pressable>
    <View style={[s.bar, { backgroundColor: task.color }]} /><View style={{ flex: 1 }}><Text style={[s.taskTitle, task.completed && s.done]}>{task.title}</Text><Text style={s.meta}>{task.subject}</Text></View>
    <View style={s.time}><Icon name="time-outline" size={14} color={C.muted} /><Text style={s.meta}>{task.time}</Text></View>
  </Pressable>;
}

export function BottomNav({ active, navigate }: { active: Tab; navigate: (tab: Tab) => void }) {
  const tabs: { key: Tab; icon: IconName; activeIcon: IconName; label: string }[] = [
    { key: 'home', icon: 'home-outline', activeIcon: 'home', label: 'Início' }, { key: 'tasks', icon: 'list-outline', activeIcon: 'list', label: 'Tarefas' },
    { key: 'create', icon: 'add', activeIcon: 'add', label: 'Criar' }, { key: 'cosmos', icon: 'sparkles-outline', activeIcon: 'sparkles', label: 'Cosmos' },
    { key: 'profile', icon: 'person-outline', activeIcon: 'person', label: 'Perfil' },
  ];
  return <View style={s.nav}>{tabs.map(tab => { const selected = active === tab.key; const create = tab.key === 'create'; return <Pressable key={tab.key} onPress={() => navigate(tab.key)} style={s.navItem}>
    <View style={create && s.create}>{<Icon name={selected ? tab.activeIcon : tab.icon} size={create ? 27 : 22} color={selected ? C.primary : C.muted} />}</View><Text style={[s.navText, selected && s.navActive]}>{tab.label}</Text>
  </Pressable>; })}</View>;
}

export const shared = StyleSheet.create({
  page: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 22, paddingBottom: 28, backgroundColor: C.background },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13, marginTop: 2 }, sectionTitle: { fontSize: 19, fontWeight: '800', color: C.ink }, link: { color: C.primary, fontWeight: '700', fontSize: 13 },
});

const s = StyleSheet.create({
  button: { minHeight: 56, borderRadius: 17, backgroundColor: C.primary, flexDirection: 'row', gap: 9, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, elevation: 4 }, secondary: { backgroundColor: C.lavender, elevation: 0 }, buttonText: { color: '#fff', fontSize: 16, fontWeight: '800' }, secondaryText: { color: C.primary }, pressed: { opacity: .78, transform: [{ scale: .985 }] },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 }, eyebrow: { fontSize: 10, color: C.primary, fontWeight: '800', letterSpacing: 1.3, marginBottom: 5 }, title: { fontSize: 27, color: C.ink, fontWeight: '900', letterSpacing: -.5 },
  task: { minHeight: 76, backgroundColor: '#fff', borderRadius: 18, flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#EFECF6' }, check: { width: 23, height: 23, borderRadius: 8, borderWidth: 1.5, borderColor: '#C5C0D2', alignItems: 'center', justifyContent: 'center' }, checked: { backgroundColor: C.primary, borderColor: C.primary }, bar: { width: 4, height: 38, borderRadius: 3, marginHorizontal: 12 }, taskTitle: { color: C.ink, fontWeight: '700', fontSize: 14 }, done: { textDecorationLine: 'line-through', color: '#9894A5' }, meta: { color: C.muted, fontSize: 12, marginTop: 5 }, time: { flexDirection: 'row', gap: 4, alignItems: 'center', marginLeft: 6 },
  nav: { height: 76, flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: C.line, paddingHorizontal: 7, paddingTop: 8, paddingBottom: 4 }, navItem: { flex: 1, alignItems: 'center', gap: 3 }, create: { width: 43, height: 35, borderRadius: 17, marginTop: -1, backgroundColor: C.lavender, alignItems: 'center', justifyContent: 'center' }, navText: { fontSize: 10, color: C.muted, fontWeight: '600' }, navActive: { color: C.primary, fontWeight: '800' },
});
