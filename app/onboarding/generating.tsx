import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

export default function GeneratingScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { colors } = useTheme();
  const [loadingText, setLoadingText] = useState('Analizando biometría');

  useEffect(() => {
    const messages = [
      'Cruzando datos de nivel de actividad...',
      'Calculando gasto calórico basal (TDEE)...',
      'Filtrando base de datos de ejercicios...',
      'Estructurando microciclo semanal...'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex++;
      if (messageIndex < messages.length) {
        setLoadingText(messages[messageIndex]);
      }
    }, 800);

    const timer = setTimeout(() => {
      router.replace('/(tabs)' as any);
    }, 3600);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  const s = dynamicStyles(colors);

  return (
    <View style={s.container}>
      <View style={staticStyles.stepContainer}>
        { [1, 2, 3, 4].map((step) => (
          <View key={step} style={[s.stepDot, s.stepDotDone]} />
        ))}
      </View>

      <View style={staticStyles.content}>
        <Animated.View entering={ZoomIn.duration(800).springify().delay(200)} style={s.iconCircle}>
          <Text style={{fontSize: 70}}>📋</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(400)}>
          <Text style={s.title}>Estructurando plan</Text>
          <Text style={s.subtitle}>
            Cuantificando cargas y ajustando volumen para tu fase de {user.goal?.replace('_', ' ') || 'acondicionamiento'}.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600)} style={s.loaderBox}>
          <ActivityIndicator size="small" color={colors.accentDark} />
          <Text style={s.loadingMessage}>{loadingText}</Text>
        </Animated.View>
      </View>

      <View style={staticStyles.footer}>
        <Text style={s.footerText}>Sincronizando base de datos...</Text>
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
  container: { flex: 1, backgroundColor: c.accent, paddingHorizontal: 32 },
  stepDot: { width: 12, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)', marginRight: 8 },
  stepDotDone: { backgroundColor: c.background },
  iconCircle: { width: 150, height: 150, backgroundColor: c.background, borderRadius: 75, justifyContent: 'center', alignItems: 'center', marginBottom: 40, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 30, elevation: 5 },
  title: { fontSize: 36, fontWeight: '800', color: c.background, textAlign: 'center', letterSpacing: -1 },
  subtitle: { fontSize: 17, color: c.background, textAlign: 'center', lineHeight: 26, marginTop: 16, paddingHorizontal: 10, opacity: 0.9, fontWeight: '500' },
  loaderBox: { marginTop: 60, alignItems: 'center', flexDirection: 'row', backgroundColor: c.background, paddingHorizontal: 28, paddingVertical: 18, borderRadius: 32, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 20 },
  loadingMessage: { marginLeft: 16, fontSize: 15, fontWeight: '700', color: c.accentDark },
  footerText: { fontSize: 13, color: c.background, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2, opacity: 0.8 },
});