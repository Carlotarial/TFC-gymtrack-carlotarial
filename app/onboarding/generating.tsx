import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function GeneratingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loadingText, setLoadingText] = useState('Analizando tu perfil');

  useEffect(() => {
    // 1. Lógica de mensajes dinámicos para dar realismo
    const messages = [
      'Analizando tu perfil...',
      'Calculando gasto calórico...',
      'Seleccionando ejercicios...',
      'Personalizando tu plan...'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex++;
      if (messageIndex < messages.length) {
        setLoadingText(messages[messageIndex]);
      }
    }, 800);

    // 2. Navegación final a la Home pasando el nombre
    const timer = setTimeout(() => {
      router.replace({
        pathname: '/(tabs)',
        params: { userName: params.userName }
      } as any);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Steppers finales (Todos marcados como completados) */}
      <View style={styles.stepContainer}>
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotDone]} />
        <View style={[styles.stepDot, styles.stepDotDone]} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="sparkles" size={40} color="#CDA434" />
        </View>
        
        <Text style={styles.title}>Estamos preparando tu plan</Text>
        <Text style={styles.subtitle}>
          Ajustando cada detalle a tus objetivos de {params.goal?.toString().replace('_', ' ') || 'bienestar'}.
        </Text>

        <View style={styles.loaderBox}>
          <ActivityIndicator size="small" color="#9CAF88" />
          <Text style={styles.loadingMessage}>{loadingText}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Casi listo</Text>
      </View>
    </View>
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
    marginBottom: 40, 
    justifyContent: 'flex-start' 
  },
  stepDot: { 
    width: 8, 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: '#E6EBE0', 
    marginRight: 6 
  },
  stepDotDone: { 
    backgroundColor: '#9CAF88' 
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconCircle: { 
    width: 100, 
    height: 100, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#1A1C1A', 
    textAlign: 'center', 
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#8C9A8C', 
    textAlign: 'center', 
    lineHeight: 24, 
    marginTop: 16,
    paddingHorizontal: 10
  },
  loaderBox: { 
    marginTop: 60, 
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F0F2ED',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  loadingMessage: { 
    marginLeft: 12,
    fontSize: 14, 
    fontWeight: '600', 
    color: '#4A5D4A' 
  },
  footer: { 
    marginBottom: 50, 
    alignItems: 'center' 
  },
  footerText: { 
    fontSize: 13, 
    color: '#C1C7C1', 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
});