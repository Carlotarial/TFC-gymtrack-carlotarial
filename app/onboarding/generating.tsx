import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function GeneratingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulamos que la app está calculando la rutina durante 3 segundos
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Paso 4 de 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles" size={60} color="#CDA434" />
        </View>
        
        <Text style={styles.title}>Creando tu plan personalizado...</Text>
        <Text style={styles.subtitle}>
          Estamos ajustando los ejercicios a tus objetivos y nivel de actividad para que obtengas los mejores resultados.
        </Text>

        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#9CAF88" />
          <Text style={styles.loadingText}>Analizando tus datos</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Casi listo ✨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  header: {
    marginBottom: 60,
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#FAF3E0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A5D4A',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  loadingBox: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#9CAF88',
  },
  footer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8C9A8C',
    fontStyle: 'italic',
  },
});