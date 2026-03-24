// Datos de ejercicios individuales con referencia a GIFs locales

export interface Exercise {
  id: string;
  name: string;
  reps: string;
  sets: string;
  icon: string;       // Ionicons name
  gifSource: any;     // require() de GIF local
  muscleGroup: MuscleGroup;
}

export type MuscleGroup = 'piernas' | 'pecho' | 'core' | 'espalda' | 'full-body';

// Los GIFs disponibles localmente
const GIF_SOURCES = {
  squat: require('../assets/images/exercises/squat.gif'),
  pushup: require('../assets/images/exercises/pushup.gif'),
  lunge: require('../assets/images/exercises/lunge.gif'),
};

export const ALL_EXERCISES: Exercise[] = [
  {
    id: 'e1',
    name: 'Sentadilla Goblet',
    reps: '12 Repeticiones',
    sets: '4 x 12',
    icon: 'fitness-outline',
    gifSource: GIF_SOURCES.squat,
    muscleGroup: 'piernas',
  },
  {
    id: 'e2',
    name: 'Flexiones clásicas',
    reps: '10 Repeticiones',
    sets: '3 x 15',
    icon: 'body-outline',
    gifSource: GIF_SOURCES.pushup,
    muscleGroup: 'pecho',
  },
  {
    id: 'e3',
    name: 'Zancadas alternas',
    reps: '20 Repeticiones',
    sets: '3 x 20',
    icon: 'walk-outline',
    gifSource: GIF_SOURCES.lunge,
    muscleGroup: 'piernas',
  },
];

// Ejercicios usados en el detalle de rutina
export const ROUTINE_EXERCISES = [
  { name: 'Sentadilla Goblet', reps: '4 x 12', icon: 'fitness-outline' as const },
  { name: 'Flexiones clásicas', reps: '3 x 15', icon: 'body-outline' as const },
  { name: 'Zancadas alternas', reps: '3 x 20', icon: 'walk-outline' as const },
  { name: 'Plancha abdominal', reps: '3 x 45s', icon: 'timer-outline' as const },
  { name: 'Peso muerto rumano', reps: '4 x 10', icon: 'barbell-outline' as const },
  { name: 'Burpees', reps: '3 x 10', icon: 'flash-outline' as const },
];

/**
 * Obtener los ejercicios del workout player (los que tienen GIF)
 */
export function getWorkoutExercises(): Exercise[] {
  return ALL_EXERCISES;
}
