import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function ObjectiveScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { updateUser } = useUser();
  const { colors } = useTheme();
  const [selectedGoal, setSelectedGoal] = useState('');

  const goals = [
    { id: 'perder_peso', title: 'Perder peso', desc: 'Déficit calórico y quema de grasa', icon: 'flame-outline' },
    { id: 'ganar_musculo', title: 'Ganar músculo', desc: 'Hipertrofia y aumento de fuerza', icon: 'barbell-outline' },
    { id: 'tonificar', title: 'Tonificar', desc: 'Definición y resistencia física', icon: 'fitness-outline' },
  ];

  const s = dynamicStyles(colors);

  return (
    <Animated.View entering={FadeInRight.duration(400)} style={s.container}>
      <View style={staticStyles.stepContainer}>
        { [1, 2, 3, 4].map((step) => (
          <View key={step} style={[s.stepDot, step === 2 && s.stepDotActive, step < 2 && s.stepDotDone]} />
        ))}
      </View>

      <View style={staticStyles.header}>
        <Text style={s.title}>¿Cuál es tu meta, {params.userName}?</Text>
        <Text style={s.subtitle}>Selecciona el enfoque de tu entrenamiento para los próximos meses.</Text>
      </View>

      <View style={staticStyles.optionsContainer}>
        {goals.map((goal) => (
          <Pressable 
            key={goal.id}
            style={[s.card, selectedGoal === goal.id && s.cardActive]}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <View style={[s.iconBox, selectedGoal === goal.id && s.iconBoxActive]}>
              <Ionicons 
                name={goal.icon as any} 
                size={24} 
                color={selectedGoal === goal.id ? colors.buttonPrimaryText : colors.accentDark} 
              />
            </View>
            <View style={staticStyles.textColumn}>
              <Text style={[s.cardTitle, selectedGoal === goal.id && s.cardTitleActive]}>{goal.title}</Text>
              <Text style={[s.cardDesc, selectedGoal === goal.id && s.cardDescActive]}>{goal.desc}</Text>
            </View>
            {selectedGoal === goal.id && (
              <Ionicons name="chevron-forward" size={20} color={colors.buttonPrimaryText} />
            )}
          </Pressable>
        ))}
      </View>

      <View style={staticStyles.footer}>
        <Pressable 
          style={[s.nextButton, !selectedGoal && s.nextButtonDisabled]} 
          disabled={!selectedGoal}
          onPress={async () => {
            await updateUser({ goal: selectedGoal });
            router.push({
              pathname: '/onboarding/activity',
              params: { userName: params.userName, goal: selectedGoal }
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
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'center' },
  header: { marginBottom: 40 },
  optionsContainer: { flex: 1 },
  textColumn: { flex: 1 },
  footer: { paddingBottom: 50 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 28 },
  stepDot: { width: 8, height: 4, borderRadius: 2, backgroundColor: c.accentLight, marginHorizontal: 4 },
  stepDotActive: { width: 24, backgroundColor: c.accentDark },
  stepDotDone: { backgroundColor: c.accent },
  title: { fontSize: 30, fontWeight: '700', color: c.text, letterSpacing: -0.8, lineHeight: 36 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 12, lineHeight: 24 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, padding: 20, borderRadius: 24, marginBottom: 16, borderWidth: 1, borderColor: c.surfaceBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  cardActive: { backgroundColor: c.accentDark, borderColor: c.accentDark },
  iconBox: { width: 48, height: 48, backgroundColor: c.background, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconBoxActive: { backgroundColor: 'rgba(255,255,255,0.15)' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: c.text },
  cardTitleActive: { color: c.buttonPrimaryText },
  cardDesc: { fontSize: 13, color: c.textSecondary, marginTop: 2 },
  cardDescActive: { color: c.buttonPrimaryText },
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 20, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled },
  nextButtonText: { fontSize: 16, fontWeight: '700', color: c.buttonPrimaryText, marginRight: 8 },
});