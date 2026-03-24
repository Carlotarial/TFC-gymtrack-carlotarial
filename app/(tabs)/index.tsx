import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola, Carlota! ✨</Text>
        <Text style={styles.subtitle}>Tu cuerpo y mente te lo agradecerán hoy</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi Constancia 🌱</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>3 de 4 sesiones</Text>
            <Ionicons name="flame" size={20} color="#CDA434" />
          </View>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.cardSubtitle}>Casi completado. ¡Sigue así!</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reto del Mes 🔥</Text>
        <View style={styles.challengeCard}>
          <Ionicons name="trophy-outline" size={24} color="#FAF3E0" style={styles.challengeIcon} />
          <View>
            <Text style={styles.challengeTitle}>100 Sentadillas en 5 días</Text>
            <Text style={styles.challengeSubtitle}>Progreso actual: 60%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explora por Zona 💪</Text>
        <View style={styles.routinesGrid}>
          <Pressable style={styles.routineCard} onPress={() => router.push('/routine')}>
            <View style={[styles.iconContainer, { backgroundColor: '#FAF3E0' }]}>
              <Text style={styles.routineEmoji}>🍑</Text>
            </View>
            <Text style={styles.routineName}>Glúteo Firme</Text>
            <Text style={styles.routineLevel}>Intensidad Media</Text>
          </Pressable>
          
          <Pressable style={styles.routineCard} onPress={() => router.push('/routine')}>
            <View style={[styles.iconContainer, { backgroundColor: '#FAF3E0' }]}>
              <Text style={styles.routineEmoji}>🧘‍♀️</Text>
            </View>
            <Text style={styles.routineName}>Core & Abs</Text>
            <Text style={styles.routineLevel}>Intensidad Suave</Text>
          </Pressable>
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
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
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
  card: {
    backgroundColor: '#E6EBE0',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#9CAF88',
    shadowColor: '#4A5D4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5D4A',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#FAF3E0',
    borderRadius: 6,
    marginBottom: 12,
  },
  progressBarFill: {
    height: 12,
    backgroundColor: '#CDA434',
    width: '75%',
    borderRadius: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8C9A8C',
    fontWeight: '500',
  },
  challengeCard: {
    backgroundColor: '#CDA434',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#CDA434',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 6,
  },
  challengeIcon: {
    marginRight: 15,
  },
  challengeTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FAF3E0',
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: 14,
    color: '#E6CCB2',
  },
  routinesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routineCard: {
    backgroundColor: '#FAF3E0',
    width: '47%',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6CCB2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  routineEmoji: {
    fontSize: 32,
  },
  routineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 6,
    textAlign: 'center',
  },
  routineLevel: {
    fontSize: 12,
    color: '#8C9A8C',
    fontWeight: '600',
  },
});