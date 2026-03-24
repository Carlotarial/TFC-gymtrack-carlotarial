import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Onboarding: El punto de entrada */}
          <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
          
          {/* Tabs Principales */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Pantallas de flujo de entrenamiento */}
          <Stack.Screen name="routine" options={{ presentation: 'card' }} />
          <Stack.Screen name="workout" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="success" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}