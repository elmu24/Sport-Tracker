import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  // Creating Stack-navigation
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar style="auto" /> 
    </>
  );
}