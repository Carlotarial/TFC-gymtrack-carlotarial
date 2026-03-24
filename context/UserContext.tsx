import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Definimos qué datos vamos a guardar
interface UserData {
  name: string;
  weight: string;
  height: string;
  goal: string;
  activityLevel: string;
  kcalBurned: number;
  sessionsCompleted: number;
  streak: number;
}

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>({
    name: '', weight: '', height: '', goal: '', activityLevel: '',
    kcalBurned: 0, sessionsCompleted: 0, streak: 0
  });

  // Guardar datos automáticamente en el móvil para que no se borren al cerrar
  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem('@user_data');
      if (saved) setUser(JSON.parse(saved));
    };
    loadData();
  }, []);

  const updateUser = async (newData: Partial<UserData>) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    await AsyncStorage.setItem('@user_data', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);