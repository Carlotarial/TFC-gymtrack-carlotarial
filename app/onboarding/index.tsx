import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
    <View style={s.container}>
      {/* Background Blobs for Impact */}
      <Animated.View entering={FadeIn.delay(200).duration(1500)} style={s.blob1} />
      <Animated.View entering={FadeIn.delay(400).duration(1500)} style={s.blob2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={s.stepContainer}>
          <View style={[s.stepDot, s.stepDotActive]} />
          <View style={s.stepDot} />
          <View style={s.stepDot} />
          <View style={s.stepDot} />
        </View>

        <View style={staticStyles.content}>
          <Animated.View entering={FadeInUp.duration(800).delay(100)}>
            <View style={s.logoWrapper}>
              <View style={s.logoInner}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={s.logoImage}
                  contentFit="contain"
                  transition={1000}
                />
              </View>
              <View style={s.logoShadow} />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(800).delay(300)}>
            <View style={s.welcomeBadge}>
              <Ionicons name="sparkles" size={14} color={colors.accentDark} style={{ marginRight: 6 }} />
              <Text style={s.badgeText}>Tu viaje comienza aquí</Text>
            </View>
            <Text style={s.title}>Crea tu perfil {"\n"}de atleta</Text>
            <Text style={s.subtitle}>
              Personalizaremos cada gramo y cada repetición para que alcances tu mejor versión.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(800).delay(500)} style={staticStyles.inputContainer}>
            <View style={s.inputWrapper}>
              <Ionicons name="person-outline" size={22} color={colors.accent} style={{ marginLeft: 20 }} />
              <TextInput
                style={s.input}
                placeholder="Escribe tu nombre..."
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                selectionColor={colors.accentDark}
                cursorColor={colors.accentDark}
                underlineColorAndroid="transparent"
              />
            </View>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.duration(800).delay(700)} style={staticStyles.footer}>
          <Pressable
            style={[s.nextButton, name.trim().length === 0 && s.nextButtonDisabled]}
            disabled={name.trim().length === 0}
            onPress={handleContinue}
          >
            <Text style={s.nextButtonText}>Comenzar ahora</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.buttonPrimaryText} />
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  content: { flex: 1, paddingTop: 20 },
  inputContainer: { marginTop: 48 },
  footer: { paddingBottom: 60 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32, overflow: 'hidden' },

  // Background Accents
  blob1: { position: 'absolute', width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8, borderRadius: SCREEN_WIDTH * 0.4, backgroundColor: c.accentLight, top: -100, right: -100, opacity: 0.6 },
  blob2: { position: 'absolute', width: SCREEN_WIDTH * 0.6, height: SCREEN_WIDTH * 0.6, borderRadius: SCREEN_WIDTH * 0.3, backgroundColor: c.goldLight, bottom: 20, left: -100, opacity: 0.4 },

  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 40, justifyContent: 'flex-start' },
  stepDot: { width: 12, height: 6, borderRadius: 3, backgroundColor: c.surfaceBorder, marginRight: 8 },
  stepDotActive: { width: 32, backgroundColor: c.accent },

  logoWrapper: { width: 100, height: 100, marginBottom: 40, position: 'relative' },
  logoInner: { width: '100%', height: '100%', backgroundColor: c.surface, borderRadius: 32, justifyContent: 'center', alignItems: 'center', zIndex: 2, borderWidth: 1, borderColor: c.surfaceBorder, overflow: 'hidden' },
  logoImage: { width: '80%', height: '80%' },
  logoShadow: { position: 'absolute', width: '90%', height: '90%', backgroundColor: c.accent, bottom: -8, right: -8, borderRadius: 32, opacity: 0.15, zIndex: 1 },

  welcomeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.accentLight, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, alignSelf: 'flex-start', marginBottom: 24, borderWidth: 1, borderColor: c.accent },
  badgeText: { fontSize: 13, fontWeight: '800', color: c.accentDark, textTransform: 'uppercase', letterSpacing: 1 },

  title: { fontSize: 42, fontWeight: '900', color: c.text, letterSpacing: -1.5, lineHeight: 48 },
  subtitle: { fontSize: 18, color: c.textSecondary, marginTop: 18, lineHeight: 28, fontWeight: '500', opacity: 0.9 },

  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, borderRadius: 28, height: 84, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.06, shadowRadius: 24, elevation: 3, borderWidth: 1, borderColor: c.surfaceBorder },
  input: { flex: 1, height: '100%', paddingHorizontal: 16, fontSize: 18, fontWeight: '700', color: c.text, outlineStyle: 'none' } as any,

  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 24, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: c.accent, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 5 },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled, shadowOpacity: 0 },
  nextButtonText: { fontSize: 18, fontWeight: '800', color: c.buttonPrimaryText, marginRight: 10 },
});