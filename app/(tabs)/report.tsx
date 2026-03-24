import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ReportScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Progreso 📈</Text>
        <Text style={styles.subtitle}>Todo tu esfuerzo en números</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={24} color="#CDA434" style={styles.statIcon} />
          <Text style={styles.statValue}>1,250</Text>
          <Text style={styles.statLabel}>Kcal</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={24} color="#9CAF88" style={styles.statIcon} />
          <Text style={styles.statValue}>180</Text>
          <Text style={styles.statLabel}>Minutos</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="barbell" size={24} color="#E6CCB2" style={styles.statIcon} />
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Rutinas</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Evolución de Peso ⚖️</Text>
        <View style={styles.chartCard}>
          <View style={styles.mockChart}>
            <View style={[styles.bar, { height: '60%' }]} />
            <View style={[styles.bar, { height: '50%' }]} />
            <View style={[styles.bar, { height: '70%' }]} />
            <View style={[styles.bar, { height: '40%' }]} />
            <View style={[styles.bar, { height: '80%' }]} />
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabelText}>Lun</Text>
            <Text style={styles.chartLabelText}>Mar</Text>
            <Text style={styles.chartLabelText}>Mié</Text>
            <Text style={styles.chartLabelText}>Jue</Text>
            <Text style={styles.chartLabelText}>Vie</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial Reciente 📅</Text>
        
        <View style={styles.historyItem}>
          <View style={styles.historyIconContainer}>
            <Ionicons name="checkmark-circle" size={28} color="#9CAF88" />
          </View>
          <View style={styles.historyTextContainer}>
            <Text style={styles.historyTitle}>Glúteo Firme</Text>
            <Text style={styles.historyDate}>Hoy • 45 min</Text>
          </View>
        </View>

        <View style={styles.historyItem}>
          <View style={styles.historyIconContainer}>
            <Ionicons name="checkmark-circle" size={28} color="#9CAF88" />
          </View>
          <View style={styles.historyTextContainer}>
            <Text style={styles.historyTitle}>Core & Abs</Text>
            <Text style={styles.historyDate}>Ayer • 20 min</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 70,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FAF3E0',
    width: '31%',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EBE0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#8C9A8C',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 15,
  },
  chartCard: {
    backgroundColor: '#E6EBE0',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#9CAF88',
  },
  mockChart: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9CAF88',
  },
  bar: {
    width: 20,
    backgroundColor: '#CDA434',
    borderRadius: 10,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chartLabelText: {
    fontSize: 12,
    color: '#4A5D4A',
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#FAF3E0',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E6EBE0',
  },
  historyIconContainer: {
    marginRight: 15,
  },
  historyTextContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: '#8C9A8C',
  },
});