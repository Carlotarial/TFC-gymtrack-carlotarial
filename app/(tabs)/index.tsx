import { AppColors, useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { getDailyTip } from '@/data/tips';
import { getRecommendedWorkouts } from '@/data/workouts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInRight,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();
  const { user, updateWater, logout } = useUser();
  const { colors } = useTheme();

  // 🌟 Estados para animaciones y ayuda visual
  const waterScale = useSharedValue(1);
  const [showWaterTooltip, setShowWaterTooltip] = useState(false);

  const userName = user.name || 'Usuario';
  const sessionsCompleted = user.sessionsCompleted;
  const totalSessions = 4;
  const progressPercent = Math.min((sessionsCompleted / totalSessions) * 100, 100);

  const recommendations = getRecommendedWorkouts(user.goal, user.activityLevel);
  const goalLabel = useMemo(() => {
    if (user.goal === 'perder_peso') return 'para quemar';
    if (user.goal === 'ganar_musculo') return 'de potencia';
    if (user.goal === 'tonificar') return 'de definición';
    return 'para brillar';
  }, [user.goal]);

  const tip = getDailyTip();

  // 🌟 AÑADIR AGUA (Clic) + Mostrar ayuda la primera vez
  const handleAddWater = () => {
    waterScale.value = withSequence(
      withTiming(0.95, { duration: 100, easing: Easing.out(Easing.quad) }),
      withSpring(1, { damping: 20, stiffness: 150 })
    );

    // Si es su primera interacción con el agua, le enseñamos el truco
    if (user.waterIntake === 0) {
      setShowWaterTooltip(true);
      setTimeout(() => setShowWaterTooltip(false), 3000);
    }

    updateWater(Math.round((user.waterIntake + 0.25) * 100) / 100);
  };

  // 🌟 RESTAR AGUA (Long Press)
  const handleRemoveWater = () => {
    if (user.waterIntake <= 0) return;
    
    setShowWaterTooltip(false); // Si restan, ya saben cómo funciona, ocultamos ayuda
    waterScale.value = withSequence(
      withTiming(1.08, { duration: 100, easing: Easing.out(Easing.quad) }),
      withSpring(1, { damping: 20, stiffness: 150 })
    );
    updateWater(Math.round(Math.max(0, user.waterIntake - 0.25) * 100) / 100);
  };

  const animatedWaterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: waterScale.value }]
  }));

  const s = dynamicStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera Editorial */}
      <Animated.View entering={FadeInDown.duration(600).easing(Easing.out(Easing.exp))} style={s.header}>
        <View style={{ flex: 1, paddingRight: 16 }}>
          <View style={s.overlineContainer}>
            <View style={s.overlineDot} />
            <Text style={s.overlineText}>GYMTRACK HOME</Text>
          </View>
          
          <Text style={s.title}>
            <Text style={s.titleLight}>Hola, </Text>
            <Text style={s.titleBold}>{userName}</Text>
            <Text style={s.titleDot}>.</Text>
          </Text>
          
          <Text style={s.subtitle}>Preparados para brillar hoy.</Text>
        </View>

        <View style={s.headerButtons}>
          <Pressable style={[s.notificationBtn, { marginRight: 12 }]} onPress={async () => {
            await logout();
            router.replace('/onboarding' as any);
          }}>
            <Ionicons name="people-outline" size={24} color={colors.accentDark} />
          </Pressable>
          <Pressable style={s.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={colors.accentDark} />
          </Pressable>
        </View>
      </Animated.View>

      {/* Métricas Rápidas */}
      <Animated.View entering={FadeInDown.delay(100).duration(600).easing(Easing.out(Easing.exp))} style={s.metricsRow}>
        <View style={staticStyles.metricItem}>
          <Ionicons name="flame-outline" size={28} color="#FF4B4B" style={{ marginBottom: 6 }} />
          <Text style={s.metricValue}>{user.streak}</Text>
          <Text style={s.metricLabel}>Racha</Text>
        </View>
        <View style={s.metricDivider} />
        <View style={staticStyles.metricItem}>
          <Ionicons name="flash-outline" size={28} color="#FFB800" style={{ marginBottom: 6 }} />
          <Text style={s.metricValue}>{user.kcalBurned}</Text>
          <Text style={s.metricLabel}>Energía</Text>
        </View>
        <View style={s.metricDivider} />
        
        {/* BOTÓN DE AGUA INTERACTIVO CON TOOLTIP */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          {showWaterTooltip && (
            <Animated.View 
              entering={FadeInDown} 
              exiting={FadeOut}
              style={s.waterTooltip}
            >
              <Text style={s.waterTooltipText}>Mantén para restar</Text>
              <View style={s.tooltipArrow} />
            </Animated.View>
          )}

          <Pressable 
            style={staticStyles.metricItem} 
            onPress={handleAddWater}
            onLongPress={handleRemoveWater}
            delayLongPress={450}
          >
            <Animated.View style={[staticStyles.metricItem, animatedWaterStyle]}>
              <View style={{ position: 'relative' }}>
                <Ionicons name="water-outline" size={28} color="#4A90E2" style={{ marginBottom: 6 }} />
                <View style={s.waterPlusBadge}>
                  <Ionicons name="add" size={10} color="#FFFFFF" />
                </View>
              </View>
              <Text style={s.metricValue}>{user.waterIntake.toFixed(2)}L</Text>
              <Text style={s.metricLabel}>Beber</Text>
            </Animated.View>
          </Pressable>
        </View>
      </Animated.View>

      {/* Progreso Semanal */}
      <Animated.View entering={FadeInDown.delay(200).duration(600).easing(Easing.out(Easing.exp))} style={staticStyles.section}>
        <Text style={s.sectionTitle}>Progreso semanal</Text>
        <View style={s.card}>
          <View style={staticStyles.progressInfo}>
            <View>
              <Text style={s.progressValue}>{sessionsCompleted} <Text style={{color: colors.textMuted}}>/ {totalSessions}</Text></Text>
              <Text style={s.progressLabel}>Entrenamientos listos</Text>
            </View>
            <View style={s.percentageBadge}>
              <Text style={s.percentageText}>{Math.round(progressPercent)}%</Text>
            </View>
          </View>
          <View style={s.barBackground}>
            <Animated.View
              entering={FadeInRight.delay(500).duration(800).springify()}
              style={[s.barFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </View>
      </Animated.View>

      {/* Recomendaciones inteligentes */}
      <Animated.View entering={FadeInDown.delay(300).duration(600).easing(Easing.out(Easing.exp))} style={staticStyles.section}>
        <View style={staticStyles.sectionHeaderRow}>
          <Text style={s.sectionTitle}>Siguiente sesión</Text>
          <View style={s.goalBadge}>
            <Text style={s.goalBadgeText}>{goalLabel}</Text>
          </View>
        </View>
        <View style={staticStyles.grid}>
          {recommendations.map((rec) => (
            <Pressable
              key={rec.id}
              style={s.gridCard}
              onPress={() => router.push({ pathname: '/routine', params: { id: rec.id, title: rec.title } } as any)}
            >
              <View style={s.recommendedBadge}>
                <Text style={s.recommendedBadgeText}>🎯 Para ti</Text>
              </View>
              <View style={[s.cardIconBox]}>
                <Ionicons name={rec.icon as any} size={28} color={colors.accentDark} />
              </View>
              <Text style={s.cardTitle}>{rec.title}</Text>
              <Text style={s.cardTag}>{rec.intensity}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* Tip del día */}
      <Animated.View entering={FadeInDown.delay(400).duration(600).easing(Easing.out(Easing.exp))} style={s.tipCard}>
        <View style={s.tipIconBox}>
           <Ionicons name="bulb-outline" size={24} color={colors.gold} />
        </View>
        <View style={staticStyles.tipContent}>
          <Text style={s.tipTitle}>{tip.title}</Text>
          <Text style={s.tipText}>{tip.text}</Text>
        </View>
      </Animated.View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const staticStyles = StyleSheet.create({
  metricItem: { alignItems: 'center', flex: 1 },
  section: { marginBottom: 35 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  tipContent: { marginLeft: 16, flex: 1 },
});

const dynamicStyles = (c: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 24 },
  
  header: { marginTop: 50, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerButtons: { flexDirection: 'row', marginTop: 12 }, 
  overlineContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  overlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: c.accent, marginRight: 8 },
  overlineText: { fontSize: 11, fontWeight: '800', color: c.accentDark, letterSpacing: 2 },
  title: { fontSize: 38, letterSpacing: -1 },
  titleLight: { fontWeight: '300', color: c.textSecondary }, 
  titleBold: { fontWeight: '900', color: c.text }, 
  titleDot: { fontWeight: '900', color: c.accent }, 
  subtitle: { fontSize: 15, color: c.textSecondary, marginTop: 8, fontWeight: '500', lineHeight: 22 },
  
  notificationBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: c.surface, justifyContent: 'center', alignItems: 'center', shadowColor: c.accentDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 4 },
  
  metricsRow: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: 32, paddingVertical: 24, paddingHorizontal: 10, marginBottom: 40, alignItems: 'center', justifyContent: 'space-around', shadowColor: c.accentDark, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.06, shadowRadius: 32, elevation: 5 },
  metricValue: { fontSize: 20, fontWeight: '800', color: c.text },
  metricLabel: { fontSize: 13, color: c.textSecondary, fontWeight: '600', marginTop: 2 },
  metricDivider: { width: 1, height: 40, backgroundColor: c.divider },

  waterPlusBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#4A90E2', width: 12, height: 12, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: c.surface },

  // 🌟 ESTILOS DEL TOOLTIP INTELIGENTE
  waterTooltip: { position: 'absolute', top: -45, backgroundColor: c.accentDark, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, zIndex: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
  waterTooltipText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5 },
  tooltipArrow: { position: 'absolute', bottom: -4, left: '50%', marginLeft: -4, width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 5, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: c.accentDark },
  
  sectionTitle: { fontSize: 20, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  
  goalBadge: { backgroundColor: c.accentLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  goalBadgeText: { fontSize: 12, fontWeight: '800', color: c.accent, textTransform: 'uppercase' },

  card: { backgroundColor: c.surface, borderRadius: 32, padding: 28, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4 },
  progressValue: { fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 },
  progressLabel: { fontSize: 14, color: c.textSecondary, fontWeight: '600', marginTop: 4 },
  percentageBadge: { backgroundColor: c.accentLight, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  percentageText: { fontSize: 14, fontWeight: '800', color: c.accentDark },
  barBackground: { height: 12, backgroundColor: c.barInactive, borderRadius: 6, overflow: 'hidden' as const },
  barFill: { height: 12, backgroundColor: c.barActive, borderRadius: 6 },
  
  gridCard: { width: '47%' as any, backgroundColor: c.surface, borderRadius: 32, padding: 24, paddingTop: 32, shadowColor: c.accentDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 30, elevation: 4, position: 'relative' },
  recommendedBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: c.goldLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  recommendedBadgeText: { fontSize: 10, fontWeight: '800', color: c.gold },

  cardIconBox: { width: 54, height: 54, borderRadius: 20, backgroundColor: c.accentLight, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: c.text, letterSpacing: -0.5 },
  cardTag: { fontSize: 13, color: c.textSecondary, marginTop: 6, fontWeight: '600' },
  
  tipCard: { flexDirection: 'row' as const, backgroundColor: c.goldLight, padding: 24, borderRadius: 32, alignItems: 'center' as const, shadowColor: c.gold, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 3 },
  tipIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', opacity: 0.9 },
  tipTitle: { fontSize: 15, fontWeight: '800', color: c.gold, marginBottom: 4 },
  tipText: { fontSize: 14, color: c.textSecondary, lineHeight: 22, fontWeight: '500' },
});