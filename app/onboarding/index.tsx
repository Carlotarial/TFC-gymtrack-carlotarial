import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser, UserData } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, Modal, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInUp, SlideInDown } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function NameScreen() {
  const router = useRouter();
  const { updateUser, profiles, selectProfile } = useUser();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [showProfiles, setShowProfiles] = useState(false);

  const handleContinue = async () => {
    await updateUser({ name });
    router.push({
      pathname: '/onboarding/objective',
      params: { userName: name }
    } as any);
  };

  const handleSelectProfile = async (profileName: string) => {
    await selectProfile(profileName);
    setShowProfiles(false);
    // Como ya está onboarded, redirigimos a tabs
    router.replace('/(tabs)' as any);
  };

  const s = dynamicStyles(colors);

  return (
    <View style={s.container}>
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

            {profiles.length > 0 && (
              <Pressable style={s.loginButton} onPress={() => setShowProfiles(true)}>
                <Text style={s.loginButtonText}>Ingresar con perfil existente</Text>
                <Ionicons name="people-outline" size={18} color={colors.accentDark} />
              </Pressable>
            )}
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

      {/* Modal de Selección de Perfil */}
      <Modal
        visible={showProfiles}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProfiles(false)}
      >
        <View style={s.modalOverlay}>
          <Pressable style={s.modalDismiss} onPress={() => setShowProfiles(false)} />
          <Animated.View entering={SlideInDown} style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Seleccionar Perfil</Text>
              <Pressable style={s.closeIcon} onPress={() => setShowProfiles(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={s.profileList}>
              {profiles.map((profile) => (
                <Pressable 
                  key={profile.name} 
                  style={s.profileCard}
                  onPress={() => handleSelectProfile(profile.name)}
                >
                  <View style={s.profileAvatar}>
                    <Text style={{fontSize: 24}}>💪</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={s.profileName}>{profile.name}</Text>
                    <Text style={s.profileMeta}>{profile.goal || 'Perfil nuevo'}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
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

  loginButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24, paddingVertical: 12 },
  loginButtonText: { fontSize: 15, fontWeight: '700', color: c.accentDark, marginRight: 8, textDecorationLine: 'underline' },

  nextButton: { flexDirection: 'row', backgroundColor: c.buttonPrimary, padding: 24, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: c.accent, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 5 },
  nextButtonDisabled: { backgroundColor: c.buttonDisabled, shadowOpacity: 0 },
  nextButtonText: { fontSize: 18, fontWeight: '800', color: c.buttonPrimaryText, marginRight: 10 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalDismiss: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  modalContent: { backgroundColor: c.background, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 32, minHeight: 400, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: c.text },
  closeIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.surface, justifyContent: 'center', alignItems: 'center' },
  
  profileList: { flex: 1 },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: c.surface, borderRadius: 24, marginBottom: 12, borderWidth: 1, borderColor: c.surfaceBorder },
  profileAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  profileName: { fontSize: 18, fontWeight: '700', color: c.text },
  profileMeta: { fontSize: 14, color: c.textSecondary, marginTop: 2 },
});