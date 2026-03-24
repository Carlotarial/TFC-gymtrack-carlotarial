import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DiscoverScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Descubrir 🔍</Text>
        <Text style={styles.subtitle}>Encuentra tu próximo entrenamiento</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8C9A8C" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar rutinas, ejercicios..."
          placeholderTextColor="#8C9A8C"
        />
      </View>

      <View style={styles.tagsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable style={[styles.tag, styles.tagActive]}>
            <Text style={styles.tagTextActive}>Todos</Text>
          </Pressable>
          <Pressable style={styles.tag}>
            <Text style={styles.tagText}>HIIT</Text>
          </Pressable>
          <Pressable style={styles.tag}>
            <Text style={styles.tagText}>Fuerza</Text>
          </Pressable>
          <Pressable style={styles.tag}>
            <Text style={styles.tagText}>Yoga</Text>
          </Pressable>
          <Pressable style={styles.tag}>
            <Text style={styles.tagText}>Cardio</Text>
          </Pressable>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entrenamientos Express ⚡</Text>
        
        <Pressable style={styles.workoutCard}>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>Abdomen de Acero</Text>
            <Text style={styles.workoutDetails}>15 min • Alta intensidad</Text>
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="#FAF3E0" />
          </View>
        </Pressable>

        <Pressable style={styles.workoutCard}>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>Movilidad Matutina</Text>
            <Text style={styles.workoutDetails}>10 min • Baja intensidad</Text>
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="#FAF3E0" />
          </View>
        </Pressable>
      </View>

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
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 70,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EBE0',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4A5D4A',
  },
  tagsContainer: {
    marginBottom: 30,
  },
  tag: {
    backgroundColor: '#FAF3E0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E6CCB2',
  },
  tagActive: {
    backgroundColor: '#4A5D4A',
    borderColor: '#4A5D4A',
  },
  tagText: {
    color: '#8C9A8C',
    fontWeight: '600',
  },
  tagTextActive: {
    color: '#FDFBF6',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 15,
  },
  workoutCard: {
    flexDirection: 'row',
    backgroundColor: '#FAF3E0',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E6EBE0',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 5,
  },
  workoutDetails: {
    fontSize: 14,
    color: '#8C9A8C',
  },
  playButton: {
    backgroundColor: '#CDA434',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
  imagePlaceholder: {
    backgroundColor: '#E6EBE0',
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5D4A',
    textAlign: 'center',
  },
});