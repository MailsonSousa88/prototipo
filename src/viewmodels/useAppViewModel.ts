import { useState } from 'react';
import { initialTasks } from '../models/mockData';
import { Phase, Screen, Tab } from '../models/app';
import { colors } from '../theme';

export function useAppViewModel() {
  const [phase, setPhase] = useState<Phase>('splash');
  const [screen, setScreen] = useState<Screen>('home');
  const [lastTab, setLastTab] = useState<Tab>('home');
  const [tasks, setTasks] = useState(initialTasks);
  const [streak, setStreak] = useState(12);
  const [focusMinutes, setFocusMinutes] = useState(25);

  const navigate = (tab: Tab) => {
    if (tab !== 'cosmos') setLastTab(tab);
    setScreen(tab);
  };
  const toggleTask = (id: number) => setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  const createTask = (title: string) => {
    setTasks(current => [...current, { id: Date.now(), title, subject: 'Matemática', time: '18:30', color: colors.primary, completed: false }]);
    navigate('tasks');
  };
  const startFocus = (minutes: number) => { setFocusMinutes(minutes); setScreen('focusActive'); };
  const immersive = screen === 'focusActive' || screen === 'focusDone' || screen === 'cosmos';
  const showsNav = !immersive && !['detail', 'focusSetup'].includes(screen);
  const activeTab = (['detail', 'focusSetup', 'focusActive', 'focusDone'].includes(screen) ? lastTab : screen) as Tab;

  return {
    phase, screen, lastTab, tasks, streak, focusMinutes, immersive, showsNav, activeTab,
    finishSplash: () => setPhase('onboarding'), finishOnboarding: () => setPhase('app'), navigate,
    goBack: () => setScreen(lastTab), openDetail: () => setScreen('detail'), openFocus: () => setScreen('focusSetup'),
    finishFocus: () => setScreen('focusDone'), incrementStreak: () => setStreak(value => value + 1),
    toggleTask, createTask, startFocus,
  };
}

export type AppViewModel = ReturnType<typeof useAppViewModel>;

