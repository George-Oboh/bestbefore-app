import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.tsx';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { ProductProvider } from './src/context/ProductContext';

if (__DEV__ && Platform.OS === 'ios') {
  try {
    // @ts-ignore
    const { autoLaunchApp } = require('expo-dev-client');
    if (autoLaunchApp) {
      autoLaunchApp();
    }
  } catch (e) {
    // Ignore if expo-dev-client is not available
  }
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Bold': Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <SettingsProvider>
        <ProductProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ProductProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
