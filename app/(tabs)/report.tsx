import { Ionicons } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ReportScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Progreso</Text>
        <Text style={styles.subtitle}>Análisis detallado de tu actividad</Text>
      </View>

      {/* Stats Grid Refinado */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Calorías</Text>
          <Text style={styles.statValue}>1,250</Text>
          <View style={[styles.miniBadge, { backgroundColor: '#E6EBE0' }]}>
            <Text style={styles.badgeText}>kcal</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Tiempo</Text>
          <Text style={styles.statValue}>180</Text>
          <View style={[styles.miniBadge, { backgroundColor: '#F0F2ED' }]}>
            <Text style={styles.badgeText}>min</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Sesiones</Text>
          <Text style={styles.statValue}>4</Text>
          <View style={[styles.miniBadge, { backgroundColor: '#FAF3E0' }]}>
            <Text style={styles.badgeText}>rutinas</Text>
          </View>
        </View>
      </View>

      {/* Gráfica Estilizada */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad semanal</Text>
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartMainValue}>+12%</Text>
            <Text style={styles.chartSubtext}>vs semana anterior</Text>
          </View>
          
          <View style={styles.mockChart}>
            {[60, 45, 75, 50, 85, 40, 65].map((height, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={[styles.bar, { height: `${height}%` }, index === 4 && styles.barActive]} />
              </View>
            ))}
          </View>
          
          <View style={styles.chartLabels}>
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
              <Text key={day} style={styles.chartLabelText}>{day}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Historial Reciente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de sesiones</Text>
        
        <View style={styles.historyCard}>
          <View style={styles.historyItem}>
            <View style={styles.iconCircle}>
              <Ionicons name="fitness-outline" size={20} color="#4A5D4A" />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Tren Inferior</Text>
              <Text style={styles.historyMeta}>Hoy • 45 min • 320 kcal</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C1C7C1" />
          </View>

          <View style={styles.historyDivider} />

          <View style={styles.historyItem}>
            <View style={styles.iconCircle}>
              <Ionicons name="accessibility-outline" size={20} color="#4A5D4A" />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Zona Core</Text>
              <Text style={styles.historyMeta}>Ayer • 20 min • 150 kcal</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C1C7C1" />
          </View>
        </View>
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
  historyCard: { backgroundColor: '#FFFFFF', borderRadius: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: '#F0F2ED' },
  historyItem: { flexDirection: 'row', paddingVertical: 20, alignItems: 'center' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FDFBF6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  historyInfo: { flex: 1 },
  historyTitle: { fontSize: 16, fontWeight: '600', color: '#1A1C1A' },
  historyMeta: { fontSize: 13, color: '#8C9A8C', marginTop: 2 },
  historyDivider: { height: 1, backgroundColor: '#F0F2ED' },
});