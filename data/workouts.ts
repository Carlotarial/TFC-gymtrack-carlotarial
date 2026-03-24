// Datos de entrenamientos/rutinas tipados y separados de los componentes

export interface Workout {
  id: string;
  title: string;
  duration: string;        // ej: "45 min"
  durationMinutes: number; // para cálculos
  intensity: 'Baja' | 'Media' | 'Alta';
  kcalEstimate: number;
  tag: WorkoutTag;
  icon: string;            // Ionicons name
  exercises: string[];     // IDs de ejercicios
}

export type WorkoutTag = 'HIIT' | 'Fuerza' | 'Yoga' | 'Cardio' | 'Core';

export const WORKOUT_TAGS: WorkoutTag[] = ['HIIT', 'Fuerza', 'Yoga', 'Cardio', 'Core'];

export const CATEGORIES = ['Todos', ...WORKOUT_TAGS];

export const ALL_WORKOUTS: Workout[] = [
  {
    id: 'w1',
    title: 'Abdomen de Acero',
    duration: '15 min',
    durationMinutes: 15,
    intensity: 'Alta',
    kcalEstimate: 180,
    tag: 'HIIT',
    icon: 'flame-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
  {
    id: 'w2',
    title: 'Movilidad Matutina',
    duration: '10 min',
    durationMinutes: 10,
    intensity: 'Baja',
    kcalEstimate: 60,
    tag: 'Yoga',
    icon: 'leaf-outline',
    exercises: ['e1', 'e3'],
  },
  {
    id: 'w3',
    title: 'Fuerza Total',
    duration: '45 min',
    durationMinutes: 45,
    intensity: 'Media',
    kcalEstimate: 320,
    tag: 'Fuerza',
    icon: 'barbell-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
  {
    id: 'w4',
    title: 'Cardio Quemagrasa',
    duration: '20 min',
    durationMinutes: 20,
    intensity: 'Alta',
    kcalEstimate: 250,
    tag: 'Cardio',
    icon: 'bicycle-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
  {
    id: 'w5',
    title: 'Circuito HIIT',
    duration: '25 min',
    durationMinutes: 25,
    intensity: 'Alta',
    kcalEstimate: 300,
    tag: 'HIIT',
    icon: 'flash-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
  {
    id: 'w6',
    title: 'Tren Inferior',
    duration: '45 min',
    durationMinutes: 45,
    intensity: 'Media',
    kcalEstimate: 320,
    tag: 'Fuerza',
    icon: 'fitness-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
  {
    id: 'w7',
    title: 'Zona Core',
    duration: '20 min',
    durationMinutes: 20,
    intensity: 'Baja',
    kcalEstimate: 150,
    tag: 'Core',
    icon: 'accessibility-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
  {
    id: 'w8',
    title: 'Hipertrofia',
    duration: '50 min',
    durationMinutes: 50,
    intensity: 'Alta',
    kcalEstimate: 400,
    tag: 'Fuerza',
    icon: 'barbell-outline',
    exercises: ['e1', 'e2', 'e3'],
  },
];

/**
 * Obtener entrenamientos recomendados según el objetivo del usuario.
 */
export function getRecommendedWorkouts(goal: string): Workout[] {
  switch (goal) {
    case 'perder_peso':
      return ALL_WORKOUTS.filter(w => w.tag === 'HIIT' || w.tag === 'Cardio').slice(0, 2);
    case 'ganar_musculo':
      return ALL_WORKOUTS.filter(w => w.tag === 'Fuerza').slice(0, 2);
    case 'tonificar':
      return ALL_WORKOUTS.filter(w => w.tag === 'Core' || w.tag === 'Fuerza').slice(0, 2);
    default:
      return ALL_WORKOUTS.slice(5, 7); // Tren Inferior + Zona Core
  }
}

/**
 * Filtrar entrenamientos por búsqueda y categoría.
 */
export function filterWorkouts(search: string, tag: string): Workout[] {
  return ALL_WORKOUTS.filter(w => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tag === 'Todos' || w.tag === tag;
    return matchesSearch && matchesTag;
  });
}
