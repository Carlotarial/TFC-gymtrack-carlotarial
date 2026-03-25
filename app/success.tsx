import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme, AppColors } from '@/context/ThemeContext';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

export default function SuccessScreen() {
  const router = useRouter();
  const { seconds, title } = useLocalSearchParams();
  const { user, completeWorkout } = useUser();
  const { colors } = useTheme();
  const hasRecorded = useRef(false);

  const elapsedSeconds = parseInt(seconds as string, 10) || 0;
  const workoutTitle = (title as string) || 'Entrenamiento';
  const minutes = Math.floor(elapsedSeconds / 60);
  const kcal = Math.round((elapsedSeconds / 60) * 7) || 320; 

  useEffect(() => {
    if (!hasRecorded.current) {
      hasRecorded.current = true;
      completeWorkout(workoutTitle, elapsedSeconds, kcal);
    }
  }, []);

  const s = dynamicStyles(colors);

  return (
    <SafeAreaView style={s.container}>
      <View style={staticStyles.content}>
        
        {/* Cofre de Emoji Animado */}
        <Animated.View entering={ZoomIn.duration(800).springify()} style={s.iconCircle}>
          <Text style={{fontSize: 70}}>🏆</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={s.title}>¡Reto Completado!</Text>
          <Text style={s.subtitle}>
            Genial {user.name}, un paso más hacia tus objetivos. Eres increíble.
          </Text>
        </Animated.View>

        {/* Tarjeta de Estadísticas Estilo Pastel */}
        <Animated.View entering={FadeInDown.delay(400)} style={s.statsCard}>
          <View style={staticStyles.statBox}>
            <Text style={s.statNumber}>{minutes > 0 ? minutes : '1'}</Text>
            <Text style={s.statLabel}>MINUTOS</Text>
          </View>

          <View style={s.divider} />

          <View style={staticStyles.statBox}>
            <Text style={s.statNumber}>{kcal}</Text>
            <Text style={s.statLabel}>KCAL</Text>
          </View>
        </Animated.View>

        {/* Mensaje de motivación */}
        <Animated.View entering={FadeInDown.delay(600)} style={s.badge}>
          <Text style={{fontSize: 18}}>🔥</Text>
          <Text style={s.badgeText}>Tu racha ha subido a {user.streak + 1} días</Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(800)} style={staticStyles.footer}>
        <Pressable style={s.homeButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={s.homeButtonText}>Finalizar aventura</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const staticStyles = StyleSheet.create({
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  statBox: { alignItems: 'center' },
  footer: { paddingBottom: 40 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  iconCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: c.goldLight, justifyContent: 'center', alignItems: 'center', marginBottom: 32, shadowColor: c.gold, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 30, elevation: 5 },
  title: { fontSize: 36, fontWeight: '800', color: c.text, marginBottom: 12, textAlign: 'center', letterSpacing: -1 },
  subtitle: { fontSize: 17, color: c.textSecondary, textAlign: 'center', lineHeight: 26, marginBottom: 40, paddingHorizontal: 10, fontWeight: '500' },
  statsCard: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: 36, paddingVertical: 36, paddingHorizontal: 16, width: '100%', justifyContent: 'space-around', alignItems: 'center', shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  statNumber: { fontSize: 40, fontWeight: '800', color: c.accent, marginBottom: 4 },
  statLabel: { fontSize: 12, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: '700' },
  divider: { width: 1, height: 60, backgroundColor: c.surfaceBorder },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.accentLight, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, marginTop: 32 },
  badgeText: { fontSize: 16, fontWeight: '700', color: c.accentDark, marginLeft: 8 },
  homeButton: { flexDirection: 'row', backgroundColor: c.accent, padding: 24, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: c.accent, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 5 },
  homeButtonText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
});