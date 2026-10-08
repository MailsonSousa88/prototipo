import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { BottomNav } from '../components/ui';
import { AppViewModel } from '../viewmodels/useAppViewModel';
import { SplashView, OnboardingView } from './OnboardingViews';
import { HomeView } from './HomeView';
import { CreateTaskView, TaskDetailView, TasksView } from './TaskViews';
import { FocusActiveView, FocusDoneView, FocusSetupView } from './FocusViews';
import { CosmosView } from './CosmosView';
import { ProfileView } from './ProfileView';
import { colors as C } from '../theme';

export function AppView({ vm }: { vm: AppViewModel }) {
  if (vm.phase === 'splash') return <SplashView onDone={vm.finishSplash}/>;
  if (vm.phase === 'onboarding') return <OnboardingView onFinish={vm.finishOnboarding}/>;
  const content = (() => { switch (vm.screen) {
    case 'home': return <HomeView tasks={vm.tasks} streak={vm.streak} incrementStreak={vm.incrementStreak} goTasks={() => vm.navigate('tasks')} goFocus={vm.openFocus}/>;
    case 'tasks': return <TasksView tasks={vm.tasks} toggle={vm.toggleTask} openTask={vm.openDetail}/>;
    case 'create': return <CreateTaskView save={vm.createTask}/>;
    case 'detail': return <TaskDetailView back={() => vm.navigate('tasks')} startFocus={vm.openFocus}/>;
    case 'focusSetup': return <FocusSetupView back={vm.goBack} start={vm.startFocus}/>;
    case 'focusActive': return <FocusActiveView minutes={vm.focusMinutes} finish={vm.finishFocus}/>;
    case 'focusDone': return <FocusDoneView done={() => vm.navigate('tasks')}/>;
    case 'cosmos': return <CosmosView streak={vm.streak} back={vm.goBack}/>;
    case 'profile': return <ProfileView/>;
  }})();
  return <SafeAreaView style={[s.safe,vm.immersive&&s.dark]} edges={['top']}><View style={s.app}>{content}{vm.showsNav&&<BottomNav active={vm.activeTab} navigate={vm.navigate}/>}</View></SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#ECE9F6'},dark:{backgroundColor:C.night},app:{flex:1,width:'100%',maxWidth:480,alignSelf:'center',backgroundColor:C.background,elevation:2}});
