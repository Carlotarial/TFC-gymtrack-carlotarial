import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ActivityScreen() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Paso 2 de 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      <Text style={styles.title}>Tu nivel de actividad 🏃‍♀️</Text>
      <Text style={styles.subtitle}>Nos ayuda a ajustar la intensidad de las rutinas.</Text>

      <View style={styles.optionsContainer}>
        <Pressable 
          style={[styles.optionCard, selectedActivity === 'sedentario' && styles.optionCardActive]}
          onPress={() => setSelectedActivity('sedentario')}
        >
          <View style={[styles.iconContainer, selectedActivity === 'sedentario' && styles.iconContainerActive]}>
            <Ionicons name="cafe" size={32} color={selectedActivity === 'sedentario' ? '#FDFBF6' : '#9CAF88'} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedActivity === 'sedentario' && styles.optionTitleActive]}>Sedentario</Text>
            <Text style={[styles.optionSubtitle, selectedActivity === 'sedentario' && styles.optionSubtitleActive]}>Paso la mayor parte del día sentada</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.optionCard, selectedActivity === 'moderado' && styles.optionCardActive]}
          onPress={() => setSelectedActivity('moderado')}
        >
          <View style={[styles.iconContainer, selectedActivity === 'moderado' && styles.iconContainerActive]}>
            <Ionicons name="walk" size={32} color={selectedActivity === 'moderado' ? '#FDFBF6' : '#CDA434'} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedActivity === 'moderado' && styles.optionTitleActive]}>Moderado</Text>
            <Text style={[styles.optionSubtitle, selectedActivity === 'moderado' && styles.optionSubtitleActive]}>Camino o hago ejercicio 1-2 veces por semana</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.optionCard, selectedActivity === 'activo' && styles.optionCardActive]}
          onPress={() => setSelectedActivity('activo')}
        >
          <View style={[styles.iconContainer, selectedActivity === 'activo' && styles.iconContainerActive]}>
            <Ionicons name="flash" size={32} color={selectedActivity === 'activo' ? '#FDFBF6' : '#E6CCB2'} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedActivity === 'activo' && styles.optionTitleActive]}>Muy Activo</Text>
            <Text style={[styles.optionSubtitle, selectedActivity === 'activo' && styles.optionSubtitleActive]}>Entreno duro más de 3 veces por semana</Text>
          </View>
        </Pressable>
      </View>

      {/* Nota: Este botón marcará error rojo temporalmente hasta que creemos el paso 3 */}
      <Pressable 
        style={[styles.nextButton, !selectedActivity && styles.nextButtonDisabled]} 
        disabled={!selectedActivity}
        onPress={() => router.push('/onboarding/measurements' as any)}
      >
        <Text style={styles.nextButtonText}>Continuar</Text>
        <Ionicons name="arrow-forward" size={24} color="#FDFBF6" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8C9A8C',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E6EBE0',
    borderRadius: 4,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#9CAF88',
    borderRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
    marginBottom: 40,
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E6EBE0',
  },
  optionCardActive: {
    backgroundColor: '#4A5D4A',
    borderColor: '#4A5D4A',
    shadowColor: '#4A5D4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FDFBF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(253, 251, 246, 0.2)',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 4,
  },
  optionTitleActive: {
    color: '#FDFBF6',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#8C9A8C',
  },
  optionSubtitleActive: {
    color: '#E6EBE0',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#CDA434',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  nextButtonDisabled: {
    backgroundColor: '#E6EBE0',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDFBF6',
    marginRight: 10,
  },
});