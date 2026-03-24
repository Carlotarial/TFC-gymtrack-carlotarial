import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function GeneratingScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { colors } = useTheme();
  const [loadingText, setLoadingText] = useState('Analizando tu perfil');

  useEffect(() => {
    const messages = [
      'Analizando tu perfil...',
      'Calculando gasto calórico...',
      'Seleccionando ejercicios...',
      'Personalizando tu plan...'
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
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  const s = dynamicStyles(colors);

  return (
    <Animated.View entering={FadeInRight.duration(400)} style={s.container}>
      <View style={staticStyles.stepContainer}>
        <View style={[s.stepDot, s.stepDotDone]} />
        <View style={[s.stepDot, s.stepDotDone]} />
        <View style={[s.stepDot, s.stepDotDone]} />
        <View style={[s.stepDot, s.stepDotDone]} />
      </View>

      <View style={staticStyles.content}>
        <View style={s.iconCircle}>
          <Ionicons name="sparkles" size={40} color={colors.gold} />
        </View>
        
        <Text style={s.title}>Estamos preparando tu plan</Text>
        <Text style={s.subtitle}>
          Ajustando cada detalle a tus objetivos de {user.goal?.replace('_', ' ') || 'bienestar'}.
        </Text>

        <View style={s.loaderBox}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text style={s.loadingMessage}>{loadingText}</Text>
        </View>
      </View>

      <View style={staticStyles.footer}>
        <Text style={s.footerText}>Casi listo</Text>
      </View>
    </Animated.View>
  );
}

const staticStyles = StyleSheet.create({
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { marginBottom: 50, alignItems: 'center' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32 },
  stepDot: { width: 8, height: 4, borderRadius: 2, backgroundColor: c.accentLight, marginRight: 6 },
  stepDotDone: { backgroundColor: c.accent },
  iconCircle: { width: 100, height: 100, backgroundColor: c.surface, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  title: { fontSize: 28, fontWeight: '700', color: c.text, textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: c.textSecondary, textAlign: 'center', lineHeight: 24, marginTop: 16, paddingHorizontal: 10 },
  loaderBox: { marginTop: 60, alignItems: 'center', flexDirection: 'row', backgroundColor: c.surfaceBorder, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30 },
  loadingMessage: { marginLeft: 12, fontSize: 14, fontWeight: '600', color: c.accentDark },
  footerText: { fontSize: 13, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.5 },
});