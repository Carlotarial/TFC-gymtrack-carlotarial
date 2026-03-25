export interface Exercise {
  id: string;
  name: string;
  reps: string;
  sets: string;
  icon: string;
  gifSource: string | any;
  muscleGroup: MuscleGroup;
}

export type MuscleGroup = 'piernas' | 'pecho' | 'core' | 'espalda' | 'full-body';

/**
 * URLs de GIFs reales (Fuente: ExerciseDB Open Source)
 */
const getGifUrl = (id: string) => `https://raw.githubusercontent.com/omercotkd/exercises-gifs/main/assets/${id}.gif`;

export const ALL_EXERCISES: Exercise[] = [
  { id: 'e1', name: 'Sentadilla Goblet', reps: '12 Repeticiones', sets: '4 x 12', icon: 'fitness-outline', gifSource: require('../assets/images/exercises/sentadillagoblet.gif'), muscleGroup: 'piernas' },
  { id: 'e2', name: 'Flexiones Clásicas', reps: '10 Repeticiones', sets: '3 x 15', icon: 'body-outline', gifSource: getGifUrl('0662'), muscleGroup: 'pecho' },
  { id: 'e3', name: 'Zancadas Alternas', reps: '20 Repeticiones', sets: '3 x 20', icon: 'walk-outline', gifSource: require('../assets/images/exercises/zancadasalternas.gif'), muscleGroup: 'piernas' },
  { id: 'e4', name: 'Sentadilla Isométrica', reps: '1 min', sets: '3 x 1m', icon: 'timer-outline', gifSource: getGifUrl('2316'), muscleGroup: 'piernas' },
  { id: 'e5', name: 'Flexiones Diamante', reps: '8 Repeticiones', sets: '4 x 8', icon: 'body-outline', gifSource: require('../assets/images/exercises/diamante.gif'), muscleGroup: 'pecho' },
  { id: 'e6', name: 'Zancada Inversa', reps: '15 Reps por pierna', sets: '3 x 15', icon: 'walk-outline', gifSource: getGifUrl('0600'), muscleGroup: 'piernas' },
  { id: 'e7', name: 'Plancha Abdominal', reps: '45 Segundos', sets: '4 x 45s', icon: 'accessibility-outline', gifSource: getGifUrl('0464'), muscleGroup: 'core' },
  { id: 'e8', name: 'Medio Burpee', reps: '12 Repeticiones', sets: '3 x 12', icon: 'flash-outline', gifSource: getGifUrl('1160'), muscleGroup: 'full-body' },
  { id: 'e9', name: 'Sentadilla con Salto', reps: '15 Repeticiones', sets: '3 x 15', icon: 'rocket-outline', gifSource: getGifUrl('0544'), muscleGroup: 'piernas' },
  { id: 'e10', name: 'Zancada Explosiva', reps: '10 Reps por pierna', sets: '4 x 10', icon: 'flash-outline', gifSource: require('../assets/images/exercises/zancadaexplosiva.gif'), muscleGroup: 'piernas' },
  { id: 'e11', name: 'Pulse Squat', reps: '20 Repeticiones', sets: '3 x 20', icon: 'fitness-outline', gifSource: getGifUrl('3214'), muscleGroup: 'piernas' },
];

/**
 * Obtener todos los detalles de una lista de IDs de ejercicios
 */
export function getFullExerciseDetails(ids: string[]): Exercise[] {
  return ids.map(id => ALL_EXERCISES.find(e => e.id === id) as Exercise).filter(Boolean);
}
