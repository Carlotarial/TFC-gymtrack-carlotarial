import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '@/hooks/useNotifications';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, resetUser } = useUser();
  const { colors, mode, setMode, isDark } = useTheme();
  
  const { isEnabled: notificationsEnabled, toggleNotifications } = useNotifications();

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

  // Ciclar entre modos de tema
  const handleThemeToggle = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setMode(nextMode);
  };

  const getThemeLabel = () => {
    if (mode === 'system') return 'Sistema';
    if (mode === 'dark') return 'Oscuro';
    return 'Claro';
  };

  const getThemeIcon = (): any => {
    if (mode === 'system') return 'phone-portrait-outline';
    if (mode === 'dark') return 'moon-outline';
    return 'sunny-outline';
  };

  const s = dynamicStyles(colors);

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView 
        style={s.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={s.header}>
          <Text style={s.title}>Ajustes</Text>
          <Text style={s.subtitle}>Gestiona tu cuenta y preferencias</Text>
        </View>

        {/* Tarjeta de Perfil */}
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
          
          {/* Toggle tema oscuro */}
          <TouchableOpacity style={s.settingItem} onPress={handleThemeToggle} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.accentLight }]}>
                <Ionicons name={getThemeIcon()} size={20} color={colors.accentDark} />
              </View>
              <Text style={s.settingText}>Tema</Text>
            </View>
            <View style={s.themeBadge}>
              <Text style={s.themeBadgeText}>{getThemeLabel()}</Text>
            </View>
          </TouchableOpacity>

          <View style={s.settingItem}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.barInactive }]}>
                <Ionicons name="notifications-outline" size={20} color={colors.accentDark} />
              </View>
              <Text style={s.settingText}>Notificaciones</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={(val) => { toggleNotifications(val); }}
              trackColor={{ false: false ? colors.accentLight : colors.barInactive, true: colors.accent }}
              thumbColor={colors.buttonPrimaryText}
            />
          </View>

          <TouchableOpacity style={s.settingItem} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.background }]}>
                <Ionicons name="person-outline" size={20} color={colors.accentDark} />
              </View>
              <Text style={s.settingText}>Mis Datos Físicos</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN: GENERAL */}
        <View style={staticStyles.section}>
          <Text style={s.sectionTitle}>General</Text>

          <TouchableOpacity style={s.settingItem} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.barInactive }]}>
                <Ionicons name="star-outline" size={20} color={colors.accentDark} />
              </View>
              <Text style={s.settingText}>Valorar la App</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={s.settingItem} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.background }]}>
                <Ionicons name="help-circle-outline" size={20} color={colors.accentDark} />
              </View>
              <Text style={s.settingText}>Ayuda y Soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* BOTÓN DE LOGOUT */}
        <TouchableOpacity 
          style={s.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={s.logoutText}>Cerrar sesión</Text>
          <Ionicons name="log-out-outline" size={20} color={colors.text} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const staticStyles = StyleSheet.create({
  profileInfo: { flex: 1 },
  section: { marginBottom: 24 },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: c.background },
  container: { flex: 1, paddingHorizontal: 24 },
  header: { marginTop: 40, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: c.textSecondary, marginTop: 4 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, padding: 24, borderRadius: 24, marginBottom: 32, borderWidth: 1, borderColor: c.surfaceBorder },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: c.buttonPrimary, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontSize: 20, fontWeight: '700', color: c.buttonPrimaryText },
  profileName: { fontSize: 18, fontWeight: '700', color: c.text },
  profileEmail: { fontSize: 14, color: c.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: c.accentDark, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.surface, padding: 16, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: c.surfaceBorder },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  settingText: { fontSize: 16, color: c.text, fontWeight: '500' },
  themeBadge: { backgroundColor: c.accentLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  themeBadgeText: { fontSize: 13, fontWeight: '700', color: c.accentDark },
  logoutButton: { marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 20, borderRadius: 22, backgroundColor: c.barInactive, borderWidth: 1, borderColor: c.surfaceBorder },
  logoutText: { fontSize: 16, fontWeight: '700', color: c.text },
});