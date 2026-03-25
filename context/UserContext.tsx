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
  avatar?: string;
}

// Discriminated union para el estado de inicialización
export type AppState =
  | { status: 'loading' }
  | { status: 'ready'; user: UserData; profiles: UserData[] }
  | { status: 'error'; error: Error };

interface UserContextType {
  user: UserData;
  profiles: UserData[];
  status: AppState['status'];
  error?: Error;
  updateUser: (newData: Partial<UserData>) => Promise<void>;
  completeWorkout: (title: string, durationSecs: number, kcal: number) => Promise<void>;
  updateWater: (liters: number) => Promise<void>;
  selectProfile: (name: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteProfile: (name: string) => Promise<void>;
  clearAllData: () => Promise<void>;
  isOnboarded: boolean;
  isLoading: boolean;
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
  avatar: '',
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState<AppState>({ status: 'loading' });

  // Cargar datos guardados al arrancar la app
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedActive = await AsyncStorage.getItem('@user_data');
        const savedProfiles = await AsyncStorage.getItem('@all_profiles');
        
        let activeUser = DEFAULT_USER;
        let profiles: UserData[] = [];

        if (savedProfiles) {
          profiles = JSON.parse(savedProfiles);
        }

        if (savedActive) {
          activeUser = { ...DEFAULT_USER, ...JSON.parse(savedActive) };
          // Asegurarnos de que el activo esté en la lista (migración/sincronización)
          if (activeUser.name && !profiles.find(p => p.name === activeUser.name)) {
            profiles.push(activeUser);
            await AsyncStorage.setItem('@all_profiles', JSON.stringify(profiles));
          }
        }

        setAppState({ status: 'ready', user: activeUser, profiles });
      } catch (e) {
        console.error('Error cargando datos del usuario:', e);
        setAppState({ status: 'error', error: e instanceof Error ? e : new Error('Error de almacenamiento') });
      }
    };
    loadData();
  }, []);

  // Helpers para no romper la API actual
  const user = appState.status === 'ready' ? appState.user : DEFAULT_USER;
  const profiles = appState.status === 'ready' ? appState.profiles : [];
  const isLoading = appState.status === 'loading';
  const error = appState.status === 'error' ? appState.error : undefined;

  const saveAll = async (activeUser: UserData, allProfiles: UserData[]) => {
    await AsyncStorage.setItem('@user_data', JSON.stringify(activeUser));
    await AsyncStorage.setItem('@all_profiles', JSON.stringify(allProfiles));
  };

  const updateUser = async (newData: Partial<UserData>) => {
    if (appState.status !== 'ready') return;
    
    const updatedUser = { ...appState.user, ...newData };
    
    // Actualizar también en la lista de perfiles
    const updatedProfiles = appState.profiles.map(p => 
      p.name === appState.user.name ? updatedUser : p
    );
    
    // Si es un perfil nuevo (se acaba de poner nombre en onboarding)
    if (newData.name && !appState.profiles.find(p => p.name === newData.name)) {
      updatedProfiles.push(updatedUser);
    }

    setAppState({ status: 'ready', user: updatedUser, profiles: updatedProfiles });
    await saveAll(updatedUser, updatedProfiles);
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

    const updatedUser: UserData = {
      ...appState.user,
      sessionsCompleted: appState.user.sessionsCompleted + 1,
      kcalBurned: appState.user.kcalBurned + kcal,
      streak: appState.user.streak + 1,
      workoutHistory: [session, ...appState.user.workoutHistory],
    };

    const updatedProfiles = appState.profiles.map(p => 
      p.name === appState.user.name ? updatedUser : p
    );

    setAppState({ status: 'ready', user: updatedUser, profiles: updatedProfiles });
    await saveAll(updatedUser, updatedProfiles);
  };

  const updateWater = async (liters: number) => {
    if (appState.status !== 'ready') return;
    const updatedUser = { ...appState.user, waterIntake: liters };
    const updatedProfiles = appState.profiles.map(p => 
      p.name === appState.user.name ? updatedUser : p
    );
    setAppState({ status: 'ready', user: updatedUser, profiles: updatedProfiles });
    await saveAll(updatedUser, updatedProfiles);
  };

  const selectProfile = async (name: string) => {
    if (appState.status !== 'ready') return;
    const selected = appState.profiles.find(p => p.name === name);
    if (selected) {
      setAppState({ ...appState, user: selected });
      await AsyncStorage.setItem('@user_data', JSON.stringify(selected));
    }
  };

  const logout = async () => {
    if (appState.status !== 'ready') return;
    setAppState({ ...appState, user: DEFAULT_USER });
    await AsyncStorage.removeItem('@user_data');
  };

  const deleteProfile = async (name: string) => {
    if (appState.status !== 'ready') return;
    const updatedProfiles = appState.profiles.filter(p => p.name !== name);
    
    // Si borramos el activo, deslogueamos
    if (appState.user.name === name) {
        setAppState({ status: 'ready', user: DEFAULT_USER, profiles: updatedProfiles });
        await AsyncStorage.removeItem('@user_data');
    } else {
        setAppState({ ...appState, profiles: updatedProfiles });
    }
    await AsyncStorage.setItem('@all_profiles', JSON.stringify(updatedProfiles));
  };

  const clearAllData = async () => {
    // Borra TODO (todos los perfiles)
    setAppState({ status: 'ready', user: DEFAULT_USER, profiles: [] });
    await AsyncStorage.clear();
  };

  const isOnboarded = user.name.length > 0;

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        profiles,
        status: appState.status, 
        error, 
        updateUser, 
        completeWorkout, 
        updateWater, 
        selectProfile,
        logout,
        deleteProfile,
        clearAllData, 
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