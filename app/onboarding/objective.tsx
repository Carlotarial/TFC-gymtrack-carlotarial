import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ObjectiveScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { updateUser } = useUser();
  const [selectedGoal, setSelectedGoal] = useState('');

  const goals = [
    { id: 'perder_peso', title: 'Perder peso', desc: 'Déficit calórico y quema de grasa', icon: 'flame-outline' },
    { id: 'ganar_musculo', title: 'Ganar músculo', desc: 'Hipertrofia y aumento de fuerza', icon: 'barbell-outline' },
    { id: 'tonificar', title: 'Tonificar', desc: 'Definición y resistencia física', icon: 'fitness-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* Indicador de pasos discreto */}
      <View style={styles.stepContainer}>
        { [1, 2, 3, 4].map((step) => (
          <View key={step} style={[styles.stepDot, step === 2 && styles.stepDotActive, step < 2 && styles.stepDotDone]} />
        ))}
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>¿Cuál es tu meta, {params.userName}?</Text>
        <Text style={styles.subtitle}>Selecciona el enfoque de tu entrenamiento para los próximos meses.</Text>
      </View>

      <View style={styles.optionsContainer}>
        {goals.map((goal) => (
          <Pressable 
            key={goal.id}
            style={[styles.card, selectedGoal === goal.id && styles.cardActive]}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <View style={[styles.iconBox, selectedGoal === goal.id && styles.iconBoxActive]}>
              <Ionicons 
                name={goal.icon as any} 
                size={24} 
                color={selectedGoal === goal.id ? '#FDFBF6' : '#4A5D4A'} 
              />
            </View>
            <View style={styles.textColumn}>
              <Text style={[styles.cardTitle, selectedGoal === goal.id && styles.cardTitleActive]}>{goal.title}</Text>
              <Text style={[styles.cardDesc, selectedGoal === goal.id && styles.cardDescActive]}>{goal.desc}</Text>
            </View>
            {selectedGoal === goal.id && (
              <Ionicons name="chevron-forward" size={20} color="#FDFBF6" />
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.nextButton, !selectedGoal && styles.nextButtonDisabled]} 
          disabled={!selectedGoal}
          onPress={async () => {
            await updateUser({ goal: selectedGoal });
            router.push({
              pathname: '/onboarding/activity',
              params: { userName: params.userName, goal: selectedGoal }
            } as any);
          }}
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
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'center' },
  stepDot: { width: 8, height: 4, borderRadius: 2, backgroundColor: '#E6EBE0', marginHorizontal: 4 },
  stepDotActive: { width: 24, backgroundColor: '#4A5D4A' },
  stepDotDone: { backgroundColor: '#9CAF88' },
  header: { marginBottom: 40 },
  title: { fontSize: 30, fontWeight: '700', color: '#1A1C1A', letterSpacing: -0.8, lineHeight: 36 },
  subtitle: { fontSize: 16, color: '#8C9A8C', marginTop: 12, lineHeight: 24 },
  optionsContainer: { flex: 1 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F2ED',
    // Sombra sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
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
    padding: 20,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: { backgroundColor: '#E6EBE0' },
  nextButtonText: { fontSize: 16, fontWeight: '700', color: '#FDFBF6', marginRight: 8 },
});