import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RoutineScreen() {
  const router = useRouter();
  // Simulamos que recibimos el objetivo (esto vendrá del test)
  const { goal } = useLocalSearchParams(); 

  const getTitle = () => {
    if (goal === 'perder_peso') return 'Circuito Quema-Grasa';
    if (goal === 'ganar_musculo') return 'Hipertrofia Total';
    return 'Tonificación General';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4A5D4A" />
        </Pressable>
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>⏱️ 50 min</Text>
          <Text style={styles.infoText}>🔥 350 kcal</Text>
        </View>

        <Text style={styles.sectionTitle}>Lista de Ejercicios (6)</Text>

        {[
          { name: 'Sentadilla Goblet', reps: '4 x 12', icon: 'body' as any },
          { name: 'Flexiones', reps: '3 x 15', icon: 'fitness' as any },
          { name: 'Zancadas Alt.', reps: '3 x 20', icon: 'walk' as any },
          { name: 'Plancha Abdominal', reps: '3 x 45s', icon: 'timer' as any },
          { name: 'Peso Muerto Rumano', reps: '4 x 10', icon: 'barbell' as any },
          { name: 'Burpees', reps: '3 x 10', icon: 'flash' as any },
        ].map((item, index) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={styles.exerciseImage}>
              <Ionicons name={item.icon} size={28} color="#9CAF88" />
            </View>
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseReps}>{item.reps}</Text>
            </View>
            <Ionicons name="play-circle" size={24} color="#E6CCB2" />
          </View>
        ))}

        <Pressable style={styles.startButton} onPress={() => router.push('/workout')}>
          <Text style={styles.startButtonText}>Empezar Entrenamiento</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, marginBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FAF3E0', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A5D4A' },
  infoBanner: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#E6EBE0', padding: 15, borderRadius: 16, marginBottom: 25 },
  infoText: { fontSize: 14, fontWeight: '600', color: '#4A5D4A' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5D4A', marginBottom: 15 },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF3E0', padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#E6EBE0' },
  exerciseImage: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#E6EBE0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  exerciseDetails: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: 'bold', color: '#4A5D4A' },
  exerciseReps: { fontSize: 13, color: '#8C9A8C' },
  startButton: { backgroundColor: '#CDA434', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  startButtonText: { fontSize: 18, fontWeight: 'bold', color: '#FDFBF6' },
});