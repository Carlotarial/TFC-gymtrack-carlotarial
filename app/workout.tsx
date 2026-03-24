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
    // Enlace de Wikimedia (Súper estable)
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Squats.gif',
  },
  {
    id: 2,
    name: 'Flexiones (Push-ups)',
    reps: '10 Repeticiones',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Push-up.gif',
  },
  {
    id: 3,
    name: 'Zancadas (Lunges)',
    reps: '20 Repeticiones',
    gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Lunge.gif',
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
      router.push('/success' as any);
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
          <Ionicons name="close" size={28} color="#4A5D4A" />
        </Pressable>
        <Text style={styles.progressText}>
          {currentExerciseIndex + 1} / {totalExercises} Ejercicios
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.gifContainer}>
        {isLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#9CAF88" />
          </View>
        )}
        <Image
          style={styles.gifImage}
          source={{ uri: currentExercise.gifUrl }}
          contentFit="contain"
          onLoadEnd={() => setIsLoading(false)}
          transition={300}
          cachePolicy="disk"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.repsText}>{currentExercise.reps}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        <Text style={styles.timerLabel}>Tiempo Activo</Text>
      </View>

      <Pressable style={styles.nextButton} onPress={handleNextExercise}>
        <Text style={styles.nextButtonText}>
          {currentExerciseIndex < totalExercises - 1 ? 'Siguiente Ejercicio' : 'Terminar Entrenamiento'}
        </Text>
        <Ionicons 
          name={currentExerciseIndex < totalExercises - 1 ? "arrow-forward" : "checkmark-circle"} 
          size={24} 
          color="#FDFBF6" 
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, marginBottom: 20 },
  closeButton: { width: 40, height: 40, justifyContent: 'center' },
  progressText: { fontSize: 16, fontWeight: 'bold', color: '#8C9A8C' },
  gifContainer: {
    backgroundColor: '#FAF3E0',
    height: 300,
    borderRadius: 30,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E6EBE0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
    zIndex: 1,
  },
  gifImage: { width: '100%', height: '100%' },
  detailsContainer: { alignItems: 'center', marginBottom: 20 },
  exerciseName: { fontSize: 26, fontWeight: 'bold', color: '#4A5D4A', textAlign: 'center', marginBottom: 5 },
  repsText: { fontSize: 18, color: '#CDA434', fontWeight: '600' },
  timerContainer: { alignItems: 'center', marginBottom: 30 },
  timerText: { fontSize: 48, fontWeight: 'bold', color: '#4A5D4A' },
  timerLabel: { fontSize: 14, color: '#8C9A8C', textTransform: 'uppercase', letterSpacing: 1 },
  nextButton: { flexDirection: 'row', backgroundColor: '#9CAF88', padding: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 40, elevation: 3 },
  nextButtonText: { fontSize: 18, fontWeight: 'bold', color: '#FDFBF6', marginRight: 10 },
});