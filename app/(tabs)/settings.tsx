import { useTheme, AppColors } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, resetUser } = useUser();
  const { colors, mode, setMode } = useTheme();
  
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
                <Text style={{fontSize: 20}}>{getThemeEmoji()}</Text>
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
                <Text style={{fontSize: 20}}>🔔</Text>
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

          <TouchableOpacity style={s.settingItem} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.surfaceBorder }]}>
                 <Text style={{fontSize: 20}}>📏</Text>
              </View>
              <Text style={s.settingText}>Mis Datos Físicos</Text>
            </View>
             <Text style={{fontSize: 16, color: colors.textSecondary}}>›</Text>
          </TouchableOpacity>
        </View>

        {/* SECCIÓN: GENERAL */}
        <View style={staticStyles.section}>
          <Text style={s.sectionTitle}>General</Text>

          <TouchableOpacity style={s.settingItem} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.surfaceBorder }]}>
                <Text style={{fontSize: 20}}>⭐</Text>
              </View>
              <Text style={s.settingText}>Valorar la App</Text>
            </View>
            <Text style={{fontSize: 16, color: colors.textSecondary}}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.settingItem} activeOpacity={0.7}>
            <View style={staticStyles.settingLabelGroup}>
              <View style={[s.iconBox, { backgroundColor: colors.surfaceBorder }]}>
                <Text style={{fontSize: 20}}>🎧</Text>
              </View>
              <Text style={s.settingText}>Ayuda y Soporte</Text>
            </View>
            <Text style={{fontSize: 16, color: colors.textSecondary}}>›</Text>
          </TouchableOpacity>
        </View>

        {/* BOTÓN DE LOGOUT */}
        <TouchableOpacity style={s.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={{fontSize: 20, marginRight: 8}}>🚪</Text>
          <Text style={s.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const staticStyles = StyleSheet.create({
  profileInfo: { flex: 1 },
  section: { marginBottom: 32 },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
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
});