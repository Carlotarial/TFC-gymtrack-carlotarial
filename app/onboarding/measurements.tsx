import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MeasurementsScreen() {
  const router = useRouter();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // El botón solo se activará si ha escrito los dos datos
  const isValid = weight.length > 0 && height.length > 0;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.stepText}>Paso 3 de 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
      </View>

      <Text style={styles.title}>Tus medidas 📏</Text>
      <Text style={styles.subtitle}>Para calcular tus necesidades calóricas diarias con precisión.</Text>

      <View style={styles.inputsContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Peso actual</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ej. 65"
              placeholderTextColor="#8C9A8C"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              maxLength={3}
            />
            <Text style={styles.unitText}>kg</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Altura</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ej. 170"
              placeholderTextColor="#8C9A8C"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              maxLength={3}
            />
            <Text style={styles.unitText}>cm</Text>
          </View>
        </View>
      </View>

      <Pressable 
        style={[styles.nextButton, !isValid && styles.nextButtonDisabled]} 
        disabled={!isValid}
        onPress={() => router.push('/onboarding/generating' as any)}
      >
        <Text style={styles.nextButtonText}>Continuar</Text>
        <Ionicons name="arrow-forward" size={24} color="#FDFBF6" />
      </Pressable>
    </KeyboardAvoidingView>
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
  inputsContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
    borderWidth: 2,
    borderColor: '#E6EBE0',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 70,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A5D4A',
  },
  unitText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8C9A8C',
    marginLeft: 10,
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