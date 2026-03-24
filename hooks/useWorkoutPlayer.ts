import { Exercise, getWorkoutExercises } from '@/data/exercises';
import { useCallback, useState } from 'react';

/**
 * Hook que encapsula la lógica de navegación entre ejercicios durante un entrenamiento.
 */
export function useWorkoutPlayer() {
  const exercises = getWorkoutExercises();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentExercise: Exercise = exercises[currentIndex];
  const totalExercises = exercises.length;
  const isLastExercise = currentIndex >= totalExercises - 1;
  const progress = (currentIndex + 1) / totalExercises;

  const goToNext = useCallback(() => {
    if (!isLastExercise) {
      setIsLoading(true);
      setCurrentIndex((i) => i + 1);
    }
  }, [isLastExercise]);

  const onLoadStart = useCallback(() => setIsLoading(true), []);
  const onLoadEnd = useCallback(() => setIsLoading(false), []);

  return {
    currentExercise,
    currentIndex,
    totalExercises,
    isLastExercise,
    isLoading,
    progress,
    goToNext,
    onLoadStart,
    onLoadEnd,
  };
}
