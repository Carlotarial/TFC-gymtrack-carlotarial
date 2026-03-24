import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WorkoutScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#4A5D4A" />
        </Pressable>
        <Text style={styles.progressText}>1 / 6 Ejercicios</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.imageContainer}>
        <Ionicons name="body" size={100} color="#9CAF88" />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.exerciseName}>Sentadilla Búlgara</Text>
        <Text style={styles.repsText}>12 Repeticiones</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        <Text style={styles.timerLabel}>Tiempo Activo</Text>
      </View>

      <Pressable style={styles.nextButton} onPress={() => router.push('/success')}>
        <Text style={styles.nextButtonText}>Terminar Entrenamiento</Text>
        <Ionicons name="checkmark-circle" size={24} color="#FDFBF6" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 40,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8C9A8C',
  },
  imageContainer: {
    backgroundColor: '#E6EBE0',
    height: 300,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 10,
    textAlign: 'center',
  },
  repsText: {
    fontSize: 18,
    color: '#CDA434',
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A5D4A',
  },
  timerLabel: {
    fontSize: 14,
    color: '#8C9A8C',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#9CAF88',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    shadowColor: '#9CAF88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDFBF6',
    marginRight: 10,
  },
});