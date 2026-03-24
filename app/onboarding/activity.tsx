import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ActivityScreen() {
  const router = useRouter();
  const { userName, goal } = useLocalSearchParams(); 
  const [selectedActivity, setSelectedActivity] = useState('');

  const activities = [
    { id: 'sedentario', title: 'Sedentario', desc: 'Paso la mayor parte del día sentada', icon: 'cafe-outline' },
    { id: 'moderado', title: 'Moderado', desc: 'Ejercicio de 1 a 2 veces por semana', icon: 'walk-outline' },
    { id: 'activo', title: 'Muy Activo', desc: 'Entreno duro más de 3 veces por semana', icon: 'flash-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* Steppers - Paso 3 de 4 */}
      <View style={styles.stepContainer}>
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotActive]} />
        <View style={styles.stepDot} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Nivel de actividad</Text>
        <Text style={styles.subtitle}>Esto nos permite calcular tu gasto calórico y ajustar la intensidad.</Text>
      </View>

      <View style={styles.optionsContainer}>
        {activities.map((item) => (
          <Pressable 
            key={item.id}
            style={[styles.card, selectedActivity === item.id && styles.cardActive]}
            onPress={() => setSelectedActivity(item.id)}
          >
            <View style={[styles.iconBox, selectedActivity === item.id && styles.iconBoxActive]}>
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={selectedActivity === item.id ? '#FDFBF6' : '#4A5D4A'} 
              />
            </View>
            <View style={styles.textColumn}>
              <Text style={[styles.cardTitle, selectedActivity === item.id && styles.cardTitleActive]}>
                {item.title}
              </Text>
              <Text style={[styles.cardDesc, selectedActivity === item.id && styles.cardDescActive]}>
                {item.desc}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.nextButton, !selectedActivity && styles.nextButtonDisabled]} 
          disabled={!selectedActivity}
          onPress={() => router.push({
            pathname: '/onboarding/measurements',
            params: { userName, goal, activity: selectedActivity }
          } as any)}
        >
          <Text style={styles.nextButtonText}>Siguiente paso</Text>
          <Ionicons name="arrow-forward" size={18} color="#FDFBF6" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 28 },
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  stepDot: { width: 8, height: 4, borderRadius: 2, backgroundColor: '#E6EBE0', marginRight: 6 },
  stepDotActive: { width: 24, backgroundColor: '#4A5D4A' },
  stepDotDone: { backgroundColor: '#9CAF88' },
  header: { marginBottom: 40 },
  title: { fontSize: 30, fontWeight: '700', color: '#1A1C1A', letterSpacing: -0.8 },
  subtitle: { fontSize: 16, color: '#8C9A8C', marginTop: 12, lineHeight: 24 },
  optionsContainer: { flex: 1 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F2ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardActive: { backgroundColor: '#4A5D4A', borderColor: '#4A5D4A' },
  iconBox: { width: 48, height: 48, backgroundColor: '#FDFBF6', borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconBoxActive: { backgroundColor: 'rgba(255,255,255,0.15)' },
  textColumn: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1A1C1A' },
  cardTitleActive: { color: '#FDFBF6' },
  cardDesc: { fontSize: 13, color: '#8C9A8C', marginTop: 2 },
  cardDescActive: { color: '#E6EBE0' },
  footer: { paddingBottom: 50 },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#1A1C1A',
    padding: 22,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: { backgroundColor: '#E6EBE0' },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: '#FDFBF6', marginRight: 8 },
});