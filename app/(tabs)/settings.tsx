import { Ionicons } from '@expo/vector-icons';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
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
  const localParams = useLocalSearchParams();
  const globalParams = useGlobalSearchParams();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 1. Captura de datos dinámicos
  const userName = (localParams.userName || globalParams.userName || 'Usuario GymTrack') as string;
  
  const { userInitial, userEmail } = useMemo(() => {
    const initial = userName.charAt(0).toUpperCase();
    const email = `${userName.toLowerCase().replace(/\s+/g, '')}@gymtrack.com`;
    return { userInitial: initial, userEmail: email };
  }, [userName]);

  // 2. Función de Logout (Directa para evitar fallos de Alert)
  const handleLogout = () => {
    router.replace('/onboarding'); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFBF6' }}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Espacio extra para el botón final
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ajustes</Text>
          <Text style={styles.subtitle}>Gestiona tu cuenta y preferencias</Text>
        </View>

        {/* Tarjeta de Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitial}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>
        </View>

        {/* SECCIÓN: PREFERENCIAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.iconBox, { backgroundColor: '#F0F2ED' }]}>
                <Ionicons name="notifications-outline" size={20} color="#4A5D4A" />
              </View>
              <Text style={styles.settingText}>Notificaciones</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E6EBE0', true: '#9CAF88' }}
              thumbColor="#FDFBF6"
            />
          </View>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.iconBox, { backgroundColor: '#FDFBF6' }]}>
                <Ionicons name="person-outline" size={20} color="#4A5D4A" />
              </View>
              <Text style={styles.settingText}>Mis Datos Físicos</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C1C7C1" />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN: GENERAL (Restaurada) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.iconBox, { backgroundColor: '#F0F2ED' }]}>
                <Ionicons name="star-outline" size={20} color="#4A5D4A" />
              </View>
              <Text style={styles.settingText}>Valorar la App</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C1C7C1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.iconBox, { backgroundColor: '#FDFBF6' }]}>
                <Ionicons name="help-circle-outline" size={20} color="#4A5D4A" />
              </View>
              <Text style={styles.settingText}>Ayuda y Soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C1C7C1" />
          </TouchableOpacity>
        </View>

        {/* BOTÓN DE LOGOUT */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
          <Ionicons name="log-out-outline" size={20} color="#1A1C1A" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: { marginTop: 40, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: '#1A1C1A', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#8C9A8C', marginTop: 4 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F0F2ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#1A1C1A', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontSize: 20, fontWeight: '700', color: '#FDFBF6' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#1A1C1A' },
  profileEmail: { fontSize: 14, color: '#8C9A8C', marginTop: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#4A5D4A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  settingText: { fontSize: 16, color: '#1A1C1A', fontWeight: '500' },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 22,
    backgroundColor: '#F0F2ED',
    borderWidth: 1,
    borderColor: '#E6EBE0',
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#1A1C1A' },
});