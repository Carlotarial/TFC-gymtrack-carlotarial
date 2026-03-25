import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useNotifications } from '@/hooks/useNotifications';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, updateUser, resetUser } = useUser();
  const { colors, mode, setMode } = useTheme();
  const { isEnabled: notificationsEnabled, toggleNotifications } = useNotifications();

  const [showStats, setShowStats] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempWeight, setTempWeight] = useState(user.weight || '');
  const [tempHeight, setTempHeight] = useState(user.height || '');

  // Modales interactivos
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingDone, setRatingDone] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const userName = user.name || 'Usuario GymTrack';

  const { userInitial, userEmail } = useMemo(() => {
    const initial = userName.charAt(0).toUpperCase();
    const email = `${userName.toLowerCase().replace(/\s+/g, '')}@gymtrack.com`;
    return { userInitial: initial, userEmail: email };
  }, [userName]);

  const handleLogout = async () => {
    await resetUser();
    router.replace('/onboarding' as any);
  };

  const handleThemeToggle = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setMode(nextMode);
  };

  const handleSaveStats = async () => {
    await updateUser({
      weight: tempWeight,
      height: tempHeight,
    });
    setIsEditing(false);
  };

  const getThemeLabel = () => {
    if (mode === 'system') return 'Sistema';
    if (mode === 'dark') return 'Oscuro';
    return 'Claro';
  };

  const getThemeEmoji = () => {
    if (mode === 'system') return '⚙️';
    if (mode === 'dark') return '🌙';
    return '☀️';
  };

  const s = dynamicStyles(colors);

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={s.header}>
          <Text style={s.title}>Tu Perfil 👩🏻‍💻</Text>
          <Text style={s.subtitle}>Configura el entorno de GymTrack</Text>
        </View>

        {/* Tarjeta de Perfil Pastoral */}
        <View style={s.profileCard}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{userInitial}</Text>
          </View>
          <View style={staticStyles.profileInfo}>
            <Text style={s.profileName}>{userName}</Text>
            <Text style={s.profileEmail}>{userEmail}</Text>
          </View>
        </View>

        {/* SECCIÓN: PREFERENCIAS */}
        <View style={staticStyles.section}>
          <Text style={s.sectionTitle}>Preferencias</Text>

          <TouchableOpacity style={s.settingItem} onPress={handleThemeToggle} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.accentLight }]}>
                <Text style={{ fontSize: 20 }}>{getThemeEmoji()}</Text>
              </View>
              <Text style={s.settingText}>Modo Visual</Text>
            </View>
            <View style={s.themeBadge}>
              <Text style={s.themeBadgeText}>{getThemeLabel()}</Text>
            </View>
          </TouchableOpacity>

          <View style={s.settingItem}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.goldLight }]}>
                <Text style={{ fontSize: 20 }}>🔔</Text>
              </View>
              <Text style={s.settingText}>Recordatorios</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={(val) => { toggleNotifications(val); }}
              trackColor={{ false: colors.barInactive, true: colors.accent }}
              thumbColor={colors.buttonPrimaryText}
            />
          </View>

          <TouchableOpacity
            style={s.settingItem}
            activeOpacity={0.7}
            onPress={() => setShowStats(!showStats)}
          >
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.surfaceBorder }]}>
                <Text style={{ fontSize: 20 }}>📏</Text>
              </View>
              <Text style={s.settingText}>Mis Datos Físicos</Text>
            </View>
            <Text style={{ fontSize: 16, color: colors.textSecondary }}>{showStats ? '⌄' : '›'}</Text>
          </TouchableOpacity>

          {showStats && (
            <Animated.View entering={FadeInDown.duration(400)} style={s.statsContainer}>
              <View style={staticStyles.statsHeader}>
                <Text style={s.statsTitle}>Detalles físicos</Text>
                <TouchableOpacity
                  onPress={() => isEditing ? handleSaveStats() : setIsEditing(true)}
                  style={[s.editBadge, isEditing && { backgroundColor: colors.accent }]}
                >
                  <Ionicons
                    name={isEditing ? "checkmark" : "pencil"}
                    size={14}
                    color={isEditing ? colors.buttonPrimaryText : colors.accent}
                  />
                  <Text style={[s.editBadgeText, isEditing && { color: colors.buttonPrimaryText }]}>
                    {isEditing ? 'Guardar' : 'Editar'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={staticStyles.statsRow}>
                <View style={s.statBox}>
                  <Text style={s.statLabel}>Peso</Text>
                  {isEditing ? (
                    <View style={s.inputWrapper}>
                      <TextInput
                        style={s.statInput}
                        value={tempWeight}
                        onChangeText={setTempWeight}
                        keyboardType="numeric"
                        placeholder="00"
                        placeholderTextColor={colors.textMuted}
                      />
                      <Text style={s.statUnit}>kg</Text>
                    </View>
                  ) : (
                    <Text style={s.statValue}>{user.weight || '--'} <Text style={s.statUnit}>kg</Text></Text>
                  )}
                </View>
                <View style={s.statBox}>
                  <Text style={s.statLabel}>Altura</Text>
                  {isEditing ? (
                    <View style={s.inputWrapper}>
                      <TextInput
                        style={s.statInput}
                        value={tempHeight}
                        onChangeText={setTempHeight}
                        keyboardType="numeric"
                        placeholder="000"
                        placeholderTextColor={colors.textMuted}
                      />
                      <Text style={s.statUnit}>cm</Text>
                    </View>
                  ) : (
                    <Text style={s.statValue}>{user.height || '--'} <Text style={s.statUnit}>cm</Text></Text>
                  )}
                </View>
              </View>
              <View style={staticStyles.statsRow}>
                <View style={s.statBox}>
                  <Text style={s.statLabel}>Objetivo</Text>
                  <Text style={s.statValueSmall}>{user.goal || 'General'}</Text>
                </View>
                <View style={s.statBox}>
                  <Text style={s.statLabel}>Actividad</Text>
                  <Text style={s.statValueSmall}>{user.activityLevel || 'Sedentario'}</Text>
                </View>
              </View>
            </Animated.View>
          )}
        </View>

        {/* SECCIÓN: GENERAL */}
        <View style={staticStyles.section}>
          <Text style={s.sectionTitle}>General</Text>

          <TouchableOpacity style={s.settingItem} onPress={() => setShowRating(true)} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.surfaceBorder }]}>
                <Text style={{ fontSize: 20 }}>⭐</Text>
              </View>
              <Text style={s.settingText}>Valorar la App</Text>
            </View>
            <Text style={{ fontSize: 16, color: colors.textSecondary }}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.settingItem} onPress={() => setShowSupport(true)} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.surfaceBorder }]}>
                <Text style={{ fontSize: 20 }}>🎧</Text>
              </View>
              <Text style={s.settingText}>Ayuda y Soporte</Text>
            </View>
            <Text style={{ fontSize: 16, color: colors.textSecondary }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* BOTÓN DE LOGOUT */}
        <TouchableOpacity style={s.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={{ fontSize: 20, marginRight: 8 }}>🚪</Text>
          <Text style={s.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL DE VALORACIÓN */}
      <Modal visible={showRating} transparent animationType="fade">
        <View style={staticStyles.modalOverlay}>
          <Animated.View entering={ZoomIn.duration(400)} style={s.modalContent}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>✨</Text>
            <Text style={s.modalTitle}>{ratingDone ? '¡Gracias!' : 'Valorar GymTrack'}</Text>
            <Text style={s.modalSubtitle}>
              {ratingDone ? 'Tu opinión nos ayuda a mejorar cada día.' : '¿Qué te ha parecido nuestra APP?'}
            </Text>
            {!ratingDone ? (
              <View style={staticStyles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <TouchableOpacity key={s} onPress={() => setRating(s)}>
                    <Ionicons name={rating >= s ? "star" : "star-outline"} size={40} color={colors.accent} style={{ marginHorizontal: 4 }} />
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
            <TouchableOpacity
              style={[s.modalButton, (rating === 0 && !ratingDone) && { opacity: 0.5 }]}
              onPress={() => {
                if (ratingDone) { setShowRating(false); setRatingDone(false); setRating(0); }
                else if (rating > 0) setRatingDone(true);
              }}
              disabled={rating === 0 && !ratingDone}
            >
              <Text style={s.modalButtonText}>{ratingDone ? 'Cerrar' : 'Enviar valoración'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* MODAL DE SOPORTE / FAQ */}
      <Modal visible={showSupport} transparent animationType="fade">
        <View style={staticStyles.modalOverlay}>
          <Animated.View entering={FadeInUp.duration(400)} style={s.modalContentWide}>
            <View style={staticStyles.modalHeader}>
              <Text style={s.modalTitle}>Ayuda y Soporte</Text>
              <TouchableOpacity onPress={() => setShowSupport(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
              {[
                { q: '¿Cómo cambio mi peso?', a: 'En la sección "Mis Datos Físicos" pulsa en "Editar" para actualizar tus métricas.' },
                { q: '¿Es gratuita la app?', a: '¡Por supuesto! GymTrack es un proyecto realizado para el TFC.' },
                { q: '¿Hay más rutinas?', a: 'Estamos añadiendo nuevos entrenamientos dinámicos constantemente en la sección Descubrir.' }
              ].map((item, i) => (
                <TouchableOpacity key={i} style={s.faqItem} onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                  <View style={staticStyles.faqHeader}>
                    <Text style={s.faqQuestion}>{item.q}</Text>
                    <Ionicons name={expandedFaq === i ? "chevron-up" : "chevron-down"} size={18} color={colors.accent} />
                  </View>
                  {expandedFaq === i && <Text style={s.faqAnswer}>{item.a}</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={[s.modalButton, { marginTop: 20 }]} onPress={() => setShowSupport(false)}>
              <Text style={s.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const staticStyles = StyleSheet.create({
  profileInfo: { flex: 1 },
  section: { marginBottom: 32 },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
  statsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32, marginTop: 10 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  container: { flex: 1, paddingHorizontal: 24 },
  header: { marginTop: 40, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4, fontWeight: '500' },

  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.accent, padding: 24, borderRadius: 36, marginBottom: 40, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 6 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: c.background, justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  avatarText: { fontSize: 24, fontWeight: '800', color: c.accentDark },
  profileName: { fontSize: 22, fontWeight: '800', color: c.background },
  profileEmail: { fontSize: 14, color: c.background, marginTop: 4, opacity: 0.9 },

  sectionTitle: { fontSize: 13, fontWeight: '800', color: c.textSecondary, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1.5 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.surface, padding: 20, borderRadius: 28, marginBottom: 12, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 20, elevation: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  settingText: { fontSize: 17, color: c.text, fontWeight: '600' },
  themeBadge: { backgroundColor: c.background, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  themeBadgeText: { fontSize: 14, fontWeight: '700', color: c.accentDark },

  logoutButton: { marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 24, borderRadius: 32, backgroundColor: c.goldLight, shadowColor: c.gold, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 20 },
  logoutText: { fontSize: 18, fontWeight: '700', color: c.gold },

  statsContainer: { backgroundColor: c.surface, padding: 24, borderRadius: 36, marginTop: -12, marginBottom: 16, borderWidth: 1, borderColor: c.surfaceBorder, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  statsTitle: { fontSize: 16, fontWeight: '800', color: c.text, letterSpacing: -0.5 },
  editBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.accentLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  editBadgeText: { fontSize: 12, fontWeight: '800', color: c.accent, marginLeft: 4 },

  statBox: { backgroundColor: c.background, flex: 0.48, padding: 16, borderRadius: 24, alignItems: 'center', justifyContent: 'center', minHeight: 90 },
  statLabel: { fontSize: 11, color: c.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  statValue: { fontSize: 22, fontWeight: '800', color: c.text },
  statValueSmall: { fontSize: 14, fontWeight: '700', color: c.accent, textAlign: 'center' },
  statUnit: { fontSize: 14, color: c.textMuted, fontWeight: '500' },

  inputWrapper: { flexDirection: 'row', alignItems: 'baseline', borderBottomWidth: 2, borderBottomColor: c.accent, paddingBottom: 2 },
  statInput: { fontSize: 24, fontWeight: '800', color: c.text, textAlign: 'center', width: 60, padding: 0 },

  // Estilos de Modales
  modalContent: { backgroundColor: c.surface, width: '100%', borderRadius: 40, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  modalContentWide: { backgroundColor: c.surface, width: '100%', borderRadius: 40, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: c.text, textAlign: 'center', marginBottom: 8 },
  modalSubtitle: { fontSize: 16, color: c.textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  modalButton: { backgroundColor: c.accent, width: '100%', padding: 20, borderRadius: 24, alignItems: 'center' },
  modalButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },

  faqItem: { backgroundColor: c.background, padding: 20, borderRadius: 24, marginBottom: 12 },
  faqQuestion: { fontSize: 15, fontWeight: '700', color: c.text, flex: 1 },
  faqAnswer: { fontSize: 14, color: c.textSecondary, marginTop: 10, lineHeight: 20 },
});