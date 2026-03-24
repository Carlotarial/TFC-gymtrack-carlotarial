import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Paleta de colores de la app (Verde salvia, Crema, Negro mate)
export interface AppColors {
  background: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;          // Verde salvia
  accentLight: string;
  accentDark: string;
  gold: string;            // Dorado/Oro
  goldLight: string;
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonDisabled: string;
  barActive: string;
  barInactive: string;
  tabActive: string;
  tabInactive: string;
  divider: string;
  overlay: string;
}

export const LightColors: AppColors = {
  background: '#FDFBF6',
  surface: '#FFFFFF',
  surfaceBorder: '#F0F2ED',
  text: '#1A1C1A',
  textSecondary: '#8C9A8C',
  textMuted: '#C1C7C1',
  accent: '#9CAF88',
  accentLight: '#E6EBE0',
  accentDark: '#4A5D4A',
  gold: '#CDA434',
  goldLight: '#FAF3E0',
  buttonPrimary: '#1A1C1A',
  buttonPrimaryText: '#FDFBF6',
  buttonDisabled: '#E6EBE0',
  barActive: '#9CAF88',
  barInactive: '#F0F2ED',
  tabActive: '#4A4A4A',
  tabInactive: '#A1A1AA',
  divider: '#F0F2ED',
  overlay: 'rgba(0,0,0,0.02)',
};

export const DarkColors: AppColors = {
  background: '#0D0F0D',
  surface: '#1A1C1A',
  surfaceBorder: '#2A2E2A',
  text: '#F0F2ED',
  textSecondary: '#8C9A8C',
  textMuted: '#5A625A',
  accent: '#9CAF88',
  accentLight: '#2A3328',
  accentDark: '#B8C8A8',
  gold: '#CDA434',
  goldLight: '#2E2810',
  buttonPrimary: '#E6EBE0',
  buttonPrimaryText: '#1A1C1A',
  buttonDisabled: '#2A2E2A',
  barActive: '#9CAF88',
  barInactive: '#2A2E2A',
  tabActive: '#E6EBE0',
  tabInactive: '#5A625A',
  divider: '#2A2E2A',
  overlay: 'rgba(255,255,255,0.03)',
};

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colors: AppColors;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: LightColors,
  mode: 'system',
  isDark: false,
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  // Cargar preferencia guardada
  useEffect(() => {
    AsyncStorage.getItem('@theme_mode').then((saved) => {
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setModeState(saved);
      }
    });
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem('@theme_mode', newMode);
  };

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');

  const colors = isDark ? DarkColors : LightColors;

  return (
    <ThemeContext.Provider value={{ colors, mode, isDark, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
