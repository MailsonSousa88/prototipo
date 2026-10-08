import { StatusBar as NativeStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppView } from './src/views/AppView';
import { useAppViewModel } from './src/viewmodels/useAppViewModel';
import { colors } from './src/theme';

export default function App() {
  const viewModel = useAppViewModel();
  return <SafeAreaProvider><StatusBar style="dark"/><NativeStatusBar backgroundColor={colors.background}/><AppView vm={viewModel}/></SafeAreaProvider>;
}
