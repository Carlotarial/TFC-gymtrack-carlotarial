import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Nueva paleta estética: Tonos Pastel Modernos (Violeta Pastel + Peach)
export interface AppColors {
  background: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;          // Color primario pastel (ej. Violeta)
  accentLight: string;     // Fondo suave pastel
  accentDark: string;      // Texto contraste
  gold: string;            // Secundario pastel (ej. Peach/Rosa)
  goldLight: string;       // Fondo suave peach
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
  background: '#F8FAFC',     // Gris/Azul extra claro y limpio
  surface: '#FFFFFF',        // Blanco puro para tarjetas
  surfaceBorder: '#F1F5F9',  // Gris muy suave
  text: '#1E293B',           // Pizarra oscuro
  textSecondary: '#64748B',  // Pizarra medio
  textMuted: '#CBD5E1',      
  accent: '#A78BFA',         // VIOLETA PASTEL (Principal)
  accentLight: '#EDE9FE',    // Fondo violeta clarito para badges
  accentDark: '#6D28D9',     // Violeta fuerte para textos o iconos
  gold: '#FDA4AF',           // ROSA/PEACH PASTEL (Secundario/Fuego/Racha)
  goldLight: '#FFE4E6',      // Fondo rosado clarito
  buttonPrimary: '#A78BFA',  // Botón Violeta
  buttonPrimaryText: '#FFFFFF', 
  buttonDisabled: '#F1F5F9',
  barActive: '#A78BFA',
  barInactive: '#F1F5F9',
  tabActive: '#8B5CF6',
  tabInactive: '#94A3B8',
  divider: '#F1F5F9',
  overlay: 'rgba(167, 139, 250, 0.08)', // Overlay teñido de violeta
};

export const DarkColors: AppColors = {
  background: '#0F172A',     // Deep Slate oscuro
  surface: '#1E293B',        // Tarjetas oscuras
  surfaceBorder: '#334155',  
  text: '#F8FAFC',           // Texto brillante
  textSecondary: '#94A3B8',  
  textMuted: '#475569',      
  accent: '#C4B5FD',         // VIOLETA PASTEL brilloso en oscuro
  accentLight: '#4C1D95',    // Fondo badge oscuro violeta
  accentDark: '#DDD6FE',     // Texto oscuro violeta
  gold: '#FDA4AF',           // Rosa pastel 
  goldLight: '#881337',      // Fondo badge rojo/rosa oscuro
  buttonPrimary: '#A78BFA',  // Mantenemos botón primario visible
  buttonPrimaryText: '#0F172A', 
  buttonDisabled: '#334155',
  barActive: '#C4B5FD',
  barInactive: '#334155',
  tabActive: '#C4B5FD',
  tabInactive: '#64748B',
  divider: '#334155',
  overlay: 'rgba(196, 181, 253, 0.05)',
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
