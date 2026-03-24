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

  const recommendations = getRecommendedWorkouts(user.goal);
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
          <Text style={s.greeting}>¡Hola, {userName}!</Text>
          <Text style={s.subtitle}>Tu cuerpo te lo agradecerá hoy.</Text>
        </View>
        <Pressable style={s.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </Pressable>
      </Animated.View>

      {/* Métricas Rápidas */}
      <Animated.View entering={FadeInDown.delay(100).duration(600).easing(Easing.out(Easing.exp))} style={s.metricsRow}>
        <View style={staticStyles.metricItem}>
          <Text style={s.metricValue}>{user.streak}</Text>
          <Text style={s.metricLabel}>Días racha</Text>
        </View>
        <View style={s.metricDivider} />
        <View style={staticStyles.metricItem}>
          <Text style={s.metricValue}>{user.kcalBurned}</Text>
          <Text style={s.metricLabel}>Kcal total</Text>
        </View>
        <View style={s.metricDivider} />
        <Pressable style={staticStyles.metricItem} onPress={handleAddWater}>
          <Text style={s.metricValue}>{user.waterIntake.toFixed(1)}L</Text>
          <View style={staticStyles.waterRow}>
            <Text style={s.metricLabel}>Agua </Text>
            <View style={s.waterPlusBtn}>
              <Ionicons name="add" size={12} color={colors.accentDark} />
            </View>
          </View>
        </Pressable>
      </Animated.View>

      {/* Progreso Semanal */}
      <Animated.View entering={FadeInDown.delay(200).duration(600).easing(Easing.out(Easing.exp))} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Progreso semanal</Text>
        <View style={s.card}>
          <View style={staticStyles.progressInfo}>
            <View>
              <Text style={s.progressValue}>{sessionsCompleted} de {totalSessions}</Text>
              <Text style={s.progressLabel}>Sesiones completadas</Text>
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

      {/* Recomendaciones inteligentes */}
      <Animated.View entering={FadeInDown.delay(300).duration(600).easing(Easing.out(Easing.exp))} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Siguiente sesión</Text>
        <View style={staticStyles.grid}>
          {recommendations.map((rec, index) => (
            <Pressable
              key={rec.id}
              style={s.gridCard}
              onPress={() => router.push({ pathname: '/routine', params: { title: rec.title } } as any)}
            >
              <View style={[staticStyles.cardIconBox, { backgroundColor: colors.accentLight }]}>
                <Ionicons name={rec.icon as any} size={24} color={colors.accentDark} />
              </View>
              <Text style={s.cardTitle}>{rec.title}</Text>
              <Text style={s.cardTag}>{rec.intensity}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* Tip del día rotativo */}
      <Animated.View entering={FadeInDown.delay(400).duration(600).easing(Easing.out(Easing.exp))} style={s.tipCard}>
        <Ionicons name={tip.icon as any} size={24} color={colors.accent} />
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
  metricItem: { alignItems: 'center' },
  waterRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  section: { marginBottom: 32 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  cardIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  tipContent: { marginLeft: 16, flex: 1 },
});

// Estilos dinámicos
const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 28, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: c.textSecondary, marginTop: 4 },
  notificationBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: c.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: c.surfaceBorder },
  metricsRow: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: 24, padding: 20, marginBottom: 32, alignItems: 'center', justifyContent: 'space-around', borderWidth: 1, borderColor: c.surfaceBorder },
  metricValue: { fontSize: 18, fontWeight: '700', color: c.text },
  metricLabel: { fontSize: 12, color: c.textSecondary },
  metricDivider: { width: 1, height: 30, backgroundColor: c.divider },
  waterPlusBtn: { width: 18, height: 18, borderRadius: 9, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: c.text, marginBottom: 16 },
  card: { backgroundColor: c.surface, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: c.surfaceBorder },
  progressValue: { fontSize: 24, fontWeight: '700', color: c.text },
  progressLabel: { fontSize: 14, color: c.textSecondary },
  percentageBadge: { backgroundColor: c.accentLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  percentageText: { fontSize: 12, fontWeight: '700', color: c.accentDark },
  barBackground: { height: 8, backgroundColor: c.barInactive, borderRadius: 4, overflow: 'hidden' as const },
  barFill: { height: 8, backgroundColor: c.barActive, borderRadius: 4 },
  gridCard: { width: '47%' as any, backgroundColor: c.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: c.surfaceBorder },
  cardTitle: { fontSize: 15, fontWeight: '600', color: c.text },
  cardTag: { fontSize: 12, color: c.textSecondary, marginTop: 4 },
  tipCard: { flexDirection: 'row' as const, backgroundColor: c.accentLight, padding: 20, borderRadius: 24, alignItems: 'center' as const },
  tipTitle: { fontSize: 14, fontWeight: '700', color: c.accentDark, marginBottom: 2 },
  tipText: { fontSize: 13, color: c.textSecondary, lineHeight: 18 },
});