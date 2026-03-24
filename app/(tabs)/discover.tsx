import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const ALL_WORKOUTS = [
  { id: '1', title: 'Abdomen de Acero', time: '15 min', intensity: 'Alta', tag: 'HIIT' },
  { id: '2', title: 'Movilidad Matutina', time: '10 min', intensity: 'Baja', tag: 'Yoga' },
  { id: '3', title: 'Fuerza Total', time: '45 min', intensity: 'Media', tag: 'Fuerza' },
  { id: '4', title: 'Cardio Quemagrasa', time: '20 min', intensity: 'Alta', tag: 'Cardio' },
];

const CATEGORIES = ['Todos', 'HIIT', 'Fuerza', 'Yoga', 'Cardio'];

export default function DiscoverScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('Todos');

  const filteredWorkouts = ALL_WORKOUTS.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === 'Todos' || workout.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Minimalista */}
      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        <Text style={styles.subtitle}>Encuentra tu próximo entrenamiento</Text>
      </View>

      {/* Buscador Elegante */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8C9A8C" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar rutinas..."
            placeholderTextColor="#8C9A8C"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#8C9A8C" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Categorías (Pills) */}
      <View style={styles.tagsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <Pressable 
              key={cat} 
              style={[styles.tag, activeTag === cat && styles.tagActive]}
              onPress={() => setActiveTag(cat)}
            >
              <Text style={[styles.tagText, activeTag === cat && styles.tagTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Resultados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entrenamientos para ti</Text>
        
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <Pressable 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => router.push({ 
                pathname: '/routine', 
                params: { title: workout.title } 
              } as any)}
            >
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDetails}>
                  {workout.time} • {workout.intensity}
                </Text>
              </View>
              <View style={styles.actionIcon}>
                <Ionicons name="chevron-forward" size={20} color="#8C9A8C" />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={48} color="#E6EBE0" />
            <Text style={styles.noResultsText}>Sin resultados para "{search}"</Text>
          </View>
        )}
      </View>

      {/* Grid de Ejercicios Sugeridos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuevos movimientos</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <View style={styles.imageBox}>
              <Ionicons name="barbell-outline" size={32} color="#4A5D4A" />
            </View>
            <Text style={styles.gridTitle}>Peso Muerto</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.imageBox}>
              <Ionicons name="body-outline" size={32} color="#4A5D4A" />
            </View>
            <Text style={styles.gridTitle}>Plancha</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '700', color: '#1A1C1A', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#8C9A8C', marginTop: 4 },
  searchWrapper: { marginBottom: 24 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    height: 54,
    borderWidth: 1,
    borderColor: '#F0F2ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#1A1C1A', marginLeft: 12 },
  tagsContainer: { marginBottom: 32 },
  tag: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 24, 
    marginRight: 8, 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#F0F2ED' 
  },
  tagActive: { backgroundColor: '#1A1C1A', borderColor: '#1A1C1A' },
  tagText: { color: '#8C9A8C', fontWeight: '600', fontSize: 14 },
  tagTextActive: { color: '#FDFBF6' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1A1C1A', marginBottom: 16 },
  workoutCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 20, 
    alignItems: 'center', 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F2ED'
  },
  workoutInfo: { flex: 1 },
  workoutTitle: { fontSize: 17, fontWeight: '600', color: '#1A1C1A', marginBottom: 4 },
  workoutDetails: { fontSize: 13, color: '#8C9A8C' },
  actionIcon: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#FDFBF6', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  gridItem: { width: '47%', alignItems: 'center' },
  imageBox: { 
    width: '100%', 
    height: 120, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F2ED'
  },
  gridTitle: { fontSize: 15, fontWeight: '600', color: '#1A1C1A' },
  noResults: { alignItems: 'center', marginTop: 40, opacity: 0.5 },
  noResultsText: { marginTop: 12, color: '#8C9A8C', fontSize: 15 },
});