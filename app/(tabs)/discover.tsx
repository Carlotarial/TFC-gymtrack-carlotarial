import { useTheme } from '@/context/ThemeContext';
import { AppColors } from '@/context/ThemeContext';
import { CATEGORIES, filterWorkouts } from '@/data/workouts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function DiscoverScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('Todos');

  const filteredWorkouts = filterWorkouts(search, activeTag);
  const s = dynamicStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)} style={s.header}>
        <Text style={s.title}>Explorar 🚀</Text>
        <Text style={s.subtitle}>Encuentra tu próximo entrenamiento</Text>
      </Animated.View>

      {/* Buscador de píldora redonda */}
      <Animated.View entering={FadeInDown.delay(100)} style={{ marginBottom: 32 }}>
        <View style={s.searchContainer}>
          <Text style={{fontSize: 20}}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Buscar rutinas..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            selectionColor={colors.accentDark}
            cursorColor={colors.accentDark}
            underlineColorAndroid="transparent"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={24} color={colors.textMuted} />
            </Pressable>
          )}
        </View>
      </Animated.View>

      {/* Categorías (Pills) */}
      <Animated.View entering={FadeInDown.delay(200)} style={{ marginBottom: 40 }}>
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
      </Animated.View>

      {/* Lista de Resultados */}
      <Animated.View entering={FadeInDown.delay(300)} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Entrenamientos para ti</Text>
        
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <Pressable 
              key={workout.id} 
              style={s.workoutCard}
              onPress={() => router.push({ 
                pathname: '/routine', 
                params: { id: workout.id, title: workout.title } 
              } as any)}
            >
              <View style={staticStyles.workoutInfo}>
                <Text style={s.workoutTitle}>{workout.title}</Text>
                <Text style={s.workoutDetails}>
                  {workout.duration} • {workout.intensity}
                </Text>
              </View>
              <View style={s.actionIcon}>
                <Ionicons name="chevron-forward" size={24} color={colors.accentDark} />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={staticStyles.noResults}>
            <Text style={{fontSize: 48, marginBottom: 10}}>👀</Text>
            <Text style={s.noResultsText}>Sin resultados para "{search}"</Text>
          </View>
        )}
      </Animated.View>

      {/* Grid de Ejercicios y Movimientos sueltos */}
      <Animated.View entering={FadeInDown.delay(400)} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Aprende la técnica</Text>
        <View style={staticStyles.grid}>
          <Pressable 
            style={staticStyles.gridItem} 
            onPress={() => router.push({ pathname: '/movement', params: { id: 'e1' } } as any)}
          >
            <View style={s.imageBox}>
               <Text style={{fontSize: 44}}>🏋🏻‍♂️</Text>
            </View>
            <Text style={s.gridTitle}>Sentadilla</Text>
          </Pressable>

          <Pressable 
            style={staticStyles.gridItem} 
            onPress={() => router.push({ pathname: '/movement', params: { id: 'e7' } } as any)}
          >
            <View style={s.imageBox}>
               <Text style={{fontSize: 44}}>🧍🏻</Text>
            </View>
            <Text style={s.gridTitle}>Plancha</Text>
          </Pressable>
        </View>
      </Animated.View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const staticStyles = StyleSheet.create({
  section: { marginBottom: 40 },
  workoutInfo: { flex: 1 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  gridItem: { width: '47%', alignItems: 'center' },
  noResults: { alignItems: 'center', marginTop: 40, opacity: 0.7 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4, fontWeight: '500' },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, borderRadius: 32, paddingHorizontal: 24, height: 64, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  searchInput: { flex: 1, fontSize: 17, color: c.text, marginLeft: 16, fontWeight: '600' },
  
  tag: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 32, marginRight: 12, backgroundColor: c.surface, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10 },
  tagActive: { backgroundColor: c.buttonPrimary },
  tagText: { color: c.textSecondary, fontWeight: '700', fontSize: 15 },
  tagTextActive: { color: c.buttonPrimaryText },
  
  sectionTitle: { fontSize: 20, fontWeight: '700', color: c.text, marginBottom: 20, letterSpacing: -0.5 },
  
  workoutCard: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: 32, padding: 28, alignItems: 'center', marginBottom: 16, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  workoutTitle: { fontSize: 18, fontWeight: '800', color: c.text, marginBottom: 4 },
  workoutDetails: { fontSize: 14, color: c.textSecondary, fontWeight: '600' },
  actionIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center' },
  
  imageBox: { width: '100%', height: 150, backgroundColor: c.surface, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  gridTitle: { fontSize: 17, fontWeight: '700', color: c.text },
  noResultsText: { marginTop: 8, color: c.textSecondary, fontSize: 16, fontWeight: '600' },
});