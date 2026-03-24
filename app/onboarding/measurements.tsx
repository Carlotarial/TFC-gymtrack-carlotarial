import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MeasurementsScreen() {
  const router = useRouter();
  const { userName, goal, activity } = useLocalSearchParams(); 
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const isValid = weight.length > 0 && height.length > 0;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Steppers - Paso 4 de 4 */}
      <View style={styles.stepContainer}>
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotActive]} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Tus medidas</Text>
        <Text style={styles.subtitle}>Esto nos permite calcular tu IMC y ajustar tus objetivos calóricos.</Text>
      </View>

      <View style={styles.inputsContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Peso actual</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="00"
              placeholderTextColor="#C1C7C1"
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
              placeholder="000"
              placeholderTextColor="#C1C7C1"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              maxLength={3}
            />
            <Text style={styles.unitText}>cm</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.nextButton, !isValid && styles.nextButtonDisabled]} 
          disabled={!isValid}
          onPress={() => router.push({
            pathname: '/onboarding/generating',
            params: { userName, goal, activity, weight, height }
          } as any)}
        >
          <Text style={styles.nextButtonText}>Finalizar test</Text>
          <Ionicons name="checkmark-circle" size={20} color="#FDFBF6" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
  inputsContainer: { flex: 1 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '700', color: '#4A5D4A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#F0F2ED', 
    borderRadius: 20, 
    paddingHorizontal: 20, 
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  input: { flex: 1, fontSize: 24, fontWeight: '600', color: '#1A1C1A' },
  unitText: { fontSize: 18, fontWeight: '700', color: '#9CAF88' },
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