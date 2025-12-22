import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';
import { Card } from '@/components/ui';

export default function DashboardScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hoş Geldiniz 👋</Text>
                        <Text style={styles.userName}>John Doe</Text>
                    </View>
                    <View style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color={colors.text.primary} />
                        <View style={styles.notificationBadge} />
                    </View>
                </View>

                {/* Portfolio Summary */}
                <Card variant="accent" style={styles.portfolioCard}>
                    <View style={styles.portfolioHeader}>
                        <Text style={styles.portfolioLabel}>Toplam Portföy Değeri</Text>
                        <Ionicons name="trending-up" size={20} color={colors.success[500]} />
                    </View>
                    <Text style={styles.portfolioValue}>$425,000</Text>
                    <View style={styles.portfolioStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>3</Text>
                            <Text style={styles.statLabel}>Mülk</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>$3,750</Text>
                            <Text style={styles.statLabel}>Aylık Gelir</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>%10.6</Text>
                            <Text style={styles.statLabel}>Yıllık ROI</Text>
                        </View>
                    </View>
                </Card>

                {/* Rent Status Overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bu Ayki Kira Durumu</Text>
                    <View style={styles.rentStatusGrid}>
                        <Card style={styles.rentCard}>
                            <View style={[styles.statusDot, { backgroundColor: colors.success[500] }]} />
                            <Text style={styles.rentStatusValue}>2</Text>
                            <Text style={styles.rentStatusLabel}>Ödendi</Text>
                        </Card>
                        <Card style={styles.rentCard}>
                            <View style={[styles.statusDot, { backgroundColor: colors.warning[500] }]} />
                            <Text style={styles.rentStatusValue}>1</Text>
                            <Text style={styles.rentStatusLabel}>Bekleniyor</Text>
                        </Card>
                        <Card style={styles.rentCard}>
                            <View style={[styles.statusDot, { backgroundColor: colors.error[500] }]} />
                            <Text style={styles.rentStatusValue}>0</Text>
                            <Text style={styles.rentStatusLabel}>Gecikmiş</Text>
                        </Card>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
                    <View style={styles.actionsGrid}>
                        {[
                            { icon: 'home-outline', label: 'Evlerim', color: colors.accent[500] },
                            { icon: 'document-text-outline', label: 'Dokümanlar', color: colors.success[500] },
                            { icon: 'calculator-outline', label: 'Simülasyon', color: colors.primary[400] },
                            { icon: 'settings-outline', label: 'Ayarlar', color: colors.text.muted },
                        ].map((action, index) => (
                            <Card key={index} style={styles.actionCard}>
                                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                                    <Ionicons name={action.icon as any} size={24} color={action.color} />
                                </View>
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </Card>
                        ))}
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
                    <Card>
                        {[
                            { icon: 'checkmark-circle', text: 'Detroit mülkünden kira alındı', time: '2 saat önce', color: colors.success[500] },
                            { icon: 'document', text: 'Yeni lease dökümanı yüklendi', time: '1 gün önce', color: colors.accent[500] },
                            { icon: 'home', text: 'Cleveland mülkü Section 8 onaylandı', time: '3 gün önce', color: colors.success[500] },
                        ].map((activity, index) => (
                            <View key={index} style={[styles.activityItem, index !== 2 && styles.activityBorder]}>
                                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                                    <Ionicons name={activity.icon as any} size={18} color={activity.color} />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityText}>{activity.text}</Text>
                                    <Text style={styles.activityTime}>{activity.time}</Text>
                                </View>
                            </View>
                        ))}
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary[900],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    greeting: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
    },
    userName: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginTop: spacing.xs,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary[800],
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.accent[500],
    },
    portfolioCard: {
        marginHorizontal: spacing.xl,
        marginBottom: spacing.xxl,
    },
    portfolioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    portfolioLabel: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    portfolioValue: {
        fontSize: fontSize.xxxl,
        fontWeight: fontWeight.bold,
        color: colors.accent[500],
        marginBottom: spacing.lg,
    },
    portfolioStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
        paddingTop: spacing.lg,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    statLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: colors.border.default,
    },
    section: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xxl,
    },
    sectionTitle: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    rentStatusGrid: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    rentCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginBottom: spacing.sm,
    },
    rentStatusValue: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    rentStatusLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    actionCard: {
        width: '47%',
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    actionLabel: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    activityBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border.default,
    },
    activityIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    activityContent: {
        flex: 1,
    },
    activityText: {
        fontSize: fontSize.sm,
        color: colors.text.primary,
    },
    activityTime: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
});
