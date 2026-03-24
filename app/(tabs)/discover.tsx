import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// 1. Datos de ejemplo para que la búsqueda funcione
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

  // 2. Lógica de filtrado combinada (Busqueda + Tag)
  const filteredWorkouts = ALL_WORKOUTS.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === 'Todos' || workout.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Descubrir 🔍</Text>
        <Text style={styles.subtitle}>Encuentra tu próximo entrenamiento</Text>
      </View>

      {/* Buscador funcional */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8C9A8C" style={styles.searchIcon} />
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

      {/* Tags funcionales */}
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resultados ({filteredWorkouts.length})</Text>
        
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <Pressable 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => router.push('/routine')} // Navegación real
            >
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDetails}>
                  {workout.time} • {workout.intensity} • {workout.tag}
                </Text>
              </View>
              <View style={styles.playButton}>
                <Ionicons name="play" size={24} color="#FAF3E0" />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={50} color="#E6EBE0" />
            <Text style={styles.noResultsText}>No encontramos nada que coincida</Text>
          </View>
        )}
      </View>

      {/* Sección estética de ejercicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuevos Ejercicios 👀</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="barbell" size={32} color="#9CAF88" />
            </View>
            <Text style={styles.gridItemTitle}>Peso Muerto</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="body" size={32} color="#9CAF88" />
            </View>
            <Text style={styles.gridItemTitle}>Plancha</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 20 },
  header: { marginTop: 70, marginBottom: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A5D4A', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#8C9A8C' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6EBE0', borderRadius: 16, paddingHorizontal: 15, height: 50, marginBottom: 25 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#4A5D4A' },
  tagsContainer: { marginBottom: 30 },
  tag: { backgroundColor: '#FAF3E0', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#E6CCB2' },
  tagActive: { backgroundColor: '#4A5D4A', borderColor: '#4A5D4A' },
  tagText: { color: '#8C9A8C', fontWeight: '600' },
  tagTextActive: { color: '#FDFBF6', fontWeight: '600' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A5D4A', marginBottom: 15 },
  workoutCard: { flexDirection: 'row', backgroundColor: '#FAF3E0', borderRadius: 20, padding: 20, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, borderWidth: 1, borderColor: '#E6EBE0' },
  workoutInfo: { flex: 1 },
  workoutTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5D4A', marginBottom: 5 },
  workoutDetails: { fontSize: 14, color: '#8C9A8C' },
  playButton: { backgroundColor: '#CDA434', width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginLeft: 15 },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  gridItem: { width: '48%' },
  imagePlaceholder: { backgroundColor: '#E6EBE0', height: 120, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  gridItemTitle: { fontSize: 16, fontWeight: 'bold', color: '#4A5D4A', textAlign: 'center' },
  noResults: { alignItems: 'center', marginTop: 20 },
  noResultsText: { marginTop: 10, color: '#8C9A8C', fontSize: 14 },
});