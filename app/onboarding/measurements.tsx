import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function MeasurementsScreen() {
  const router = useRouter();
  const { userName, goal, activity } = useLocalSearchParams();
  const { updateUser } = useUser();
  const { colors } = useTheme();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const isValid = weight.length > 0 && height.length > 0;
  const s = dynamicStyles(colors);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.container}
    >
      <Animated.View entering={FadeInRight.duration(400)} style={{ flex: 1 }}>
        <View style={staticStyles.stepContainer}>
          <View style={[s.stepDot, s.stepDotDone]} />
          <View style={[s.stepDot, s.stepDotDone]} />
          <View style={[s.stepDot, s.stepDotDone]} />
          <View style={[s.stepDot, s.stepDotActive]} />
        </View>

        <View style={staticStyles.header}>
          <Text style={s.title}>Tus medidas</Text>
          <Text style={s.subtitle}>Esto nos permite calcular tu IMC y ajustar tus objetivos calóricos.</Text>
        </View>

        <View style={staticStyles.inputsContainer}>
          <View style={staticStyles.inputGroup}>
            <Text style={s.label}>Peso actual</Text>
            <View style={s.inputWrapper}>
              <TextInput
                style={s.input}
                placeholder="00"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                maxLength={3}
              />
              <Text style={s.unitText}>kg</Text>
            </View>
          </View>

          <View style={staticStyles.inputGroup}>
            <Text style={s.label}>Altura</Text>
            <View style={s.inputWrapper}>
              <TextInput
                style={s.input}
                placeholder="000"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                maxLength={3}
              />
              <Text style={s.unitText}>cm</Text>
            </View>
          </View>
        </View>

        <View style={staticStyles.footer}>
          <Pressable 
            style={[s.nextButton, !isValid && s.nextButtonDisabled]} 
            disabled={!isValid}
            onPress={async () => {
              await updateUser({ weight, height });
              router.push({
                pathname: '/onboarding/generating',
                params: { userName, goal, activity, weight, height }
              } as any);
            }}
          >
            <Text style={s.nextButtonText}>Finalizar test</Text>
            <Ionicons name="checkmark-circle" size={20} color={colors.buttonPrimaryText} />
          </Pressable>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const staticStyles = StyleSheet.create({
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  header: { marginBottom: 40 },
  inputsContainer: { flex: 1 },
  inputGroup: { marginBottom: 24 },
  footer: { paddingBottom: 50 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 28 },
  stepDot: { width: 8, height: 4, borderRadius: 2, backgroundColor: c.accentLight, marginRight: 6 },
  stepDotActive: { width: 24, backgroundColor: c.accentDark },
  stepDotDone: { backgroundColor: c.accent },
  title: { fontSize: 30, fontWeight: '700', color: c.text, letterSpacing: -0.8 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 12, lineHeight: 24 },
  label: { fontSize: 14, fontWeight: '700', color: c.accentDark, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder, borderRadius: 20, paddingHorizontal: 20, height: 70, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
  input: { flex: 1, fontSize: 24, fontWeight: '600', color: c.text },
  unitText: { fontSize: 18, fontWeight: '700', color: c.accent },
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 22, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: c.buttonPrimaryText, marginRight: 8 },
});