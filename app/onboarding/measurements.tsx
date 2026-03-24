import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInRight.duration(400)} style={{ flex: 1 }}>
        <View style={staticStyles.stepContainer}>
          { [1, 2, 3, 4].map((step) => (
            <View key={step} style={[s.stepDot, step === 4 && s.stepDotActive, step < 4 && s.stepDotDone]} />
          ))}
        </View>

        <View style={staticStyles.header}>
          <Text style={s.title}>Tus medidas 📏</Text>
          <Text style={s.subtitle}>Esto nos permite calcular tu IMC y ajustar tus objetivos calóricos con la máxima precisión.</Text>
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
                selectionColor={colors.accentDark}
                cursorColor={colors.accentDark}
                underlineColorAndroid="transparent"
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
                selectionColor={colors.accentDark}
                cursorColor={colors.accentDark}
                underlineColorAndroid="transparent"
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
            <Ionicons name="sparkles" size={20} color={colors.buttonPrimaryText} />
          </Pressable>
        </View>
      </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const staticStyles = StyleSheet.create({
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  header: { marginBottom: 40 },
  inputsContainer: { flex: 1 },
  inputGroup: { marginBottom: 28 },
  footer: { paddingBottom: 50 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32 },
  stepDot: { width: 12, height: 6, borderRadius: 3, backgroundColor: c.surfaceBorder, marginRight: 8 },
  stepDotActive: { width: 32, backgroundColor: c.accent },
  stepDotDone: { backgroundColor: c.gold },
  title: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 12, lineHeight: 24, fontWeight: '500' },
  
  label: { fontSize: 14, fontWeight: '800', color: c.accentDark, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, borderRadius: 28, paddingHorizontal: 28, height: 80, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 2 },
  input: { flex: 1, fontSize: 32, fontWeight: '800', color: c.text },
  unitText: { fontSize: 20, fontWeight: '800', color: c.accent },
  
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 24, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: c.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 24 },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled, shadowOpacity: 0 },
  nextButtonText: { fontSize: 18, fontWeight: '800', color: c.buttonPrimaryText, marginRight: 8 },
});