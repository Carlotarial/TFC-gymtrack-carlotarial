import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useNotifications } from '@/hooks/useNotifications';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, SlideInDown, ZoomIn } from 'react-native-reanimated';

const AVATARS = [
  { id: 'golden', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'husky', url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'pug', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'corgi', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'beagle', url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'frenchie', url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'dalmatian', url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'shiba', url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'labrador', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'border', url: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=250&h=250&fit=crop&fm=jpg&q=80' },
  { id: 'schnauzer', url: 'https://i.pinimg.com/564x/67/1c/85/671c85f3129e46c6deffb6cc6b6abe99.jpg' },
  { id: 'poodle', url: 'https://i.pinimg.com/736x/ed/f1/20/edf120eade64c26bf371356174463cfd.jpg' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { user, updateUser, logout, deleteProfile } = useUser();
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const userName = user.name || 'Usuario GymTrack';

  const { userInitial, userEmail } = useMemo(() => {
    const initial = userName.charAt(0).toUpperCase();
    const email = `${userName.toLowerCase().replace(/\s+/g, '')}@gymtrack.com`;
    return { userInitial: initial, userEmail: email };
  }, [userName]);

  const handleLogout = async () => {
    await logout();
    router.replace('/onboarding' as any);
  };

  const handleDeleteProfile = async () => {
    await deleteProfile(user.name);
    setShowDeleteConfirm(false);
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
          <TouchableOpacity
            style={s.avatar}
            activeOpacity={0.8}
            onPress={() => setShowAvatarModal(true)}
          >
            {user.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={s.avatarImage}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <Text style={s.avatarText}>{userInitial}</Text>
            )}
            <View style={s.avatarEditBadge}>
              <Ionicons name="images" size={12} color={colors.accent} />
            </View>
          </TouchableOpacity>
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

        {/* BOTONES DE SESIÓN */}
        <View style={{ marginTop: 24, gap: 12 }}>
          <TouchableOpacity style={s.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={22} color={colors.gold} style={{ marginRight: 10 }} />
            <Text style={s.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.logoutButton, { backgroundColor: '#FFEEED', shadowColor: '#FF6B6B' }]}
            onPress={() => setShowDeleteConfirm(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={22} color="#FF6B6B" style={{ marginRight: 10 }} />
            <Text style={[s.logoutText, { color: '#FF6B6B' }]}>Eliminar Perfil</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* MODAL DE VALORACIÓN */}
      <Modal visible={showRating} transparent animationType="fade">
        <View style={staticStyles.modalOverlay}>
          <Animated.View entering={ZoomIn.duration(400)} style={s.modalContent}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>👏</Text>
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

      {/* MODAL DE SELECCIÓN DE AVATAR */}
      <Modal
        visible={showAvatarModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAvatarModal(false)}
      >
        <View style={staticStyles.modalOverlay}>
          <Pressable style={staticStyles.modalDismiss} onPress={() => setShowAvatarModal(false)} />
          <Animated.View entering={SlideInDown} style={s.avatarModalContent}>
            <View style={staticStyles.modalHeader}>
              <Text style={s.modalTitle}>Símbolo de Atleta</Text>
              <TouchableOpacity onPress={() => setShowAvatarModal(false)} style={s.closeIcon}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={s.avatarGrid}>
              {AVATARS.map((av) => (
                <TouchableOpacity
                  key={av.id}
                  style={[s.avatarItem, user.avatar === av.url && s.avatarItemActive]}
                  onPress={async () => {
                    await updateUser({ avatar: av.url });
                    setShowAvatarModal(false);
                  }}
                >
                  <Image
                    source={{ uri: av.url }}
                    style={s.gridAvatarImage}
                    contentFit="cover"
                    transition={200}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      <Modal visible={showDeleteConfirm} transparent animationType="fade">
        <View style={staticStyles.modalOverlay}>
          <Animated.View entering={ZoomIn.duration(400)} style={s.modalContent}>
            <View style={[s.iconBox, { backgroundColor: '#FFEEED', marginBottom: 20 }]}>
              <Ionicons name="warning" size={32} color="#FF6B6B" />
            </View>
            <Text style={s.modalTitle}>¿Eliminar perfil?</Text>
            <Text style={s.modalSubtitle}>
              Esta acción borrará permanentemente todo tu progreso, rachas e historial. No podrás recuperarlo.
            </Text>

            <View style={{ width: '100%', gap: 12 }}>
              <TouchableOpacity
                style={[s.modalButton, { backgroundColor: '#FF6B6B' }]}
                onPress={handleDeleteProfile}
              >
                <Text style={s.modalButtonText}>Sí, eliminar para siempre</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.modalButton, { backgroundColor: colors.surfaceBorder }]}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={[s.modalButtonText, { color: colors.text }]}>No, mantener perfil</Text>
              </TouchableOpacity>
            </View>
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
  modalDismiss: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32, marginTop: 10 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  container: { flex: 1, paddingHorizontal: 24 },
  header: { marginTop: 15, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4, fontWeight: '500' },

  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.accent, padding: 24, borderRadius: 36, marginBottom: 40, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 6 },
  avatar: { width: 78, height: 78, borderRadius: 39, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center', marginRight: 20, position: 'relative', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontSize: 32, fontWeight: '800', color: c.accentDark },
  avatarEditBadge: { position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: c.background, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: c.accent, zIndex: 10 },
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
  avatarModalContent: { backgroundColor: c.background, width: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 32, position: 'absolute', bottom: 0, minHeight: 450 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: c.text, textAlign: 'center' },
  modalSubtitle: { fontSize: 16, color: c.textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  modalButton: { backgroundColor: c.accent, width: '100%', padding: 20, borderRadius: 24, alignItems: 'center' },
  modalButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  closeIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.surface, justifyContent: 'center', alignItems: 'center' },

  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  avatarItem: { width: '31%', aspectRatio: 1, backgroundColor: c.accentLight, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: c.surfaceBorder, overflow: 'hidden' },
  avatarItemActive: { borderColor: c.accent, borderWidth: 2, backgroundColor: c.accentLight },
  gridAvatarImage: { width: '100%', height: '100%' },

  faqItem: { backgroundColor: c.background, padding: 20, borderRadius: 24, marginBottom: 12 },
  faqQuestion: { fontSize: 15, fontWeight: '700', color: c.text, flex: 1 },
  faqAnswer: { fontSize: 14, color: c.textSecondary, marginTop: 10, lineHeight: 20 },
});