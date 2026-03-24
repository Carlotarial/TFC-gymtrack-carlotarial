import { Ionicons } from '@expo/vector-icons';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const localParams = useLocalSearchParams();
  const globalParams = useGlobalSearchParams();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 1. Capturamos el nombre dinámico
  const userName = (localParams.userName || globalParams.userName || 'Usuario GymTrack') as string;
  
  // 2. Generamos iniciales y email automáticos
  const { userInitial, userEmail } = useMemo(() => {
    const initial = userName.charAt(0).toUpperCase();
    const email = `${userName.toLowerCase().replace(/\s+/g, '')}@gymtrack.com`;
    return { userInitial: initial, userEmail: email };
  }, [userName]);

  // 3. Función de Logout con "Remplazo" de ruta para limpiar el historial
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Quieres volver al inicio del cuestionario?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Salir", 
          style: "destructive", 
          onPress: () => {
            // Intentamos ir a la raíz del onboarding
            router.replace('/onboarding'); 
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
        <Text style={styles.subtitle}>Personaliza tu perfil y cuenta</Text>
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
        <Pressable style={styles.editButton}>
          <Ionicons name="pencil-outline" size={18} color="#4A5D4A" />
        </Pressable>
      </View>

      {/* Bloque de Preferencias */}
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

        <Pressable style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <View style={[styles.iconBox, { backgroundColor: '#FDFBF6' }]}>
              <Ionicons name="person-outline" size={20} color="#4A5D4A" />
            </View>
            <Text style={styles.settingText}>Datos físicos</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#C1C7C1" />
        </Pressable>
      </View>

      {/* Bloque General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <View style={[styles.iconBox, { backgroundColor: '#F0F2ED' }]}>
              <Ionicons name="star-outline" size={20} color="#4A5D4A" />
            </View>
            <Text style={styles.settingText}>Valorar aplicación</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#C1C7C1" />
        </Pressable>
      </View>

      {/* Botón de Cerrar Sesión (Con zIndex alto para asegurar el click) */}
      <Pressable 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
        <Ionicons name="log-out-outline" size={18} color="#8C9A8C" style={{ marginLeft: 8 }} />
      </Pressable>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF6', paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 32 },
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
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1C1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: { fontSize: 20, fontWeight: '700', color: '#FDFBF6' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#1A1C1A' },
  profileEmail: { fontSize: 14, color: '#8C9A8C', marginTop: 2 },
  editButton: { width: 36, height: 36, backgroundColor: '#F0F2ED', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#4A5D4A', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F2ED',
  },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  settingText: { fontSize: 16, color: '#1A1C1A', fontWeight: '500' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E6EBE0',
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: 'transparent',
    zIndex: 99, // Asegura que el botón esté por encima de todo
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#1A1C1A' },
});