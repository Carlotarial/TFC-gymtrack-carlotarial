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
      router.push({ pathname: '/success', params: { seconds: timer.seconds.toString(), title: player.workoutTitle } } as any);
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

        {/* Temporizador movido aquí abajo */}
        <Animated.View entering={FadeInDown.delay(300)} style={s.timerContainerInline}>
          <Text style={s.timerTextSmall}>{timer.formatted}</Text>
          <Text style={s.timerLabelSmall}>Tiempo total</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400)} style={staticStyles.footer}>
        {player.nextExercise && (
          <View style={s.nextPreviewCard}>
            <View style={s.nextPreviewIcon}>
              <Image 
                source={player.nextExercise.gifSource} 
                style={{ width: '100%', height: '100%', borderRadius: 12 }} 
                contentFit="cover"
              />
            </View>
            <View style={{flex: 1, marginLeft: 16}}>
               <Text style={s.nextPreviewLabel}>SIGUIENTE</Text>
               <Text style={s.nextPreviewName}>{player.nextExercise.name}</Text>
            </View>
          </View>
        )}

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
  detailsContainer: { alignItems: 'center', marginBottom: 20 },
  timerContainer: { justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  footer: { paddingHorizontal: 24, marginBottom: 40 },
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
  timerContainerInline: { alignItems: 'center', marginTop: 10 },
  timerTextSmall: { fontSize: 32, fontWeight: '700', color: c.text, fontVariant: ['tabular-nums'] },
  timerLabelSmall: { fontSize: 11, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  
  nextPreviewCard: { flexDirection: 'row', backgroundColor: c.surface, padding: 12, borderRadius: 24, marginBottom: 16, alignItems: 'center', borderWidth: 1, borderColor: c.surfaceBorder },
  nextPreviewIcon: { width: 56, height: 56, backgroundColor: c.accentLight, borderRadius: 16, overflow: 'hidden' },
  nextPreviewLabel: { fontSize: 10, fontWeight: '800', color: c.textSecondary, letterSpacing: 1 },
  nextPreviewName: { fontSize: 16, fontWeight: '700', color: c.text },
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 22, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: c.buttonPrimaryText, marginRight: 10 },
});