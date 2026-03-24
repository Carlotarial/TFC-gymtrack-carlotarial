import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ReportScreen() {
  const { user } = useUser();

  // Calcular minutos totales del historial
  const totalMinutes = Math.round(
    user.workoutHistory.reduce((acc, s) => acc + s.durationSecs, 0) / 60
  );

  // Calcular actividad por día de la semana (L-D) a partir del historial
  const getWeeklyActivity = () => {
    const dayMap = [0, 0, 0, 0, 0, 0, 0]; // L M X J V S D
    user.workoutHistory.forEach((session) => {
      const date = new Date(session.date);
      const day = date.getDay(); // 0=domingo
      // Convertir a L=0, M=1... D=6
      const index = day === 0 ? 6 : day - 1;
      dayMap[index] += session.kcal;
    });
    // Normalizar a porcentajes (max = 100%)
    const max = Math.max(...dayMap, 1);
    return dayMap.map((val) => Math.round((val / max) * 100));
  };

  const weeklyBars = getWeeklyActivity();
  const hasActivity = weeklyBars.some((v) => v > 0);

  // Formatear fecha relativa
  const formatRelativeDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Progreso</Text>
        <Text style={styles.subtitle}>Análisis detallado de tu actividad</Text>
      </View>

      {/* Stats Grid — Datos reales */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Calorías</Text>
          <Text style={styles.statValue}>{user.kcalBurned.toLocaleString()}</Text>
          <View style={[styles.miniBadge, { backgroundColor: '#E6EBE0' }]}>
            <Text style={styles.badgeText}>kcal</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Tiempo</Text>
          <Text style={styles.statValue}>{totalMinutes}</Text>
          <View style={[styles.miniBadge, { backgroundColor: '#F0F2ED' }]}>
            <Text style={styles.badgeText}>min</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Sesiones</Text>
          <Text style={styles.statValue}>{user.sessionsCompleted}</Text>
          <View style={[styles.miniBadge, { backgroundColor: '#FAF3E0' }]}>
            <Text style={styles.badgeText}>rutinas</Text>
          </View>
        </View>
      </View>

      {/* Gráfica Semanal — Datos reales */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad semanal</Text>
        <View style={styles.chartCard}>
          {hasActivity ? (
            <>
              <View style={styles.chartHeader}>
                <Text style={styles.chartMainValue}>{user.sessionsCompleted} sesiones</Text>
                <Text style={styles.chartSubtext}>esta semana</Text>
              </View>
              
              <View style={styles.mockChart}>
                {weeklyBars.map((height, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: `${Math.max(height, 5)}%` }, height > 0 && styles.barActive]} />
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.emptyChart}>
              <Ionicons name="bar-chart-outline" size={32} color="#E6EBE0" />
              <Text style={styles.emptyText}>Completa tu primer entrenamiento para ver tu progreso aquí</Text>
            </View>
          )}
          
          <View style={styles.chartLabels}>
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
              <Text key={day} style={styles.chartLabelText}>{day}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Historial Real */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de sesiones</Text>
        
        {user.workoutHistory.length > 0 ? (
          <View style={styles.historyCard}>
            {user.workoutHistory.slice(0, 5).map((session, index) => (
              <View key={session.id}>
                {index > 0 && <View style={styles.historyDivider} />}
                <View style={styles.historyItem}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="fitness-outline" size={20} color="#4A5D4A" />
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{session.title}</Text>
                    <Text style={styles.historyMeta}>
                      {formatRelativeDate(session.date)} • {Math.round(session.durationSecs / 60)} min • {session.kcal} kcal
                    </Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#9CAF88" />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyHistory}>
            <Ionicons name="calendar-outline" size={40} color="#E6EBE0" />
            <Text style={styles.emptyHistoryText}>Aún no tienes sesiones completadas</Text>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: '#1A1C1A', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#8C9A8C', marginTop: 4 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F2ED',
    alignItems: 'flex-start',
  },
  statLabel: { fontSize: 12, color: '#8C9A8C', fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontSize: 22, fontWeight: '700', color: '#1A1C1A', marginBottom: 8 },
  miniBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#4A5D4A' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1A1C1A', marginBottom: 16 },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  chartHeader: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 24 },
  chartMainValue: { fontSize: 20, fontWeight: '700', color: '#9CAF88', marginRight: 8 },
  chartSubtext: { fontSize: 13, color: '#8C9A8C' },
  mockChart: { height: 100, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 },
  barWrapper: { width: 12, height: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', backgroundColor: '#F0F2ED', borderRadius: 6 },
  barActive: { backgroundColor: '#9CAF88' },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2 },
  chartLabelText: { fontSize: 12, color: '#C1C7C1', fontWeight: '600' },
  emptyChart: { alignItems: 'center', paddingVertical: 24 },
  emptyText: { fontSize: 14, color: '#8C9A8C', textAlign: 'center', marginTop: 12, lineHeight: 20 },
  historyCard: { backgroundColor: '#FFFFFF', borderRadius: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: '#F0F2ED' },
  historyItem: { flexDirection: 'row', paddingVertical: 20, alignItems: 'center' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FDFBF6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  historyInfo: { flex: 1 },
  historyTitle: { fontSize: 16, fontWeight: '600', color: '#1A1C1A' },
  historyMeta: { fontSize: 13, color: '#8C9A8C', marginTop: 2 },
  historyDivider: { height: 1, backgroundColor: '#F0F2ED' },
  emptyHistory: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#FFFFFF', borderRadius: 24, borderWidth: 1, borderColor: '#F0F2ED' },
  emptyHistoryText: { fontSize: 15, color: '#8C9A8C', marginTop: 12 },
});