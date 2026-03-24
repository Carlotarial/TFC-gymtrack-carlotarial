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
    { id: 'sedentario', title: 'Sedentario', desc: 'Paso la mayor parte del día sentada', icon: 'cafe-outline' },
    { id: 'moderado', title: 'Moderado', desc: 'Ejercicio de 1 a 2 veces por semana', icon: 'walk-outline' },
    { id: 'activo', title: 'Muy Activo', desc: 'Entreno duro más de 3 veces por semana', icon: 'flash-outline' },
  ];

  const s = dynamicStyles(colors);

  return (
    <Animated.View entering={FadeInRight.duration(400)} style={s.container}>
      <View style={staticStyles.stepContainer}>
        <View style={[s.stepDot, s.stepDotDone]} />
        <View style={[s.stepDot, s.stepDotDone]} />
        <View style={[s.stepDot, s.stepDotActive]} />
        <View style={s.stepDot} />
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
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={selectedActivity === item.id ? colors.buttonPrimaryText : colors.accentDark} 
              />
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
          <Ionicons name="arrow-forward" size={18} color={colors.buttonPrimaryText} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const staticStyles = StyleSheet.create({
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  header: { marginBottom: 40 },
  optionsContainer: { flex: 1 },
  textColumn: { flex: 1 },
  footer: { paddingBottom: 50 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 28 },
  stepDot: { width: 8, height: 4, borderRadius: 2, backgroundColor: c.accentLight, marginRight: 6 },
  stepDotActive: { width: 24, backgroundColor: c.accentDark },
  stepDotDone: { backgroundColor: c.accent },
  title: { fontSize: 30, fontWeight: '700', color: c.text, letterSpacing: -0.8 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 12, lineHeight: 24 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, padding: 22, borderRadius: 24, marginBottom: 16, borderWidth: 1, borderColor: c.surfaceBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 2 },
  cardActive: { backgroundColor: c.accentDark, borderColor: c.accentDark },
  iconBox: { width: 48, height: 48, backgroundColor: c.background, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconBoxActive: { backgroundColor: 'rgba(255,255,255,0.15)' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: c.text },
  cardTitleActive: { color: c.buttonPrimaryText },
  cardDesc: { fontSize: 13, color: c.textSecondary, marginTop: 2 },
  cardDescActive: { color: c.buttonPrimaryText },
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 22, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: c.buttonPrimaryText, marginRight: 8 },
});