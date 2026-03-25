import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function ActivityScreen() {
  const router = useRouter();
  const { userName, goal } = useLocalSearchParams();
  const { updateUser } = useUser();
  const { colors } = useTheme();
  const [selectedActivity, setSelectedActivity] = useState('');

  const activities = [
    { id: 'sedentario', title: 'Sedentario', desc: 'Paso la mayor parte del día sentada', emoji: '🛋️' },
    { id: 'moderado', title: 'Moderado', desc: 'Ejercicio de 1 a 2 veces por semana', emoji: '🚶🏻' },
    { id: 'activo', title: 'Muy Activo', desc: 'Entreno duro más de 3 veces por semana', emoji: '⚡' },
  ];

  const s = dynamicStyles(colors);

  return (
    <Animated.View entering={FadeInRight.duration(400)} style={s.container}>
      <View style={staticStyles.stepContainer}>
        { [1, 2, 3, 4].map((step) => (
          <View key={step} style={[s.stepDot, step === 3 && s.stepDotActive, step < 3 && s.stepDotDone]} />
        ))}
      </View>

      <View style={staticStyles.header}>
        <Text style={s.title}>Nivel de actividad</Text>
        <Text style={s.subtitle}>Esto nos permite calcular tu gasto calórico y ajustar la intensidad.</Text>
      </View>

      <View style={staticStyles.optionsContainer}>
        {activities.map((item) => (
          <Pressable 
            key={item.id}
            style={[s.card, selectedActivity === item.id && s.cardActive]}
            onPress={() => setSelectedActivity(item.id)}
          >
            <View style={[s.iconBox, selectedActivity === item.id && s.iconBoxActive]}>
              <Text style={{fontSize: 28}}>{item.emoji}</Text>
            </View>
            <View style={staticStyles.textColumn}>
              <Text style={[s.cardTitle, selectedActivity === item.id && s.cardTitleActive]}>
                {item.title}
              </Text>
              <Text style={[s.cardDesc, selectedActivity === item.id && s.cardDescActive]}>
                {item.desc}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={staticStyles.footer}>
        {/* Botón de Atrás Secundario */}
        <Pressable 
          style={s.backButtonSecondary} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.accentDark} />
        </Pressable>

        <Pressable 
          style={[s.nextButton, !selectedActivity && s.nextButtonDisabled]} 
          disabled={!selectedActivity}
          onPress={async () => {
            await updateUser({ activityLevel: selectedActivity });
            router.push({
              pathname: '/onboarding/measurements',
              params: { userName, goal, activity: selectedActivity }
            } as any);
          }}
        >
          <Text style={s.nextButtonText}>Siguiente paso</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.buttonPrimaryText} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const staticStyles = StyleSheet.create({
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  header: { marginBottom: 40 },
  optionsContainer: { flex: 1 },
  textColumn: { flex: 1, paddingLeft: 8 },
  footer: { paddingBottom: 50, flexDirection: 'row', alignItems: 'center' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32 },
  stepDot: { width: 12, height: 6, borderRadius: 3, backgroundColor: c.surfaceBorder, marginRight: 8 },
  stepDotActive: { width: 32, backgroundColor: c.accent },
  stepDotDone: { backgroundColor: c.gold },
  title: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 12, lineHeight: 24, fontWeight: '500' },
  
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, padding: 24, borderRadius: 32, marginBottom: 16, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 2 },
  cardActive: { backgroundColor: c.accentDark, shadowOpacity: 0.15, shadowColor: c.accentDark, shadowRadius: 30 },
  
  iconBox: { width: 60, height: 60, backgroundColor: c.background, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconBoxActive: { backgroundColor: c.accent },
  
  cardTitle: { fontSize: 18, fontWeight: '800', color: c.text, letterSpacing: -0.5 },
  cardTitleActive: { color: c.buttonPrimaryText },
  cardDesc: { fontSize: 14, color: c.textSecondary, marginTop: 4, fontWeight: '500' },
  cardDescActive: { color: c.buttonPrimaryText, opacity: 0.9 },
  
  nextButton: { flex: 1, flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 24, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: c.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 24 },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled, shadowOpacity: 0 },
  nextButtonText: { fontSize: 18, fontWeight: '800', color: c.buttonPrimaryText, marginRight: 8 },
  
  backButtonSecondary: { width: 64, height: 64, borderRadius: 32, backgroundColor: c.surface, justifyContent: 'center', alignItems: 'center', marginRight: 16, borderWidth: 1, borderColor: c.surfaceBorder, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
});