import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  
  const userName = user.name || 'Usuario GymTrack';
  
  // Datos reactivos del contexto
  const sessionsCompleted = user.sessionsCompleted;
  const totalSessions = 4;
  const progressPercent = Math.min((sessionsCompleted / totalSessions) * 100, 100);

  // Recomendaciones inteligentes basadas en el objetivo
  const getRecommendations = () => {
    if (user.goal === 'perder_peso') {
      return [
        { title: 'Circuito HIIT', intensity: 'Intensidad Alta', icon: 'flame-outline', bgColor: '#FAF3E0', iconColor: '#CDA434' },
        { title: 'Cardio Activo', intensity: 'Intensidad Media', icon: 'bicycle-outline', bgColor: '#E6EBE0', iconColor: '#4A5D4A' },
      ];
    }
    if (user.goal === 'ganar_musculo') {
      return [
        { title: 'Fuerza Total', intensity: 'Intensidad Alta', icon: 'barbell-outline', bgColor: '#E6EBE0', iconColor: '#4A5D4A' },
        { title: 'Hipertrofia', intensity: 'Intensidad Media', icon: 'fitness-outline', bgColor: '#FAF3E0', iconColor: '#CDA434' },
      ];
    }
    return [
      { title: 'Tren Inferior', intensity: 'Intensidad Media', icon: 'fitness-outline', bgColor: '#E6EBE0', iconColor: '#4A5D4A' },
      { title: 'Zona Core', intensity: 'Intensidad Suave', icon: 'accessibility-outline', bgColor: '#FAF3E0', iconColor: '#CDA434' },
    ];
  };

  const recommendations = getRecommendations();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, {userName} 👋</Text>
          <Text style={styles.subtitle}>Tu cuerpo te lo agradecerá hoy.</Text>
        </View>
        <Pressable style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1A1C1A" />
        </Pressable>
      </View>

      {/* Métricas Rápidas — Datos reales del contexto */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{user.streak}</Text>
          <Text style={styles.metricLabel}>Días racha</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{user.kcalBurned}</Text>
          <Text style={styles.metricLabel}>Kcal total</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{user.waterIntake.toFixed(1)}L</Text>
          <Text style={styles.metricLabel}>Agua</Text>
        </View>
      </View>

      {/* Tarjeta de Progreso — Datos reales */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progreso semanal</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <View>
              <Text style={styles.progressValue}>{sessionsCompleted} de {totalSessions}</Text>
              <Text style={styles.progressLabel}>Sesiones completadas</Text>
            </View>
            <View style={styles.percentageBadge}>
              <Text style={styles.percentageText}>{Math.round(progressPercent)}%</Text>
            </View>
          </View>
          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>
      </View>

      {/* Entrenamientos recomendados según objetivo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Siguiente sesión</Text>
        <View style={styles.grid}>
          {recommendations.map((rec, index) => (
            <Pressable 
              key={index}
              style={styles.gridCard} 
              onPress={() => router.push({ pathname: '/routine', params: { title: rec.title } } as any)}
            >
              <View style={[styles.cardIconBox, { backgroundColor: rec.bgColor }]}>
                <Ionicons name={rec.icon as any} size={24} color={rec.iconColor} />
              </View>
              <Text style={styles.cardTitle}>{rec.title}</Text>
              <Text style={styles.cardTag}>{rec.intensity}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Tip del día */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#9CAF88" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Sabías que...</Text>
          <Text style={styles.tipText}>
            Beber agua antes de entrenar mejora tu rendimiento hasta un 25%.
          </Text>
        </View>
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 80,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1C1A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8C9A8C',
    marginTop: 4,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1C1A',
  },
  metricLabel: {
    fontSize: 12,
    color: '#8C9A8C',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#F0F2ED',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1C1A',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1C1A',
  },
  progressLabel: {
    fontSize: 14,
    color: '#8C9A8C',
  },
  percentageBadge: {
    backgroundColor: '#E6EBE0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A5D4A',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#F0F2ED',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: '#9CAF88',
    borderRadius: 4,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1C1A',
  },
  cardTag: {
    fontSize: 12,
    color: '#8C9A8C',
    marginTop: 4,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F0',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  tipContent: {
    marginLeft: 16,
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5D4A',
    marginBottom: 2,
  },
  tipText: {
    fontSize: 13,
    color: '#6B7A6B',
    lineHeight: 18,
  },
});