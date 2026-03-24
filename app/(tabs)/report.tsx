import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { formatRelativeDate, useWeeklyStats } from '@/hooks/useWeeklyStats';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function ReportScreen() {
  const { user } = useUser();
  const { colors } = useTheme();
  const weekly = useWeeklyStats(user.workoutHistory);

  const totalMinutes = Math.round(
    user.workoutHistory.reduce((acc, s) => acc + s.durationSecs, 0) / 60
  );

  const screenWidth = Dimensions.get('window').width;
  const s = dynamicStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.title}>Tu Progreso</Text>
        <Text style={s.subtitle}>Análisis detallado de tu actividad</Text>
      </View>

      {/* Stats Grid */}
      <View style={staticStyles.statsGrid}>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Calorías</Text>
          <Text style={s.statValue}>{user.kcalBurned.toLocaleString()}</Text>
          <View style={[staticStyles.miniBadge, { backgroundColor: colors.accentLight }]}>
            <Text style={s.badgeText}>kcal</Text>
          </View>
        </View>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Tiempo</Text>
          <Text style={s.statValue}>{totalMinutes}</Text>
          <View style={[staticStyles.miniBadge, { backgroundColor: colors.barInactive }]}>
            <Text style={s.badgeText}>min</Text>
          </View>
        </View>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Sesiones</Text>
          <Text style={s.statValue}>{user.sessionsCompleted}</Text>
          <View style={[staticStyles.miniBadge, { backgroundColor: colors.goldLight }]}>
            <Text style={s.badgeText}>rutinas</Text>
          </View>
        </View>
      </View>

      {/* Gráfica Real Semanal */}
      <View style={staticStyles.section}>
        <Text style={s.sectionTitle}>Actividad semanal (Kcal)</Text>
        <View style={s.chartCard}>
          {weekly.totalKcal > 0 ? (
            <BarChart
              data={{
                labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
                datasets: [{ data: weekly.dailyKcal }],
              }}
              width={screenWidth - 80} // 48 padding de container + 32 padding de card
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: colors.surface,
                backgroundGradientFrom: colors.surface,
                backgroundGradientTo: colors.surface,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(156, 175, 136, ${opacity})`, // Verde salvia base (#9CAF88)
                labelColor: (opacity = 1) => colors.textSecondary,
                style: { borderRadius: 16 },
                barPercentage: 0.6,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                marginLeft: -10, // Ajuste visual de la librería
              }}
              showValuesOnTopOfBars
              fromZero
            />
          ) : (
            <View style={staticStyles.emptyChart}>
              <Ionicons name="bar-chart-outline" size={32} color={colors.accentLight} />
              <Text style={s.emptyText}>Completa tu primer entrenamiento para ver tu progreso aquí</Text>
            </View>
          )}
        </View>
      </View>

      {/* Historial Real */}
      <View style={staticStyles.section}>
        <Text style={s.sectionTitle}>Historial de sesiones</Text>
        {user.workoutHistory.length > 0 ? (
          <View style={s.historyCard}>
            {user.workoutHistory.slice(0, 5).map((session, index) => (
              <View key={session.id}>
                {index > 0 && <View style={s.historyDivider} />}
                <View style={staticStyles.historyItem}>
                  <View style={s.iconCircle}>
                    <Ionicons name="fitness-outline" size={20} color={colors.accentDark} />
                  </View>
                  <View style={staticStyles.historyInfo}>
                    <Text style={s.historyTitle}>{session.title}</Text>
                    <Text style={s.historyMeta}>
                      {formatRelativeDate(session.date)} • {Math.round(session.durationSecs / 60)} min • {session.kcal} kcal
                    </Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={s.emptyHistory}>
            <Ionicons name="calendar-outline" size={40} color={colors.accentLight} />
            <Text style={s.emptyHistoryText}>Aún no tienes sesiones completadas</Text>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const staticStyles = StyleSheet.create({
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  miniBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  section: { marginBottom: 32 },
  emptyChart: { alignItems: 'center', paddingVertical: 24 },
  historyItem: { flexDirection: 'row', paddingVertical: 20, alignItems: 'center' },
  historyInfo: { flex: 1 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4 },
  statCard: { backgroundColor: c.surface, width: '31%', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: c.surfaceBorder, alignItems: 'flex-start' },
  statLabel: { fontSize: 12, color: c.textSecondary, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontSize: 22, fontWeight: '700', color: c.text, marginBottom: 8 },
  badgeText: { fontSize: 10, fontWeight: '700', color: c.accentDark },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: c.text, marginBottom: 16 },
  chartCard: { backgroundColor: c.surface, borderRadius: 24, paddingVertical: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: c.surfaceBorder },
  emptyText: { fontSize: 14, color: c.textSecondary, textAlign: 'center', marginTop: 12, lineHeight: 20 },
  historyCard: { backgroundColor: c.surface, borderRadius: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: c.surfaceBorder },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: c.background, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  historyTitle: { fontSize: 16, fontWeight: '600', color: c.text },
  historyMeta: { fontSize: 13, color: c.textSecondary, marginTop: 2 },
  historyDivider: { height: 1, backgroundColor: c.divider },
  emptyHistory: { alignItems: 'center', paddingVertical: 40, backgroundColor: c.surface, borderRadius: 24, borderWidth: 1, borderColor: c.surfaceBorder },
  emptyHistoryText: { fontSize: 15, color: c.textSecondary, marginTop: 12 },
});