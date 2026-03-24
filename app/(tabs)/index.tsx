import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Recogemos el nombre del cuestionario o usamos 'Carlota' por defecto
  const userName = params.userName || 'Carlota';
  
  // Estados para la lógica de progreso
  const [sessionsCompleted] = useState(3);
  const totalSessions = 4;
  const progressPercent = (sessionsCompleted / totalSessions) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera Minimalista */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, {userName}</Text>
        <Text style={styles.subtitle}>Progreso de tu plan actual</Text>
      </View>

      {/* Tarjeta de Progreso Principal */}
      <View style={styles.section}>
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

      {/* Sección de Rutinas Recomendadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entrenamientos recomendados</Text>
        
        <View style={styles.grid}>
          <Pressable 
            style={styles.gridCard} 
            onPress={() => router.push({ 
              pathname: '/routine', 
              params: { title: 'Tren Inferior' } 
            } as any)}
          >
            <View style={styles.cardIconBox}>
              <Ionicons name="fitness-outline" size={24} color="#4A5D4A" />
            </View>
            <Text style={styles.cardTitle}>Tren Inferior</Text>
            <Text style={styles.cardTag}>Intensidad Media</Text>
          </Pressable>

          <Pressable 
            style={styles.gridCard} 
            onPress={() => router.push({ 
              pathname: '/routine', 
              params: { title: 'Zona Core' } 
            } as any)}
          >
            <View style={styles.cardIconBox}>
              <Ionicons name="accessibility-outline" size={24} color="#4A5D4A" />
            </View>
            <Text style={styles.cardTitle}>Zona Core</Text>
            <Text style={styles.cardTag}>Intensidad Suave</Text>
          </Pressable>
        </View>
      </View>

      {/* Reto Activo Sutil */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reto activo</Text>
        <Pressable style={styles.challengeMiniCard}>
          <View style={styles.challengeDot} />
          <Text style={styles.challengeText}>100 Sentadillas / 5 días</Text>
          <Ionicons name="chevron-forward" size={16} color="#8C9A8C" />
        </Pressable>
      </View>

      {/* Espaciado de seguridad inferior */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6', // Blanco hueso premium
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 80,
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1C1A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
    marginTop: 4,
    fontWeight: '500',
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
    // Sombra muy suave para que parezca moderno
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
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
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1C1A',
  },
  progressLabel: {
    fontSize: 14,
    color: '#8C9A8C',
    marginTop: 2,
  },
  percentageBadge: {
    backgroundColor: '#E6EBE0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 14,
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
    backgroundColor: '#9CAF88', // Verde salvia
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
    width: 48,
    height: 48,
    backgroundColor: '#FDFBF6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C1A',
  },
  cardTag: {
    fontSize: 12,
    color: '#8C9A8C',
    marginTop: 4,
    fontWeight: '500',
  },
  challengeMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  challengeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CDA434', // Color acento
    marginRight: 12,
  },
  challengeText: {
    flex: 1,
    fontSize: 15,
    color: '#4A5D4A',
    fontWeight: '500',
  },
});