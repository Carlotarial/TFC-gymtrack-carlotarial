import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FITNESS_TIPS = [
  "La hidratación constante mejora el rendimiento.",
  "El descanso es clave para el crecimiento real.",
  "Pequeños progresos suman grandes resultados.",
  "La técnica correcta previene lesiones.",
  "La constancia es la llave del éxito físico."
];

export default function GeneratingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [loadingText, setLoadingText] = useState('Analizando biometría');
  const [currentTip, setCurrentTip] = useState(FITNESS_TIPS[0]);

  const progress = useSharedValue(0.1);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      true
    );

    const messages = [
      { text: 'Analizando biometría...', p: 0.25 },
      { text: 'Calculando TDEE y macros...', p: 0.55 },
      { text: 'Filtrando ejercicios...', p: 0.75 },
      { text: 'Estructurando tu programa...', p: 1.0 }
    ];

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setLoadingText(messages[index].text);
        progress.value = withTiming(messages[index].p, { duration: 2000 });
      }
    }, 2000);

    let tipIndex = 0;
    const tipInterval = setInterval(() => {
        tipIndex = (tipIndex + 1) % FITNESS_TIPS.length;
        setCurrentTip(FITNESS_TIPS[tipIndex]);
    }, 4000);

    const timer = setTimeout(() => {
      router.replace('/(tabs)' as any);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }]
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: (SCREEN_WIDTH * 0.7) * progress.value
  }));

  const s = dynamicStyles(colors);

  return (
    <View style={s.container}>
      <View style={staticStyles.content}>
        <Animated.View style={[s.iconBox, pulseStyle]}>
          <Ionicons name="fitness" size={48} color={colors.accent} />
        </Animated.View>

        <View>
          <Text style={s.title}>Personalizando...</Text>
          <Text style={s.subtitle}>Preparando tu experiencia de entrenamiento exclusiva.</Text>
        </View>

        <View style={s.progressRow}>
          <View style={s.progressBarTrack}>
            <Animated.View style={[s.progressBarFill, progressStyle]} />
          </View>
          <Text style={s.loadingMessage}>{loadingText}</Text>
        </View>
      </View>

      <View style={staticStyles.footer}>
        <View style={s.tipBox}>
            <Text style={s.tipText}>{currentTip}</Text>
        </View>
      </View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 },
  footer: { marginBottom: 100, alignItems: 'center', paddingHorizontal: 40 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },

  iconBox: { width: 100, height: 100, backgroundColor: c.surface, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 32, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 24, elevation: 4, borderWidth: 1, borderColor: c.surfaceBorder },
  
  title: { fontSize: 28, fontWeight: '800', color: c.text, textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: c.textSecondary, textAlign: 'center', lineHeight: 24, marginTop: 12, paddingHorizontal: 30, fontWeight: '500', opacity: 0.8 },

  progressRow: { marginTop: 48, alignItems: 'center', width: '100%' },
  progressBarTrack: { width: SCREEN_WIDTH * 0.7, height: 12, backgroundColor: c.surface, borderRadius: 6, overflow: 'hidden', borderWidth: 1, borderColor: c.surfaceBorder, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 1 },
  progressBarFill: { height: '100%', backgroundColor: c.accent, borderRadius: 6 },
  
  loadingMessage: { marginTop: 24, fontSize: 14, fontWeight: '800', color: c.accent, textTransform: 'uppercase', letterSpacing: 1.5, opacity: 0.9 },
  
  tipBox: { alignItems: 'center' },
  tipText: { fontSize: 15, color: c.textSecondary, fontWeight: '600', textAlign: 'center', fontStyle: 'italic' },
});