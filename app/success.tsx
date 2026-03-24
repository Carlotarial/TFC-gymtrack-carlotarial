import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme, AppColors } from '@/context/ThemeContext';

export default function SuccessScreen() {
  const router = useRouter();
  const { seconds } = useLocalSearchParams();
  const { user, updateUser } = useUser();
  const { colors } = useTheme();
  const hasRecorded = useRef(false);

  // Lógica de cálculo
  const elapsedSeconds = parseInt(seconds as string, 10) || 0;
  const minutes = Math.floor(elapsedSeconds / 60);
  const kcal = Math.round((elapsedSeconds / 60) * 7) || 320; // 320 kcal de media si falla el timer

  useEffect(() => {
    if (!hasRecorded.current) {
      hasRecorded.current = true;
      // Actualizamos el "Cerebro" de la app con los nuevos datos reales
      updateUser({
        sessionsCompleted: (user.sessionsCompleted || 0) + 1,
        kcalBurned: (user.kcalBurned || 0) + kcal,
        streak: (user.streak || 0) + 1
      });
    }
  }, []);

  const s = dynamicStyles(colors);

  return (
    <SafeAreaView style={s.container}>
      <View style={staticStyles.content}>
        {/* Círculo de Trofeo Minimalista */}
        <View style={s.iconCircle}>
          <View style={s.innerCircle}>
            <Ionicons name="trophy" size={60} color={colors.gold} />
          </View>
        </View>

        <Text style={s.title}>¡Reto Completado!</Text>
        <Text style={s.subtitle}>
          Buen trabajo, {user.name}. Has dado un paso más hacia tu objetivo de {user.goal?.replace('_', ' ') || 'bienestar'}.
        </Text>

        {/* Tarjeta de Estadísticas Estilo Home */}
        <View style={s.statsCard}>
          <View style={staticStyles.statBox}>
            <Text style={s.statNumber}>{minutes > 0 ? minutes : '1'}</Text>
            <Text style={s.statLabel}>Minutos</Text>
          </View>

          <View style={s.divider} />

          <View style={staticStyles.statBox}>
            <Text style={s.statNumber}>{kcal}</Text>
            <Text style={s.statLabel}>Kcal</Text>
          </View>
        </View>

        {/* Mensaje de motivación */}
        <View style={s.badge}>
          <Ionicons name="flash" size={16} color={colors.accentDark} />
          <Text style={s.badgeText}>Tu racha ha subido a {user.streak + 1} días</Text>
        </View>
      </View>

      <View style={staticStyles.footer}>
        <Pressable style={s.homeButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={s.homeButtonText}>Finalizar sesión</Text>
          <Ionicons name="checkmark-circle" size={20} color={colors.buttonPrimaryText} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const staticStyles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  statBox: { alignItems: 'center' },
  footer: {
    paddingBottom: 40
  },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.background,
    paddingHorizontal: 24
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: c.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: c.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: c.text,
    marginBottom: 12,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: c.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: c.surface,
    borderRadius: 28,
    padding: 32,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.surfaceBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: c.text,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: c.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600'
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: c.divider
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.accentLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 32
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: c.accentDark,
    marginLeft: 8
  },
  homeButton: {
    flexDirection: 'row',
    backgroundColor: c.buttonPrimary,
    padding: 22,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: c.buttonPrimaryText,
    marginRight: 10
  },
});