import { useTheme, AppColors } from '@/context/ThemeContext';
import { useTimer } from '@/hooks/useTimer';
import { useWorkoutPlayer } from '@/hooks/useWorkoutPlayer';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft, FadeInDown, Easing } from 'react-native-reanimated';

export default function WorkoutScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const timer = useTimer(true);
  const { id } = useLocalSearchParams();
  const player = useWorkoutPlayer(id as string);

  const handleNextExercise = () => {
    if (!player.isLastExercise) {
      player.goToNext();
    } else {
      router.push({ pathname: '/success', params: { seconds: timer.seconds.toString() } } as any);
    }
  };

  const s = dynamicStyles(colors);

  return (
    <View style={s.container}>
      <Animated.View entering={FadeInDown.delay(100)} style={s.header}>
        <Pressable onPress={() => router.back()} style={staticStyles.closeButton}>
          <Ionicons name="close-outline" size={32} color={colors.text} />
        </Pressable>
        <View style={s.badge}>
          <Text style={s.badgeText}>{player.currentIndex + 1} de {player.totalExercises}</Text>
        </View>
        <View style={{ width: 32 }} />
      </Animated.View>

      {/* Animación fluida de cambio de ejercicio */}
      <Animated.View 
        key={player.currentIndex} 
        entering={FadeInRight.duration(400).easing(Easing.out(Easing.exp))} 
        exiting={FadeOutLeft.duration(200)}
        style={staticStyles.animatedWrapper}
      >
        <View style={staticStyles.gifWrapper}>
          <View style={s.gifContainer}>
            <Image
              style={staticStyles.gifImage}
              source={player.currentExercise.gifSource}
              contentFit="contain"
              onLoadStart={player.onLoadStart}
              onLoadEnd={player.onLoadEnd}
              transition={300}
            />
            {player.isLoading && (
              <View style={s.loaderOverlay}>
                <ActivityIndicator size="small" color={colors.accent} />
              </View>
            )}
          </View>
        </View>

        <View style={staticStyles.detailsContainer}>
          <Text style={s.exerciseName}>{player.currentExercise.name}</Text>
          <Text style={s.repsText}>{player.currentExercise.reps}</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300)} style={staticStyles.timerContainer}>
        <Text style={s.timerText}>{timer.formatted}</Text>
        <Text style={s.timerLabel}>Tiempo transcurrido</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400)} style={staticStyles.footer}>
        <Pressable style={s.nextButton} onPress={handleNextExercise}>
          <Text style={s.nextButtonText}>
            {!player.isLastExercise ? 'Siguiente ejercicio' : 'Finalizar sesión'}
          </Text>
          <Ionicons 
            name={!player.isLastExercise ? "arrow-forward" : "checkmark-done"} 
            size={20} 
            color={colors.buttonPrimaryText} 
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  closeButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start' },
  animatedWrapper: { flex: 1, marginTop: 20 },
  gifWrapper: { paddingHorizontal: 24, marginBottom: 32 },
  gifImage: { width: '90%', height: '90%' },
  detailsContainer: { alignItems: 'center', marginBottom: 40 },
  timerContainer: { alignItems: 'center' },
  footer: { paddingHorizontal: 24, marginTop: 'auto', marginBottom: 40 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, paddingHorizontal: 24, marginBottom: 20 },
  badge: { backgroundColor: c.accentLight, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontSize: 14, fontWeight: '700', color: c.accentDark },
  gifContainer: { backgroundColor: c.surface, height: 320, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: c.surfaceBorder, justifyContent: 'center', alignItems: 'center' },
  loaderOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: c.surface, zIndex: 1 },
  exerciseName: { fontSize: 30, fontWeight: '700', color: c.text, textAlign: 'center', letterSpacing: -0.5 },
  repsText: { fontSize: 18, color: c.gold, fontWeight: '600', marginTop: 4 },
  timerText: { fontSize: 56, fontWeight: '700', color: c.text, fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 13, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: -4 },
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 22, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: c.buttonPrimaryText, marginRight: 10 },
});