import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RoutineScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4A5D4A" />
        </Pressable>
        <Text style={styles.headerTitle}>Glúteo Firme</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>🔥 45 min</Text>
          <Text style={styles.infoText}>💪 Intensidad Media</Text>
        </View>

        <Text style={styles.sectionTitle}>Ejercicios</Text>

        <View style={styles.exerciseCard}>
          <View style={styles.exerciseImage}>
            <Ionicons name="body" size={32} color="#9CAF88" />
          </View>
          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseName}>Sentadilla Búlgara</Text>
            <Text style={styles.exerciseReps}>4 series x 12 reps</Text>
          </View>
          <Ionicons name="checkmark-circle-outline" size={28} color="#E6CCB2" />
        </View>

        <View style={styles.exerciseCard}>
          <View style={styles.exerciseImage}>
            <Ionicons name="barbell" size={32} color="#9CAF88" />
          </View>
          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseName}>Hip Thrust</Text>
            <Text style={styles.exerciseReps}>4 series x 10 reps</Text>
          </View>
          <Ionicons name="checkmark-circle-outline" size={28} color="#E6CCB2" />
        </View>

        <Pressable style={styles.startButton} onPress={() => router.push('/workout')}>
          <Text style={styles.startButtonText}>Empezar Entrenamiento</Text>
        </Pressable>
      </ScrollView>
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
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FAF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5D4A',
  },
  infoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E6EBE0',
    padding: 15,
    borderRadius: 16,
    marginBottom: 25,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5D4A',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 15,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E6EBE0',
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#E6EBE0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 4,
  },
  exerciseReps: {
    fontSize: 14,
    color: '#8C9A8C',
  },
  startButton: {
    backgroundColor: '#CDA434',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#CDA434',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDFBF6',
  },
});