import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Definimos que el Onboarding es lo primero */}
      <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
      
      {/* Luego van las pestañas principales */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Y las pantallas sueltas */}
      <Stack.Screen name="routine" options={{ presentation: 'card' }} />
      <Stack.Screen name="workout" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
}