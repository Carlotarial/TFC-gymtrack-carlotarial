import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { formatRelativeDate, useWeeklyStats } from '@/hooks/useWeeklyStats';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

export default function ReportScreen() {
  const { user } = useUser();
  const { colors, isDark } = useTheme();
  const weekly = useWeeklyStats(user.workoutHistory);

  const totalMinutes = Math.round(
    user.workoutHistory.reduce((acc, s) => acc + s.durationSecs, 0) / 60
  );

  const s = dynamicStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* HEADER EDITORIAL */}
      <Animated.View entering={FadeInDown.duration(600).easing(Easing.out(Easing.exp))} style={s.header}>
        <View style={s.overlineContainer}>
          <View style={s.overlineDot} />
          <Text style={s.overlineText}>GYMTRACK REPORT</Text>
        </View>
        
        <Text style={s.title}>
          <Text style={s.titleLight}>Tu </Text>
          <Text style={s.titleBold}>Progreso</Text>
          <Text style={s.titleDot}>.</Text>
        </Text>
        
        <Text style={s.subtitle}>Todo esfuerzo tiene su recompensa</Text>
      </Animated.View>

      {/* Stats Grid */}
      <Animated.View entering={FadeInDown.delay(100)} style={staticStyles.statsGrid}>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Calorías</Text>
          <Text style={s.statValue}>{user.kcalBurned.toLocaleString()}</Text>
          <View style={[staticStyles.miniBadge, { backgroundColor: colors.accentLight }]}>
             <Ionicons name="flame" size={10} color={colors.accentDark} style={{ marginRight: 4 }} />
             <Text style={s.badgeText}>KCAL</Text>
          </View>
        </View>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Tiempo</Text>
          <Text style={s.statValue}>{totalMinutes}</Text>
          <View style={[staticStyles.miniBadge, { backgroundColor: colors.goldLight }]}>
            <Ionicons name="time" size={12} color={colors.gold} style={{ marginRight: 4 }} />
            <Text style={[s.badgeText, { color: colors.gold }]}>MIN</Text>
          </View>
        </View>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Sesiones</Text>
          <Text style={s.statValue}>{user.sessionsCompleted}</Text>
          <View style={[staticStyles.miniBadge, { backgroundColor: colors.barInactive }]}>
            <Ionicons name="trophy" size={10} color={colors.textSecondary} style={{ marginRight: 4 }} />
            <Text style={[s.badgeText, { color: colors.textSecondary }]}>TOTAL</Text>
          </View>
        </View>
      </Animated.View>

      {/* Gráfica Premium Semanal */}
      <Animated.View entering={FadeInDown.delay(200)} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Semana Dinámica</Text>
        <View style={s.chartCard}>
          {weekly.totalKcal > 0 ? (
            <View style={staticStyles.chartContainer}>
              <View style={staticStyles.barsRow}>
                {weekly.dailyKcal.map((kcal, index) => {
                  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
                  const isToday = (new Date().getDay() || 7) - 1 === index;
                  const maxHeight = 160;
                  const barHeight = Math.max((kcal / Math.max(...weekly.dailyKcal, 1)) * maxHeight, 6);
                  
                  return (
                    <View key={index} style={staticStyles.barColumn}>
                      {kcal > 0 && (
                        <Text style={s.barValue}>{kcal}</Text>
                      )}
                      <View style={staticStyles.barTrack}>
                        <Animated.View 
                          entering={FadeInDown.delay(index * 100).duration(800)}
                          style={[
                            s.barFill, 
                            { 
                              height: barHeight, 
                              backgroundColor: isToday ? colors.accent : colors.accentLight,
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                            }
                          ]} 
                        />
                      </View>
                      <Text style={[s.chartLabel, isToday && s.chartLabelToday]}>{days[index]}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={s.chartFooter}>
                <Text style={s.chartTotalText}>Total semanal: <Text style={{fontWeight: '800', color: colors.accent}}>{weekly.totalKcal} kcal</Text></Text>
              </View>
            </View>
          ) : (
            <View style={staticStyles.emptyChart}>
              <Ionicons name="bar-chart-outline" size={48} color={colors.textMuted} style={{ marginBottom: 12 }} />
              <Text style={s.emptyText}>Completa tu primer reto para ver tus gráficas pastel brillantes.</Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Historial Real */}
      <Animated.View entering={FadeInDown.delay(300)} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Historial Reciente</Text>
        {user.workoutHistory.length > 0 ? (
          <View style={s.historyCard}>
            {user.workoutHistory.slice(0, 5).map((session, index) => (
              <View key={session.id}>
                {index > 0 && <View style={s.historyDivider} />}
                <View style={staticStyles.historyItem}>
                  <Ionicons name="checkmark-circle" size={28} color={colors.accentLight} style={{ marginRight: 16 }} />
                  <View style={staticStyles.historyInfo}>
                    <Text style={s.historyTitle}>{session.title}</Text>
                    <Text style={s.historyMeta}>
                      {formatRelativeDate(session.date)} • {Math.round(session.durationSecs / 60)} min • {session.kcal} kcal
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={s.emptyHistory}>
            <Ionicons name="leaf-outline" size={48} color={colors.textMuted} style={{ marginBottom: 12 }} />
            <Text style={s.emptyHistoryText}>Tu historial está esperando su primer entrenamiento</Text>
          </View>
        )}
      </Animated.View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const staticStyles = StyleSheet.create({
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 36 },
  miniBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, marginTop: 'auto' },
  section: { marginBottom: 36 },
  emptyChart: { alignItems: 'center', paddingVertical: 32 },
  historyItem: { flexDirection: 'row', paddingVertical: 20, alignItems: 'center' },
  historyInfo: { flex: 1 },
  // Estilos del chart
  chartContainer: { paddingTop: 10 },
  barsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 180, paddingHorizontal: 4 },
  barColumn: { alignItems: 'center', flex: 1 },
  barTrack: { backgroundColor: 'rgba(0,0,0,0.03)', width: 24, height: 160, borderRadius: 12, justifyContent: 'flex-end', overflow: 'hidden' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  
  // Estilos de la cabecera editorial
  header: { marginTop: 50, marginBottom: 35 },
  overlineContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  overlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: c.accent, marginRight: 8 },
  overlineText: { fontSize: 11, fontWeight: '800', color: c.accentDark, letterSpacing: 2 },
  title: { fontSize: 40, letterSpacing: -1 },
  titleLight: { fontWeight: '300', color: c.textSecondary }, 
  titleBold: { fontWeight: '900', color: c.text }, 
  titleDot: { fontWeight: '900', color: c.accent }, 
  subtitle: { fontSize: 15, color: c.textSecondary, marginTop: 8, fontWeight: '500', lineHeight: 22 },
  
  statCard: { backgroundColor: c.surface, width: '31%', borderRadius: 28, padding: 20, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4, alignItems: 'flex-start', minHeight: 120 },
  statLabel: { fontSize: 12, color: c.textSecondary, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 },
  statValue: { fontSize: 26, fontWeight: '800', color: c.text, letterSpacing: -0.5 },
  badgeText: { fontSize: 10, fontWeight: '800', color: c.accentDark },
  
  sectionTitle: { fontSize: 20, fontWeight: '700', color: c.text, marginBottom: 16, letterSpacing: -0.5 },
  
  chartCard: { backgroundColor: c.surface, borderRadius: 36, padding: 24, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  emptyText: { fontSize: 15, color: c.textSecondary, textAlign: 'center', marginTop: 16, lineHeight: 22, fontWeight: '500' },
  
  barFill: { width: '100%', minHeight: 4 },
  barValue: { fontSize: 10, fontWeight: '800', color: c.textSecondary, marginBottom: 4 },
  chartLabel: { fontSize: 13, color: c.textMuted, fontWeight: '700', marginTop: 12 },
  chartLabelToday: { color: c.accent, fontWeight: '900' },
  chartFooter: { marginTop: 24, borderTopWidth: 1, borderTopColor: c.surfaceBorder, paddingTop: 16, alignItems: 'center' },
  chartTotalText: { fontSize: 15, color: c.textSecondary, fontWeight: '600' },
  
  historyCard: { backgroundColor: c.surface, borderRadius: 36, paddingHorizontal: 24, paddingVertical: 8, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  historyTitle: { fontSize: 16, fontWeight: '700', color: c.text },
  historyMeta: { fontSize: 13, color: c.textSecondary, marginTop: 4, fontWeight: '500' },
  historyDivider: { height: 1, backgroundColor: c.surfaceBorder },
  
  emptyHistory: { alignItems: 'center', paddingVertical: 40, backgroundColor: c.surface, borderRadius: 36, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 2 },
  emptyHistoryText: { fontSize: 15, color: c.textSecondary, marginTop: 16, fontWeight: '500' },
});