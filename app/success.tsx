import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SuccessScreen() {
  const router = useRouter();
  const { seconds } = useLocalSearchParams();
  const { completeWorkout } = useUser();
  const hasRecorded = useRef(false);

  const elapsedSeconds = parseInt(seconds as string, 10) || 0;
  const minutes = Math.floor(elapsedSeconds / 60);
  const estimatedKcal = Math.round((elapsedSeconds / 60) * 7); // ~7 kcal/min estimación

  // Registrar la sesión completada al montar (solo una vez)
  useEffect(() => {
    if (!hasRecorded.current) {
      hasRecorded.current = true;
      completeWorkout('Entrenamiento', elapsedSeconds, estimatedKcal);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="trophy" size={80} color="#CDA434" />
        </View>
        
        <Text style={styles.title}>¡Reto Superado! 🎉</Text>
        <Text style={styles.subtitle}>Has hecho un trabajo increíble hoy. Tu constancia está dando sus frutos.</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{minutes > 0 ? minutes : '<1'}</Text>
            <Text style={styles.statLabel}>Minutos</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{estimatedKcal}</Text>
            <Text style={styles.statLabel}>Kcal</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.homeButton} onPress={() => router.push('/(tabs)' as any)}>
        <Text style={styles.homeButtonText}>Volver al Inicio</Text>
        <Ionicons name="home" size={20} color="#FDFBF6" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9CAF88',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 150,
    height: 150,
    backgroundColor: '#FDFBF6',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FDFBF6',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6EBE0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FDFBF6',
    borderRadius: 24,
    padding: 25,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#8C9A8C',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E6EBE0',
  },
  homeButton: {
    flexDirection: 'row',
    backgroundColor: '#4A5D4A',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A5D4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDFBF6',
    marginRight: 10,
  },
});