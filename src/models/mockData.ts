import { Task } from './app';
import { colors } from '../theme';

export const initialTasks: Task[] = [
  { id: 1, title: 'Revisar ciclos biogeoquímicos', subject: 'Biologia', time: '08:30', color: colors.mint, completed: false },
  { id: 2, title: 'Lista de funções quadráticas', subject: 'Matemática', time: '14:00', color: colors.primary, completed: false },
  { id: 3, title: 'Ler capítulo 4', subject: 'Literatura', time: '18:30', color: colors.coral, completed: true },
];

export const onboardingItems = [
  { icon: 'checkbox-outline', title: 'Organize seus estudos', body: 'Reúna tarefas, prazos e matérias em um só lugar.' },
  { icon: 'timer-outline', title: 'Encontre seu foco', body: 'Use sessões curtas para avançar no seu ritmo, sem pressão.' },
  { icon: 'sparkles-outline', title: 'Construa seu cosmos', body: 'Cada dia de dedicação acende uma nova estrela no seu universo.' },
] as const;

