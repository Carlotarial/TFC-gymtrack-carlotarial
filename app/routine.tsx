import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RoutineScreen() {
  const router = useRouter();
  const { goal, title } = useLocalSearchParams(); 

  // Función de retroceso segura
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)'); // Si no puede ir atrás, vuelve al inicio
    }
  };

  const getRoutineTitle = () => {
    if (title) return title;
    if (goal === 'perder_peso') return 'Circuito Metabólico';
    if (goal === 'ganar_musculo') return 'Fuerza e Hipertrofia';
    return 'Tonificación Integral';
  };

  return (
    <View style={styles.container}>
      {/* Header Minimalista */}
      <View style={styles.header}>
        {/* Cambiamos la acción aquí */}
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1C1A" />
        </Pressable>
        <Text style={styles.headerTitle}>{getRoutineTitle()}</Text>
        <View style={{ width: 44 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoBanner}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Duración</Text>
            <Text style={styles.infoValue}>45 min</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Intensidad</Text>
            <Text style={styles.infoValue}>Media</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Calorías</Text>
            <Text style={styles.infoValue}>320 kcal</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ejercicios de la sesión</Text>

        {[
          { name: 'Sentadilla Goblet', reps: '4 x 12', icon: 'fitness-outline' as any },
          { name: 'Flexiones clásicas', reps: '3 x 15', icon: 'body-outline' as any },
          { name: 'Zancadas alternas', reps: '3 x 20', icon: 'walk-outline' as any },
          { name: 'Plancha abdominal', reps: '3 x 45s', icon: 'timer-outline' as any },
          { name: 'Peso muerto rumano', reps: '4 x 10', icon: 'barbell-outline' as any },
          { name: 'Burpees', reps: '3 x 10', icon: 'flash-outline' as any },
        ].map((item, index) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon} size={22} color="#4A5D4A" />
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseReps}>{item.reps}</Text>
            </View>
            <Ionicons name="play-circle-outline" size={24} color="#C1C7C1" />
          </View>
        ))}

        <Pressable style={styles.startButton} onPress={() => router.push('/workout')}>
          <Text style={styles.startButtonText}>Comenzar entrenamiento</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 60, 
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 10, // Nos aseguramos de que nada lo tape
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1C1A', letterSpacing: -0.5 },
  infoBanner: { 
    flexDirection: 'row', backgroundColor: '#FFFFFF', paddingVertical: 20, borderRadius: 24, marginBottom: 32,
    borderWidth: 1, borderColor: '#F0F2ED', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 10, elevation: 1,
  },
  infoItem: { flex: 1, alignItems: 'center' },
  infoLabel: { fontSize: 12, color: '#8C9A8C', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  infoValue: { fontSize: 15, fontWeight: '700', color: '#1A1C1A' },
  divider: { width: 1, height: '60%', backgroundColor: '#F0F2ED', alignSelf: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1A1C1A', marginBottom: 16 },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#F0F2ED' },
  iconWrapper: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#FDFBF6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: '600', color: '#1A1C1A' },
  exerciseReps: { fontSize: 13, color: '#8C9A8C', marginTop: 2 },
  startButton: { backgroundColor: '#1A1C1A', padding: 22, borderRadius: 22, alignItems: 'center', marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 4 },
  startButtonText: { fontSize: 17, fontWeight: '700', color: '#FDFBF6' },
});