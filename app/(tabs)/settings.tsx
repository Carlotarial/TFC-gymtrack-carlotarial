import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes ⚙️</Text>
        <Text style={styles.subtitle}>Personaliza tu experiencia</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>C</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Carlota Rial</Text>
          <Text style={styles.profileEmail}>carlota@ejemplo.com</Text>
        </View>
        <Ionicons name="pencil" size={20} color="#9CAF88" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingIconText}>
            <Ionicons name="notifications" size={24} color="#CDA434" style={styles.settingIcon} />
            <Text style={styles.settingText}>Notificaciones</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E6EBE0', true: '#9CAF88' }}
            thumbColor="#FDFBF6"
          />
        </View>

        <Pressable style={styles.settingRow}>
          <View style={styles.settingIconText}>
            <Ionicons name="person" size={24} color="#9CAF88" style={styles.settingIcon} />
            <Text style={styles.settingText}>Mis Datos Fisicos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8C9A8C" />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <Pressable style={styles.settingRow}>
          <View style={styles.settingIconText}>
            <Ionicons name="star" size={24} color="#E6CCB2" style={styles.settingIcon} />
            <Text style={styles.settingText}>Valorar la App</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8C9A8C" />
        </Pressable>

        <Pressable style={styles.settingRow}>
          <View style={styles.settingIconText}>
            <Ionicons name="help-circle" size={24} color="#9CAF88" style={styles.settingIcon} />
            <Text style={styles.settingText}>Ayuda y Soporte</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8C9A8C" />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 70,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C9A8C',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
    padding: 20,
    borderRadius: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E6EBE0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CDA434',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FDFBF6',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8C9A8C',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5D4A',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF3E0',
    padding: 18,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6EBE0',
  },
  settingIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: '#4A5D4A',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#E6EBE0',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#9CAF88',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5D4A',
  },
});