import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
        {/* LOGO DE GYMTRACK: Descomenta la línea de <Image> de abajo una vez metas el archivo logo.png en tu carpeta assets/images/ */}
        <View style={s.logoContainer}>
          {/* <Image source={require('../../assets/images/logo.png')} style={s.logoImage} contentFit="contain" /> */}
          <Ionicons name="barbell" size={44} color={colors.accentDark} />
        </View>

        <View style={s.welcomeBadge}>
          <Text style={s.badgeText}>Bienvenido a GymTrack</Text>
        </View>
        
        <Text style={s.title}>Empecemos por tu nombre</Text>
        <Text style={s.subtitle}>
          Lo usaremos para personalizar tus rutinas y saludarte cada mañana.
        </Text>

        <View style={s.inputWrapper}>
          <TextInput
            style={s.input}
            placeholder="Tu nombre aquí..."
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
            selectionColor={colors.accentDark}
          />
          {name.length > 0 && (
            <Pressable onPress={() => setName('')} style={staticStyles.clearButton}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={staticStyles.footer}>
        <Pressable 
          style={[s.nextButton, !name && s.nextButtonDisabled]} 
          disabled={!name}
          onPress={handleContinue}
        >
          <Text style={s.nextButtonText}>Continuar</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.buttonPrimaryText} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const staticStyles = StyleSheet.create({
  content: { flex: 1, paddingTop: 40 },
  clearButton: { padding: 10 },
  footer: { paddingBottom: 50 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 32 },
  stepContainer: { flexDirection: 'row', marginTop: 70, marginBottom: 20, justifyContent: 'flex-start' },
  stepDot: { width: 12, height: 4, borderRadius: 2, backgroundColor: c.accentLight, marginRight: 6 },
  stepDotActive: { width: 32, backgroundColor: c.accentDark },
  logoContainer: { width: 80, height: 80, backgroundColor: c.surface, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 24, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: c.surfaceBorder },
  logoImage: { width: 44, height: 44 },
  welcomeBadge: { backgroundColor: c.accentLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 20 },
  badgeText: { fontSize: 12, fontWeight: '700', color: c.accentDark, textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 34, fontWeight: '800', color: c.text, letterSpacing: -1, lineHeight: 40 },
  subtitle: { fontSize: 17, color: c.textSecondary, marginTop: 16, lineHeight: 26, fontWeight: '400' },
  inputWrapper: { marginTop: 60, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: c.accentLight },
  input: { flex: 1, fontSize: 26, color: c.text, paddingVertical: 15, fontWeight: '600', letterSpacing: -0.5 },
  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 22, borderRadius: 24, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled, shadowOpacity: 0 },
  nextButtonText: { fontSize: 17, fontWeight: '700', color: c.buttonPrimaryText, marginRight: 8 },
});