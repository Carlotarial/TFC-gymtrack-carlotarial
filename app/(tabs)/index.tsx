import { useMemo } from 'react';
import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { getDailyTip } from '@/data/tips';
import { getRecommendedWorkouts } from '@/data/workouts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();
  const { user, updateWater } = useUser();
  const { colors } = useTheme();

  const userName = user.name || 'Usuario GymTrack';
  const sessionsCompleted = user.sessionsCompleted;
  const totalSessions = 4;
  const progressPercent = Math.min((sessionsCompleted / totalSessions) * 100, 100);

  const recommendations = getRecommendedWorkouts(user.goal, user.activityLevel);
  const goalLabel = useMemo(() => {
    if (user.goal === 'perder_peso') return 'para quemar';
    if (user.goal === 'ganar_musculo') return 'de potencia';
    if (user.goal === 'tonificar') return 'de definición';
    return 'para brillar';
  }, [user.goal]);

  const tip = getDailyTip();

  const handleAddWater = () => {
    updateWater(Math.round((user.waterIntake + 0.25) * 100) / 100);
  };

  const s = dynamicStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera */}
      <Animated.View entering={FadeInDown.duration(600).easing(Easing.out(Easing.exp))} style={s.header}>
        <View>
          <Text style={s.greeting}>Hola, {userName} ✨</Text>
          <Text style={s.subtitle}>Preparados para brillar hoy.</Text>
        </View>
        <Pressable style={s.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.accentDark} />
        </Pressable>
      </Animated.View>

      {/* Métricas Rápidas (Estilo Burbujas) */}
      <Animated.View entering={FadeInDown.delay(100).duration(600).easing(Easing.out(Easing.exp))} style={s.metricsRow}>
        <View style={staticStyles.metricItem}>
           <Text style={s.metricEmoji}>🔥</Text>
          <Text style={s.metricValue}>{user.streak}</Text>
          <Text style={s.metricLabel}>Racha</Text>
        </View>
        <View style={s.metricDivider} />
        <View style={staticStyles.metricItem}>
          <Text style={s.metricEmoji}>⚡</Text>
          <Text style={s.metricValue}>{user.kcalBurned}</Text>
          <Text style={s.metricLabel}>Energía</Text>
        </View>
        <View style={s.metricDivider} />
        <Pressable style={staticStyles.metricItem} onPress={handleAddWater}>
          <Text style={s.metricEmoji}>💧</Text>
          <Text style={s.metricValue}>{user.waterIntake.toFixed(1)}L</Text>
          <Text style={s.metricLabel}>Beber</Text>
        </Pressable>
      </Animated.View>

      {/* Progreso Semanal Pastel */}
      <Animated.View entering={FadeInDown.delay(200).duration(600).easing(Easing.out(Easing.exp))} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Progreso semanal</Text>
        <View style={s.card}>
          <View style={staticStyles.progressInfo}>
            <View>
              <Text style={s.progressValue}>{sessionsCompleted} <Text style={{color: colors.textMuted}}>/ {totalSessions}</Text></Text>
              <Text style={s.progressLabel}>Entrenamientos listos</Text>
            </View>
            <View style={s.percentageBadge}>
              <Text style={s.percentageText}>{Math.round(progressPercent)}%</Text>
            </View>
          </View>
          <View style={s.barBackground}>
            <Animated.View
              entering={FadeInRight.delay(500).duration(800).springify()}
              style={[s.barFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </View>
      </Animated.View>

      {/* Recomendaciones inteligentes (Cards suaves) */}
      <Animated.View entering={FadeInDown.delay(300).duration(600).easing(Easing.out(Easing.exp))} style={staticStyles.section}>
        <View style={staticStyles.sectionHeaderRow}>
          <Text style={s.sectionTitle}>Siguiente sesión</Text>
          <View style={s.goalBadge}>
            <Text style={s.goalBadgeText}>{goalLabel}</Text>
          </View>
        </View>
        <View style={staticStyles.grid}>
          {recommendations.map((rec, index) => (
            <Pressable
              key={rec.id}
              style={s.gridCard}
              onPress={() => router.push({ pathname: '/routine', params: { id: rec.id, title: rec.title } } as any)}
            >
              <View style={s.recommendedBadge}>
                <Text style={s.recommendedBadgeText}>✨ Para ti</Text>
              </View>
              <View style={[s.cardIconBox]}>
                <Ionicons name={rec.icon as any} size={28} color={colors.accentDark} />
              </View>
              <Text style={s.cardTitle}>{rec.title}</Text>
              <Text style={s.cardTag}>{rec.intensity}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* Tip del día rotativo */}
      <Animated.View entering={FadeInDown.delay(400).duration(600).easing(Easing.out(Easing.exp))} style={s.tipCard}>
        <View style={s.tipIconBox}>
           <Text style={{fontSize: 22}}>💡</Text>
        </View>
        <View style={staticStyles.tipContent}>
          <Text style={s.tipTitle}>{tip.title}</Text>
          <Text style={s.tipText}>{tip.text}</Text>
        </View>
      </Animated.View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

// Estilos estáticos
const staticStyles = StyleSheet.create({
  metricItem: { alignItems: 'center', flex: 1 },
  section: { marginBottom: 35 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  tipContent: { marginLeft: 16, flex: 1 },
});

// Estilos dinámicos
const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4, fontWeight: '500' },
  
  notificationBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: c.surface, justifyContent: 'center', alignItems: 'center', shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 4 },
  
  metricsRow: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: 32, paddingVertical: 24, paddingHorizontal: 10, marginBottom: 40, alignItems: 'center', justifyContent: 'space-around', shadowColor: c.accentDark, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.06, shadowRadius: 32, elevation: 5 },
  metricEmoji: { fontSize: 24, marginBottom: 8 },
  metricValue: { fontSize: 20, fontWeight: '800', color: c.text },
  metricLabel: { fontSize: 13, color: c.textSecondary, fontWeight: '600', marginTop: 2 },
  metricDivider: { width: 1, height: 40, backgroundColor: c.divider },
  
  sectionTitle: { fontSize: 20, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  
  goalBadge: { backgroundColor: c.accentLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  goalBadgeText: { fontSize: 12, fontWeight: '800', color: c.accent, textTransform: 'uppercase' },

  card: { backgroundColor: c.surface, borderRadius: 32, padding: 28, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  progressValue: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  progressLabel: { fontSize: 14, color: c.textSecondary, fontWeight: '600', marginTop: 4 },
  percentageBadge: { backgroundColor: c.accentLight, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  percentageText: { fontSize: 14, fontWeight: '800', color: c.accentDark },
  barBackground: { height: 12, backgroundColor: c.barInactive, borderRadius: 6, overflow: 'hidden' as const },
  barFill: { height: 12, backgroundColor: c.barActive, borderRadius: 6 },
  
  gridCard: { width: '47%' as any, backgroundColor: c.surface, borderRadius: 32, padding: 24, paddingTop: 32, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4, position: 'relative' },
  recommendedBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: c.goldLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  recommendedBadgeText: { fontSize: 10, fontWeight: '800', color: c.gold },

  cardIconBox: { width: 54, height: 54, borderRadius: 20, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  cardTag: { fontSize: 13, color: c.textSecondary, marginTop: 6, fontWeight: '600' },
  
  tipCard: { flexDirection: 'row' as const, backgroundColor: c.goldLight, padding: 24, borderRadius: 32, alignItems: 'center' as const, shadowColor: c.gold, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 3 },
  tipIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', opacity: 0.9 },
  tipTitle: { fontSize: 15, fontWeight: '800', color: c.gold, marginBottom: 4 },
  tipText: { fontSize: 14, color: c.textSecondary, lineHeight: 22, fontWeight: '500' },
});