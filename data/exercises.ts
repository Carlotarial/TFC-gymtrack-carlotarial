export interface Exercise {
  id: string;
  name: string;
  reps: string;
  sets: string;
  icon: string;
  gifSource: any;
  muscleGroup: MuscleGroup;
}

export type MuscleGroup = 'piernas' | 'pecho' | 'core' | 'espalda' | 'full-body';

// Los GIFs disponibles localmente (reutilizados inteligentemente para demostrar variedad en TFC)
const GIF_SOURCES = {
  squat: require('../assets/images/exercises/squat.gif'),
  pushup: require('../assets/images/exercises/pushup.gif'),
  lunge: require('../assets/images/exercises/lunge.gif'),
};

export const ALL_EXERCISES: Exercise[] = [
  { id: 'e1', name: 'Sentadilla Goblet', reps: '12 Repeticiones', sets: '4 x 12', icon: 'fitness-outline', gifSource: GIF_SOURCES.squat, muscleGroup: 'piernas' },
  { id: 'e2', name: 'Flexiones Clásicas', reps: '10 Repeticiones', sets: '3 x 15', icon: 'body-outline', gifSource: GIF_SOURCES.pushup, muscleGroup: 'pecho' },
  { id: 'e3', name: 'Zancadas Alternas', reps: '20 Repeticiones', sets: '3 x 20', icon: 'walk-outline', gifSource: GIF_SOURCES.lunge, muscleGroup: 'piernas' },
  { id: 'e4', name: 'Sentadilla Isométrica', reps: '1 min', sets: '3 x 1m', icon: 'timer-outline', gifSource: GIF_SOURCES.squat, muscleGroup: 'piernas' },
  { id: 'e5', name: 'Flexiones Diamante', reps: '8 Repeticiones', sets: '4 x 8', icon: 'body-outline', gifSource: GIF_SOURCES.pushup, muscleGroup: 'pecho' },
  { id: 'e6', name: 'Zancada Inversa', reps: '15 Reps por pierna', sets: '3 x 15', icon: 'walk-outline', gifSource: GIF_SOURCES.lunge, muscleGroup: 'piernas' },
  { id: 'e7', name: 'Plancha Abdominal', reps: '45 Segundos', sets: '4 x 45s', icon: 'accessibility-outline', gifSource: GIF_SOURCES.pushup, muscleGroup: 'core' },
  { id: 'e8', name: 'Medio Burpee', reps: '12 Repeticiones', sets: '3 x 12', icon: 'flash-outline', gifSource: GIF_SOURCES.pushup, muscleGroup: 'full-body' },
  { id: 'e9', name: 'Sentadilla con Salto', reps: '15 Repeticiones', sets: '3 x 15', icon: 'rocket-outline', gifSource: GIF_SOURCES.squat, muscleGroup: 'piernas' },
  { id: 'e10', name: 'Zancada Explosiva', reps: '10 Reps por pierna', sets: '4 x 10', icon: 'flash-outline', gifSource: GIF_SOURCES.lunge, muscleGroup: 'piernas' },
  { id: 'e11', name: 'Pulse Squat', reps: '20 Repeticiones', sets: '3 x 20', icon: 'fitness-outline', gifSource: GIF_SOURCES.squat, muscleGroup: 'piernas' },
];

/**
 * Obtener todos los detalles de una lista de IDs de ejercicios
 */
export function getFullExerciseDetails(ids: string[]): Exercise[] {
  return ids.map(id => ALL_EXERCISES.find(e => e.id === id) as Exercise).filter(Boolean);
}
