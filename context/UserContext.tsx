import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Estructura de cada sesión completada
export interface WorkoutSession {
  id: string;
  title: string;
  date: string;       // ISO string
  durationSecs: number;
  kcal: number;
}

// Definimos qué datos vamos a guardar
export interface UserData {
  name: string;
  weight: string;
  height: string;
  goal: string;
  activityLevel: string;
  kcalBurned: number;
  sessionsCompleted: number;
  streak: number;
  waterIntake: number;
  workoutHistory: WorkoutSession[];
}

// Discriminated union para el estado de inicialización
export type AppState =
  | { status: 'loading' }
  | { status: 'ready'; user: UserData }
  | { status: 'error'; error: Error };

interface UserContextType {
  user: UserData;
  status: AppState['status'];
  error?: Error;
  updateUser: (newData: Partial<UserData>) => Promise<void>;
  completeWorkout: (title: string, durationSecs: number, kcal: number) => Promise<void>;
  updateWater: (liters: number) => Promise<void>;
  resetUser: () => Promise<void>;
  isOnboarded: boolean;
  isLoading: boolean; // Mantenido por retrocompatibilidad con pantallas existentes
}

const DEFAULT_USER: UserData = {
  name: '',
  weight: '',
  height: '',
  goal: '',
  activityLevel: '',
  kcalBurned: 0,
  sessionsCompleted: 0,
  streak: 0,
  waterIntake: 0,
  workoutHistory: [],
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState<AppState>({ status: 'loading' });

  // Cargar datos guardados al arrancar la app
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('@user_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          setAppState({ status: 'ready', user: { ...DEFAULT_USER, ...parsed } });
        } else {
          setAppState({ status: 'ready', user: DEFAULT_USER });
        }
      } catch (e) {
        console.error('Error cargando datos del usuario:', e);
        setAppState({ status: 'error', error: e instanceof Error ? e : new Error('Error de almacenamiento') });
      }
    };
    loadData();
  }, []);

  // Helpers para no romper la API actual
  const user = appState.status === 'ready' ? appState.user : DEFAULT_USER;
  const isLoading = appState.status === 'loading';
  const error = appState.status === 'error' ? appState.error : undefined;

  const updateUser = async (newData: Partial<UserData>) => {
    if (appState.status !== 'ready') return;
    const updated = { ...appState.user, ...newData };
    setAppState({ status: 'ready', user: updated });
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  const completeWorkout = async (title: string, durationSecs: number, kcal: number) => {
    if (appState.status !== 'ready') return;
    const session: WorkoutSession = {
      id: Date.now().toString(),
      title,
      date: new Date().toISOString(),
      durationSecs,
      kcal,
    };

    const updated: UserData = {
      ...appState.user,
      sessionsCompleted: appState.user.sessionsCompleted + 1,
      kcalBurned: appState.user.kcalBurned + kcal,
      streak: appState.user.streak + 1,
      workoutHistory: [session, ...appState.user.workoutHistory],
    };

    setAppState({ status: 'ready', user: updated });
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  const updateWater = async (liters: number) => {
    if (appState.status !== 'ready') return;
    const updated = { ...appState.user, waterIntake: liters };
    setAppState({ status: 'ready', user: updated });
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  const resetUser = async () => {
    setAppState({ status: 'ready', user: DEFAULT_USER });
    await AsyncStorage.removeItem('@user_data');
  };

  const isOnboarded = user.name.length > 0;

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        status: appState.status, 
        error, 
        updateUser, 
        completeWorkout, 
        updateWater, 
        resetUser, 
        isOnboarded, 
        isLoading 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};