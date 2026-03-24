import { useTheme, AppColors } from '@/context/ThemeContext';
import { getFullExerciseDetails } from '@/data/exercises';
import { getWorkoutById, ALL_WORKOUTS } from '@/data/workouts';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RoutineScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const { colors } = useTheme();

  // Buscar el workout específico, o el primero por defecto si no lo encuentra.
  const workout = id ? getWorkoutById(id as string) : ALL_WORKOUTS[0];
  const exercises = workout ? getFullExerciseDetails(workout.exercises) : [];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const s = dynamicStyles(colors);

  if (!workout) return null;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Pressable onPress={handleBack} style={staticStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={s.headerTitle}>{workout.title}</Text>
        <View style={{ width: 44 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={staticStyles.scrollContent}>
        <View style={s.infoBanner}>
          <View style={staticStyles.infoItem}>
            <Text style={s.infoLabel}>Duración</Text>
            <Text style={s.infoValue}>{workout.duration}</Text>
          </View>
          <View style={s.divider} />
          <View style={staticStyles.infoItem}>
            <Text style={s.infoLabel}>Intensidad</Text>
            <Text style={s.infoValue}>{workout.intensity}</Text>
          </View>
          <View style={s.divider} />
          <View style={staticStyles.infoItem}>
            <Text style={s.infoLabel}>Calorías</Text>
            <Text style={s.infoValue}>{workout.kcalEstimate} kcal</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Ejercicios de la sesión</Text>

        {exercises.map((item, index) => (
          <View key={`${item.id}-${index}`} style={s.exerciseCard}>
            <View style={s.iconWrapper}>
              <Ionicons name={item.icon as any} size={22} color={colors.accentDark} />
            </View>
            <View style={staticStyles.exerciseInfo}>
              <Text style={s.exerciseName}>{item.name}</Text>
              <Text style={s.exerciseReps}>{item.sets}</Text>
            </View>
            <Ionicons name="play-circle-outline" size={24} color={colors.textMuted} />
          </View>
        ))}

        <Pressable 
          style={s.startButton} 
          onPress={() => router.push({ pathname: '/workout', params: { id: workout.id } } as any)}
        >
          <Text style={s.startButtonText}>Comenzar entrenamiento</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  backButton: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  infoItem: { flex: 1, alignItems: 'center' },
  exerciseInfo: { flex: 1 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, marginBottom: 20, paddingHorizontal: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  infoBanner: { flexDirection: 'row', backgroundColor: c.surface, paddingVertical: 20, borderRadius: 24, marginBottom: 32, borderWidth: 1, borderColor: c.surfaceBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 1 },
  infoLabel: { fontSize: 12, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  infoValue: { fontSize: 15, fontWeight: '700', color: c.text },
  divider: { width: 1, height: '60%', backgroundColor: c.divider, alignSelf: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: c.text, marginBottom: 16 },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, padding: 16, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: c.surfaceBorder },
  iconWrapper: { width: 48, height: 48, borderRadius: 14, backgroundColor: c.background, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  exerciseName: { fontSize: 16, fontWeight: '600', color: c.text },
  exerciseReps: { fontSize: 13, color: c.textSecondary, marginTop: 2 },
  startButton: { backgroundColor: c.buttonPrimary, padding: 22, borderRadius: 22, alignItems: 'center', marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 4 },
  startButtonText: { fontSize: 17, fontWeight: '700', color: c.buttonPrimaryText },
});