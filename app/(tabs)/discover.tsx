import { useTheme } from '@/context/ThemeContext';
import { AppColors } from '@/context/ThemeContext';
import { CATEGORIES, filterWorkouts } from '@/data/workouts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DiscoverScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('Todos');

  // Usar función del módulo de datos
  const filteredWorkouts = filterWorkouts(search, activeTag);

  const s = dynamicStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.title}>Explorar</Text>
        <Text style={s.subtitle}>Encuentra tu próximo entrenamiento</Text>
      </View>

      {/* Buscador */}
      <View style={{ marginBottom: 24 }}>
        <View style={s.searchContainer}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={s.searchInput}
            placeholder="Buscar rutinas..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Categorías */}
      <View style={{ marginBottom: 32 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <Pressable 
              key={cat} 
              style={[s.tag, activeTag === cat && s.tagActive]}
              onPress={() => setActiveTag(cat)}
            >
              <Text style={[s.tagText, activeTag === cat && s.tagTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Resultados */}
      <View style={staticStyles.section}>
        <Text style={s.sectionTitle}>Entrenamientos para ti</Text>
        
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <Pressable 
              key={workout.id} 
              style={s.workoutCard}
              onPress={() => router.push({ 
                pathname: '/routine', 
                params: { title: workout.title } 
              } as any)}
            >
              <View style={staticStyles.workoutInfo}>
                <Text style={s.workoutTitle}>{workout.title}</Text>
                <Text style={s.workoutDetails}>
                  {workout.duration} • {workout.intensity}
                </Text>
              </View>
              <View style={s.actionIcon}>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={staticStyles.noResults}>
            <Ionicons name="search-outline" size={48} color={colors.accentLight} />
            <Text style={s.noResultsText}>Sin resultados para "{search}"</Text>
          </View>
        )}
      </View>

      {/* Grid de Ejercicios Sugeridos */}
      <View style={staticStyles.section}>
        <Text style={s.sectionTitle}>Nuevos movimientos</Text>
        <View style={staticStyles.grid}>
          <View style={staticStyles.gridItem}>
            <View style={s.imageBox}>
              <Ionicons name="barbell-outline" size={32} color={colors.accentDark} />
            </View>
            <Text style={s.gridTitle}>Peso Muerto</Text>
          </View>
          <View style={staticStyles.gridItem}>
            <View style={s.imageBox}>
              <Ionicons name="body-outline" size={32} color={colors.accentDark} />
            </View>
            <Text style={s.gridTitle}>Plancha</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const staticStyles = StyleSheet.create({
  section: { marginBottom: 32 },
  workoutInfo: { flex: 1 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  gridItem: { width: '47%', alignItems: 'center' },
  noResults: { alignItems: 'center', marginTop: 40, opacity: 0.5 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, borderRadius: 16, paddingHorizontal: 16, height: 54, borderWidth: 1, borderColor: c.surfaceBorder },
  searchInput: { flex: 1, fontSize: 16, color: c.text, marginLeft: 12 },
  tag: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24, marginRight: 8, backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder },
  tagActive: { backgroundColor: c.buttonPrimary, borderColor: c.buttonPrimary },
  tagText: { color: c.textSecondary, fontWeight: '600', fontSize: 14 },
  tagTextActive: { color: c.buttonPrimaryText },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: c.text, marginBottom: 16 },
  workoutCard: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: c.surfaceBorder },
  workoutTitle: { fontSize: 17, fontWeight: '600', color: c.text, marginBottom: 4 },
  workoutDetails: { fontSize: 13, color: c.textSecondary },
  actionIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: c.background, justifyContent: 'center', alignItems: 'center' },
  imageBox: { width: '100%', height: 120, backgroundColor: c.surface, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: c.surfaceBorder },
  gridTitle: { fontSize: 15, fontWeight: '600', color: c.text },
  noResultsText: { marginTop: 12, color: c.textSecondary, fontSize: 15 },
});