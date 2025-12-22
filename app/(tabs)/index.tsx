import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';

export default function Dashboard() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp),
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.5)), // Cosmic bounce effect
            }),
        ]).start();
    }, []);

    const handlePress = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    return (
        <LinearGradient
            colors={[colors.background.main, '#0F172A']} // Deep Cosmos Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Header Section */}
                    <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        <View>
                            <Text style={styles.greeting}>Tekrar Hoş Geldiniz,</Text>
                            <Text style={styles.username}>Demo Kullanıcı</Text>
                        </View>
                        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/more')}>
                            <Ionicons name="settings-outline" size={24} color={colors.text.primary} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Portfolio Summary Card - Cosmic Glass */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 20) }] }}>
                        <LinearGradient
                            colors={[colors.primary[800], colors.primary[900]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.portfolioCardGradient}
                        >
                            <View style={styles.portfolioHeader}>
                                <Text style={styles.portfolioLabel}>TOPLAM PORTFÖY</Text>
                                <View style={styles.trendContainer}>
                                    <Ionicons name="trending-up" size={16} color={colors.text.primary} />
                                    <Text style={styles.trendText}>+12.5%</Text>
                                </View>
                            </View>
                            <Text style={styles.portfolioValue}>$345,000</Text>

                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Aylık Kira</Text>
                                    <Text style={styles.statValue}>$2,850</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Net ROI</Text>
                                    <Text style={styles.statValue}>8.4%</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Mülkler</Text>
                                    <Text style={styles.statValue}>3</Text>
                                </View>
                            </View>

                            {/* Decorative Glow Orb */}
                            <View style={styles.glowOrb} />
                        </LinearGradient>
                    </Animated.View>

                    {/* Quick Actions */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 40) }] }}>
                        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsScroll}>
                            {[
                                { icon: 'add-circle', label: 'Yatırım Yap', color: colors.accent.cyan },
                                { icon: 'calculator', label: 'Hesapla', color: colors.accent.purple },
                                { icon: 'document-text', label: 'Raporlar', color: colors.primary[400] },
                                { icon: 'chatbubble-ellipses', label: 'Destek', color: colors.accent.gradientStart },
                            ].map((action, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.actionCard}
                                    onPress={handlePress}
                                >
                                    <View style={[styles.actionIcon, { borderColor: `${action.color}40`, backgroundColor: `${action.color}10` }]}>
                                        <Ionicons name={action.icon as any} size={24} color={action.color} />
                                    </View>
                                    <Text style={styles.actionLabel}>{action.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {/* Status Overview */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 60) }] }}>
                        <Text style={styles.sectionTitle}>Kira Durumu</Text>
                        <View style={styles.statusGrid}>
                            <Card style={styles.statusCard}>
                                <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
                                <Text style={styles.statusValue}>2</Text>
                                <Text style={styles.statusLabel}>Ödendi</Text>
                            </Card>
                            <Card style={styles.statusCard}>
                                <View style={[styles.statusDot, { backgroundColor: colors.warning }]} />
                                <Text style={styles.statusValue}>1</Text>
                                <Text style={styles.statusLabel}>Bekleniyor</Text>
                            </Card>
                            <Card style={styles.statusCard}>
                                <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
                                <Text style={styles.statusValue}>0</Text>
                                <Text style={styles.statusLabel}>Gecikmiş</Text>
                            </Card>
                        </View>
                    </Animated.View>

                    {/* Recent Activity */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 80) }] }}>
                        <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
                        <Card style={styles.activityCard}>
                            {[
                                { title: 'Kira Ödemesi Alındı', date: 'Bugün, 09:41', amount: '+$1,250', type: 'income' },
                                { title: 'Bakım Onarımı', date: 'Dün, 14:30', amount: '-$150', type: 'expense' },
                                { title: 'Yeni Doküman', date: '21 Arl, 10:00', amount: '', type: 'info' },
                            ].map((item, index) => (
                                <View key={index} style={[
                                    styles.activityItem,
                                    index !== 2 && styles.activityBorder
                                ]}>
                                    <View style={[styles.activityIcon, {
                                        backgroundColor: item.type === 'income' ? `${colors.success}15` :
                                            item.type === 'expense' ? `${colors.error}15` :
                                                `${colors.primary[500]}15`
                                    }]}>
                                        <Ionicons
                                            name={item.type === 'income' ? 'arrow-down' : item.type === 'expense' ? 'arrow-up' : 'document'}
                                            size={18}
                                            color={item.type === 'income' ? colors.success : item.type === 'expense' ? colors.error : colors.primary[500]}
                                        />
                                    </View>
                                    <View style={styles.activityInfo}>
                                        <Text style={styles.activityTitle}>{item.title}</Text>
                                        <Text style={styles.activityDate}>{item.date}</Text>
                                    </View>
                                    <Text style={[
                                        styles.activityAmount,
                                        { color: item.type === 'income' ? colors.success : item.type === 'expense' ? colors.text.primary : colors.text.secondary }
                                    ]}>{item.amount}</Text>
                                </View>
                            ))}
                        </Card>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingBottom: 100, // Space for tab bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    greeting: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: 4,
    },
    username: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -0.5,
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border.subtle,
        ...shadows.glow,
    },
    portfolioCardGradient: {
        borderRadius: borderRadius.xxl,
        padding: spacing.xl,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        ...shadows.float,
        overflow: 'hidden',
        position: 'relative',
    },
    glowOrb: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.accent.cyan,
        opacity: 0.15,
        transform: [{ scale: 1.5 }],
    },
    portfolioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    portfolioLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        letterSpacing: 1,
        fontWeight: fontWeight.bold as any,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(52, 211, 153, 0.2)', // Green tint
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    trendText: {
        fontSize: fontSize.xs,
        color: colors.text.primary,
        fontWeight: fontWeight.bold as any,
    },
    portfolioValue: {
        fontSize: 42,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.xl,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: colors.text.tertiary,
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    statValue: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.md,
        marginTop: spacing.md,
    },
    actionsScroll: {
        marginHorizontal: -spacing.xl, // Negative margin to scroll edge-to-edge
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.md,
    },
    actionCard: {
        alignItems: 'center',
        marginRight: spacing.lg,
        gap: spacing.sm,
    },
    actionIcon: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        ...shadows.glow,
    },
    actionLabel: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        fontWeight: fontWeight.medium as any,
    },
    statusGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    statusCard: {
        flex: 1,
        padding: spacing.md,
        alignItems: 'center',
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: spacing.sm,
    },
    statusValue: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    statusLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    activityCard: {
        padding: 0,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    activityBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border.subtle,
    },
    activityIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    activityDate: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    activityAmount: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
    },
});
