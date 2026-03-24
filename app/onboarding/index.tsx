import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ObjectiveScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Paso 1 de 4</Text>
        <div style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </div>
      </View>

      <Text style={styles.title}>¿Cuál es tu objetivo principal? 🎯</Text>
      <Text style={styles.subtitle}>Esto nos ayudará a crear tu rutina perfecta.</Text>

      <View style={styles.optionsContainer}>
        <Pressable 
          style={[styles.optionCard, selectedGoal === 'perder_peso' && styles.optionCardActive]}
          onPress={() => setSelectedGoal('perder_peso')}
        >
          <View style={[styles.iconContainer, selectedGoal === 'perder_peso' && styles.iconContainerActive]}>
            <Ionicons name="flame" size={32} color={selectedGoal === 'perder_peso' ? '#FDFBF6' : '#CDA434'} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedGoal === 'perder_peso' && styles.optionTitleActive]}>Perder Peso</Text>
            <Text style={[styles.optionSubtitle, selectedGoal === 'perder_peso' && styles.optionSubtitleActive]}>Quemar grasa y definir</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.optionCard, selectedGoal === 'ganar_musculo' && styles.optionCardActive]}
          onPress={() => setSelectedGoal('ganar_musculo')}
        >
          <View style={[styles.iconContainer, selectedGoal === 'ganar_musculo' && styles.iconContainerActive]}>
            <Ionicons name="barbell" size={32} color={selectedGoal === 'ganar_musculo' ? '#FDFBF6' : '#9CAF88'} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedGoal === 'ganar_musculo' && styles.optionTitleActive]}>Ganar Músculo</Text>
            <Text style={[styles.optionSubtitle, selectedGoal === 'ganar_musculo' && styles.optionSubtitleActive]}>Aumentar volumen y fuerza</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.optionCard, selectedGoal === 'tonificar' && styles.optionCardActive]}
          onPress={() => setSelectedGoal('tonificar')}
        >
          <View style={[styles.iconContainer, selectedGoal === 'tonificar' && styles.iconContainerActive]}>
            <Ionicons name="body" size={32} color={selectedGoal === 'tonificar' ? '#FDFBF6' : '#E6CCB2'} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedGoal === 'tonificar' && styles.optionTitleActive]}>Tonificar</Text>
            <Text style={[styles.optionSubtitle, selectedGoal === 'tonificar' && styles.optionSubtitleActive]}>Mantenerme en forma</Text>
          </View>
        </Pressable>
      </View>

      <Pressable 
        style={[styles.nextButton, !selectedGoal && styles.nextButtonDisabled]} 
        disabled={!selectedGoal}
        onPress={() => router.push({
          pathname: '/onboarding/activity',
          params: { goal: selectedGoal }
        } as any)}
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