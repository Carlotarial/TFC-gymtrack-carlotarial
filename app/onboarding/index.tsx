import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function NameScreen() {
  const router = useRouter();
  const { updateUser } = useUser();
  const { colors } = useTheme();
  const [name, setName] = useState('');

  const handleContinue = async () => {
    await updateUser({ name });
    router.push({
      pathname: '/onboarding/objective',
      params: { userName: name }
    } as any);
  };

  const s = dynamicStyles(colors);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.container}
    >
      <View style={s.stepContainer}>
        <View style={[s.stepDot, s.stepDotActive]} />
        <View style={s.stepDot} />
        <View style={s.stepDot} />
        <View style={s.stepDot} />
      </View>

      <View style={staticStyles.content}>
        <Animated.View entering={FadeInUp.duration(600).delay(100)}>
          {/* LOGO DE GYMTRACK: Descomenta la línea de <Image> de abajo una vez metas logo.png en assets/images/ */}
          <View style={s.logoContainer}>
            {/* <Image source={require('../../assets/images/logo.png')} style={s.logoImage} contentFit="contain" /> */}
            <Text style={{fontSize: 40}}>🌱</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <View style={s.welcomeBadge}>
            <Text style={s.badgeText}>Bienvenido a GymTrack</Text>
          </View>
          <Text style={s.title}>Empecemos a conocerte</Text>
          <Text style={s.subtitle}>¿Cómo te gustaría que te llamáramos durante tus entrenamientos?</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(300)} style={staticStyles.inputContainer}>
          <TextInput
            style={s.input}
            placeholder="Tu nombre (ej. Carlota)"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            selectionColor={colors.accentDark}
            cursorColor={colors.accentDark}
            underlineColorAndroid="transparent"
          />
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.duration(600).delay(400)} style={staticStyles.footer}>
        <Pressable 
          style={[s.nextButton, name.trim().length === 0 && s.nextButtonDisabled]} 
          disabled={name.trim().length === 0}
          onPress={handleContinue}
        >
          <Text style={s.nextButtonText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.buttonPrimaryText} />
        </Pressable>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const staticStyles = StyleSheet.create({
  content: { flex: 1, paddingTop: 20 },
  inputContainer: { marginTop: 40 },
  footer: { paddingBottom: 50 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32 },
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  stepDot: { width: 12, height: 6, borderRadius: 3, backgroundColor: c.surfaceBorder, marginRight: 8 },
  stepDotActive: { width: 32, backgroundColor: c.accent },
  
  logoContainer: { width: 88, height: 88, backgroundColor: c.surface, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 32, alignSelf: 'flex-start', shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  logoImage: { width: 44, height: 44 },
  
  welcomeBadge: { backgroundColor: c.accentLight, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 24 },
  badgeText: { fontSize: 13, fontWeight: '800', color: c.accentDark, textTransform: 'uppercase', letterSpacing: 1.5 },
  
  title: { fontSize: 36, fontWeight: '800', color: c.text, letterSpacing: -1, lineHeight: 42 },
  subtitle: { fontSize: 17, color: c.textSecondary, marginTop: 16, lineHeight: 26, fontWeight: '500' },
  
  input: { backgroundColor: c.surface, borderRadius: 28, paddingHorizontal: 28, height: 80, fontSize: 18, fontWeight: '600', color: c.text, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 2 },
  
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 24, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: c.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 4 },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled, shadowOpacity: 0 },
  nextButtonText: { fontSize: 18, fontWeight: '800', color: c.buttonPrimaryText, marginRight: 8 },
});