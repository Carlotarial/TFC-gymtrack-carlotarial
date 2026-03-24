import { useTheme, AppColors } from '@/context/ThemeContext';
import { getFullExerciseDetails } from '@/data/exercises';
import { getWorkoutById, ALL_WORKOUTS } from '@/data/workouts';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function RoutineScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const { colors } = useTheme();

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
      <Animated.View entering={FadeInDown.duration(400)} style={s.header}>
        <Pressable onPress={handleBack} style={staticStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={s.headerTitle}>{workout.title}</Text>
        <View style={{ width: 44 }} /> 
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={staticStyles.scrollContent}>
        
        {/* Banner Pastel Soft Shadow */}
        <Animated.View entering={FadeInDown.delay(100)} style={s.infoBanner}>
          <View style={staticStyles.infoItem}>
            <Text style={{fontSize: 24, marginBottom: 4}}>⏱️</Text>
            <Text style={s.infoValue}>{workout.duration}</Text>
            <Text style={s.infoLabel}>DURACIÓN</Text>
          </View>
          <View style={s.divider} />
          <View style={staticStyles.infoItem}>
            <Text style={{fontSize: 24, marginBottom: 4}}>⚡</Text>
            <Text style={s.infoValue}>{workout.intensity}</Text>
            <Text style={s.infoLabel}>NIVEL</Text>
          </View>
          <View style={s.divider} />
          <View style={staticStyles.infoItem}>
            <Text style={{fontSize: 24, marginBottom: 4}}>🔥</Text>
            <Text style={s.infoValue}>{workout.kcalEstimate}</Text>
            <Text style={s.infoLabel}>KCAL</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={s.sectionTitle}>Ejercicios de la sesión</Text>
        </Animated.View>

        {exercises.map((item, index) => (
          <Animated.View entering={FadeInUp.delay(300 + (index * 100))} key={`${item.id}-${index}`} style={s.exerciseCard}>
            <View style={s.iconWrapper}>
              <Ionicons name={item.icon as any} size={28} color={colors.accentDark} />
            </View>
            <View style={staticStyles.exerciseInfo}>
              <Text style={s.exerciseName}>{item.name}</Text>
              <Text style={s.exerciseReps}>{item.sets}</Text>
            </View>
            <Ionicons name="play-circle-outline" size={28} color={colors.accent} />
          </Animated.View>
        ))}

        <Animated.View entering={FadeInUp.delay(800)}>
          <Pressable 
            style={s.startButton} 
            onPress={() => router.push({ pathname: '/workout', params: { id: workout.id } } as any)}
          >
            <Text style={s.startButtonText}>Comenzar entrenamiento</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 24, paddingBottom: 60 },
  backButton: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  infoItem: { flex: 1, alignItems: 'center' },
  exerciseInfo: { flex: 1 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, marginBottom: 30, paddingHorizontal: 16 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: c.text, letterSpacing: -0.5 },
  
  infoBanner: { flexDirection: 'row', backgroundColor: c.surface, paddingVertical: 28, borderRadius: 36, marginBottom: 40, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  infoLabel: { fontSize: 11, color: c.textSecondary, fontWeight: '800', marginTop: 6, letterSpacing: 1 },
  infoValue: { fontSize: 18, fontWeight: '800', color: c.text },
  divider: { width: 1, height: '60%', backgroundColor: c.surfaceBorder, alignSelf: 'center' },
  
  sectionTitle: { fontSize: 20, fontWeight: '700', color: c.text, marginBottom: 20, letterSpacing: -0.5 },
  
  exerciseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, padding: 24, borderRadius: 32, marginBottom: 16, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 20, elevation: 2 },
  iconWrapper: { width: 64, height: 64, borderRadius: 24, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  exerciseName: { fontSize: 17, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  exerciseReps: { fontSize: 14, color: c.textSecondary, marginTop: 4, fontWeight: '600' },
  
  startButton: { backgroundColor: c.buttonPrimary, padding: 24, borderRadius: 32, alignItems: 'center', marginTop: 30, shadowColor: c.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 30, elevation: 6 },
  startButtonText: { fontSize: 18, fontWeight: '800', color: c.buttonPrimaryText },
});