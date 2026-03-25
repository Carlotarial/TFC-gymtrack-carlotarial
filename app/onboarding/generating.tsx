import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function GeneratingScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { colors } = useTheme();
  const [loadingText, setLoadingText] = useState('Analizando biometría');

  const progress = useSharedValue(0.1);
  const pulse = useSharedValue(1);

  useEffect(() => {
    // Animación de pulso infinita
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    const messages = [
      { text: 'Analizando biometría...', p: 0.25 },
      { text: 'Cruzando datos de nivel de actividad...', p: 0.45 },
      { text: 'Calculando TDEE y macros...', p: 0.65 },
      { text: 'Filtrando base de ejercicios...', p: 0.85 },
      { text: 'Estructurando tu programa...', p: 1.0 }
    ];

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setLoadingText(messages[index].text);
        progress.value = withTiming(messages[index].p, { duration: 800 });
      }
    }, 800);

    const timer = setTimeout(() => {
      router.replace('/(tabs)' as any);
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }]
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: (SCREEN_WIDTH - 64) * progress.value
  }));

  const s = dynamicStyles(colors);

  return (
    <View style={s.container}>
      <View style={staticStyles.stepContainer}>
        {[1, 2, 3, 4].map((step) => (
          <View key={step} style={[s.stepDot, s.stepDotDone]} />
        ))}
      </View>

      <View style={staticStyles.content}>
        <Animated.View style={[s.iconCircle, pulseStyle]}>
          <Ionicons name="fitness-outline" size={75} color={colors.accent} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <Text style={s.title}>Personalizando tu Plan</Text>
          <Text style={s.subtitle}>
            Optimizando tu rutina basándonos en tu perfil biométrico y objetivos físicos prioritarios.
          </Text>
        </Animated.View>

        <View style={s.progressContainer}>
          <View style={s.progressBackground}>
            <Animated.View style={[s.progressFill, progressStyle]} />
          </View>
          <View style={s.loaderBox}>
            <ActivityIndicator size="small" color={colors.accent} />
            <Text style={s.loadingMessage}>{loadingText}</Text>
          </View>
        </View>
      </View>

      <View style={staticStyles.footer}>
        <Text style={s.footerText}>APP de Entrenamiento Activa</Text>
      </View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { marginBottom: 50, alignItems: 'center' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32 },
  stepDot: { width: 12, height: 6, borderRadius: 3, backgroundColor: c.surfaceBorder, marginRight: 8 },
  stepDotDone: { backgroundColor: c.gold },
  iconCircle: { width: 150, height: 150, backgroundColor: c.surface, borderRadius: 75, justifyContent: 'center', alignItems: 'center', marginBottom: 40, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 5, borderWidth: 1, borderColor: c.surfaceBorder },
  title: { fontSize: 36, fontWeight: '800', color: c.text, textAlign: 'center', letterSpacing: -1 },
  subtitle: { fontSize: 17, color: c.textSecondary, textAlign: 'center', lineHeight: 26, marginTop: 16, paddingHorizontal: 10, fontWeight: '500' },

  progressContainer: { marginTop: 60, width: '100%', alignItems: 'center' },
  progressBackground: { width: '100%', height: 12, backgroundColor: c.surface, borderRadius: 6, overflow: 'hidden', borderWidth: 1, borderColor: c.surfaceBorder },
  progressFill: { height: '100%', backgroundColor: c.accent, borderRadius: 6 },

  loaderBox: { marginTop: 24, alignItems: 'center', flexDirection: 'row' },
  loadingMessage: { marginLeft: 16, fontSize: 15, fontWeight: '700', color: c.textSecondary },
  footerText: { fontSize: 12, color: c.gold, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2, opacity: 0.8 },
});