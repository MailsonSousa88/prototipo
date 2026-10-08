export type Tab = 'home' | 'tasks' | 'create' | 'cosmos' | 'profile';
export type Screen = Tab | 'detail' | 'focusSetup' | 'focusActive' | 'focusDone';
export type Phase = 'splash' | 'onboarding' | 'app';

export type Task = {
  id: number;
  title: string;
  subject: string;
  time: string;
  color: string;
  completed: boolean;
};

export type Star = {
  x: number;
  y: number;
  r: number;
  name: string;
  color: string;
};

