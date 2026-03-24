import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

const workoutData = [
  {
    id: 1,
    name: 'Sentadilla Goblet',
    reps: '12 Repeticiones',
    // Referencia al archivo local
    gifUrl: require('../assets/images/exercises/squat.gif'),
  },
  {
    id: 2,
    name: 'Flexiones clásicas',
    reps: '10 Repeticiones',
    gifUrl: require('../assets/images/exercises/pushup.gif'),
  },
  {
    id: 3,
    name: 'Zancadas alternas',
    reps: '20 Repeticiones',
    gifUrl: require('../assets/images/exercises/lunge.gif'),
  },
];

export default function WorkoutScreen() {
  const router = useRouter();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentExercise = workoutData[currentExerciseIndex];
  const totalExercises = workoutData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setIsLoading(true);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      router.push({ pathname: '/success', params: { seconds: seconds.toString() } } as any);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close-outline" size={32} color="#1A1C1A" />
        </Pressable>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{currentExerciseIndex + 1} de {totalExercises}</Text>
        </View>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.gifWrapper}>
        <View style={styles.gifContainer}>
          {/* Mostramos el loader solo si es necesario, aunque en local es casi instantáneo */}
          <Image
            style={styles.gifImage}
            source={currentExercise.gifUrl} 
            contentFit="contain"
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            transition={300}
          />
          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="small" color="#9CAF88" />
            </View>
          )}
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.repsText}>{currentExercise.reps}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        <Text style={styles.timerLabel}>Tiempo transcurrido</Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.nextButton} onPress={handleNextExercise}>
          <Text style={styles.nextButtonText}>
            {currentExerciseIndex < totalExercises - 1 ? 'Siguiente ejercicio' : 'Finalizar sesión'}
          </Text>
          <Ionicons 
            name={currentExerciseIndex < totalExercises - 1 ? "arrow-forward" : "checkmark-done"} 
            size={20} 
            color="#FDFBF6" 
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, paddingHorizontal: 24, marginBottom: 20 },
  closeButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start' },
  badge: { backgroundColor: '#E6EBE0', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontSize: 14, fontWeight: '700', color: '#4A5D4A' },
  gifWrapper: { paddingHorizontal: 24, marginBottom: 32 },
  gifContainer: { backgroundColor: '#FFFFFF', height: 320, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: '#F0F2ED', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
  loaderOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', zIndex: 1 },
  gifImage: { width: '90%', height: '90%' },
  detailsContainer: { alignItems: 'center', marginBottom: 40 },
  exerciseName: { fontSize: 30, fontWeight: '700', color: '#1A1C1A', textAlign: 'center', letterSpacing: -0.5 },
  repsText: { fontSize: 18, color: '#CDA434', fontWeight: '600', marginTop: 4 },
  timerContainer: { alignItems: 'center' },
  timerText: { fontSize: 56, fontWeight: '700', color: '#1A1C1A', fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 13, color: '#8C9A8C', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: -4 },
  footer: { paddingHorizontal: 24, marginTop: 'auto', marginBottom: 40 },
  nextButton: { flexDirection: 'row', backgroundColor: '#1A1C1A', padding: 22, borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 4 },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: '#FDFBF6', marginRight: 10 },
});