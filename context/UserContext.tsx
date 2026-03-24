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
  waterIntake: number;        // litros consumidos hoy
  workoutHistory: WorkoutSession[];
}

interface UserContextType {
  user: UserData;
  updateUser: (newData: Partial<UserData>) => Promise<void>;
  completeWorkout: (title: string, durationSecs: number, kcal: number) => Promise<void>;
  updateWater: (liters: number) => Promise<void>;
  resetUser: () => Promise<void>;
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
};

const UserContext = createContext<UserContextType>({
  user: DEFAULT_USER,
  updateUser: async () => {},
  completeWorkout: async () => {},
  updateWater: async () => {},
  resetUser: async () => {},
  isOnboarded: false,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos guardados al arrancar la app
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('@user_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Merge con defaults para campos nuevos que no existían antes
          setUser({ ...DEFAULT_USER, ...parsed });
        }
      } catch (e) {
        console.error('Error cargando datos del usuario:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Función genérica para actualizar datos parciales
  const updateUser = async (newData: Partial<UserData>) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  // Registrar un entrenamiento completado y actualizar stats
  const completeWorkout = async (title: string, durationSecs: number, kcal: number) => {
    const session: WorkoutSession = {
      id: Date.now().toString(),
      title,
      date: new Date().toISOString(),
      durationSecs,
      kcal,
    };

    const updated: UserData = {
      ...user,
      sessionsCompleted: user.sessionsCompleted + 1,
      kcalBurned: user.kcalBurned + kcal,
      streak: user.streak + 1, // Simplificado: incrementa racha por sesión
      workoutHistory: [session, ...user.workoutHistory],
    };

    setUser(updated);
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  // Actualizar agua consumida
  const updateWater = async (liters: number) => {
    const updated = { ...user, waterIntake: liters };
    setUser(updated);
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  // Limpiar todo para logout
  const resetUser = async () => {
    setUser(DEFAULT_USER);
    await AsyncStorage.removeItem('@user_data');
  };

  const isOnboarded = user.name.length > 0;

  return (
    <UserContext.Provider value={{ user, updateUser, completeWorkout, updateWater, resetUser, isOnboarded, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);