import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function NameScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Indicador de pasos discreto (Paso 1 de 4) */}
      <View style={styles.stepContainer}>
        <View style={[styles.stepDot, styles.stepDotActive]} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeBadge}>
          <Text style={styles.badgeText}>Bienvenido a GymTrack</Text>
        </View>
        
        <Text style={styles.title}>Empecemos por tu nombre</Text>
        <Text style={styles.subtitle}>
          Lo usaremos para personalizar tus rutinas y saludarte cada mañana.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre aquí..."
            placeholderTextColor="#C1C7C1"
            value={name}
            onChangeText={setName}
            autoFocus
            selectionColor="#4A5D4A"
          />
          {name.length > 0 && (
            <Pressable onPress={() => setName('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#8C9A8C" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.nextButton, !name && styles.nextButtonDisabled]} 
          disabled={!name}
          onPress={() => router.push({
            pathname: '/onboarding/objective',
            params: { userName: name }
          } as any)}
        >
          <Text style={styles.nextButtonText}>Continuar</Text>
          <Ionicons name="chevron-forward" size={18} color="#FDFBF6" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FDFBF6', 
    paddingHorizontal: 32 
  },
  stepContainer: { 
    flexDirection: 'row', 
    marginTop: 70, 
    marginBottom: 20, 
    justifyContent: 'flex-start' 
  },
  stepDot: { 
    width: 12, 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: '#E6EBE0', 
    marginRight: 6 
  },
  stepDotActive: { 
    width: 32, 
    backgroundColor: '#4A5D4A' 
  },
  content: { 
    flex: 1, 
    paddingTop: 40 
  },
  welcomeBadge: {
    backgroundColor: '#E6EBE0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A5D4A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: { 
    fontSize: 34, 
    fontWeight: '800', 
    color: '#1A1C1A', 
    letterSpacing: -1, 
    lineHeight: 40 
  },
  subtitle: { 
    fontSize: 17, 
    color: '#8C9A8C', 
    marginTop: 16, 
    lineHeight: 26,
    fontWeight: '400',
  },
  inputWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E6EBE0',
  },
  input: {
    flex: 1,
    fontSize: 26,
    color: '#1A1C1A',
    paddingVertical: 15,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  clearButton: {
    padding: 10,
  },
  footer: { 
    paddingBottom: 50 
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#1A1C1A', // Negro elegante
    padding: 22,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  nextButtonDisabled: { 
    backgroundColor: '#E6EBE0',
    shadowOpacity: 0 
  },
  nextButtonText: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#FDFBF6', 
    marginRight: 8 
  },
});