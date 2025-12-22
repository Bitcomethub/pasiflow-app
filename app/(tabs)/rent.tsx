import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/Card';

// Temporary local status mapping
const statusColors = {
    paid: colors.success,
    late: colors.error,
    pending: colors.warning,
};

const RENT_PAYMENTS = [
    { id: '1', property: 'Miami Apt #4B', amount: '$3,200', date: '01 Oca 2026', status: 'pending', tenant: 'John Doe' },
    { id: '2', property: 'Austin Loft', amount: '$2,100', date: '28 Ara 2025', status: 'paid', tenant: 'Sarah Smith' },
    { id: '3', property: 'Detroit House', amount: '$1,450', date: '05 Ara 2025', status: 'late', tenant: 'Mike Johnson' },
];

export default function RentScreen() {
    const renderPaymentItem = ({ item }: { item: any }) => (
        <View style={styles.paymentItem}>
            <View style={styles.paymentIconContainer}>
                <Ionicons
                    name={item.status === 'paid' ? "checkmark-circle" : "time"}
                    size={24}
                    color={statusColors[item.status as keyof typeof statusColors]}
                />
            </View>
            <View style={styles.paymentDetails}>
                <Text style={styles.paymentProperty}>{item.property}</Text>
                <Text style={styles.paymentTenant}>{item.tenant}</Text>
            </View>
            <View style={styles.paymentRight}>
                <Text style={styles.paymentAmount}>{item.amount}</Text>
                <Text style={[styles.paymentStatus, { color: statusColors[item.status as keyof typeof statusColors] }]}>
                    {item.status === 'paid' ? 'Ödendi' : item.status === 'late' ? 'Gecikmiş' : 'Bekleniyor'}
                </Text>
            </View>
        </View>
    );

    return (
        <LinearGradient
            colors={[colors.background.main, '#0F172A']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Kira Takibi</Text>
                    <TouchableOpacity style={styles.historyButton}>
                        <Ionicons name="calendar-outline" size={20} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                {/* Summary Card with Progress Circle Concept */}
                <Card style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryTitle}>Ocak 2026</Text>
                        <Text style={styles.collectionRate}>Toplanan: %66</Text>
                    </View>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '66%' }]} />
                    </View>

                    <View style={styles.summaryStats}>
                        <View>
                            <Text style={styles.statLabel}>Beklenen</Text>
                            <Text style={styles.statValue}>$6,750</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.statLabel}>Toplanan</Text>
                            <Text style={[styles.statValue, { color: colors.success }]}>$4,455</Text>
                        </View>
                    </View>
                </Card>

                {/* Status Notice */}
                <View style={[styles.noticeContainer, { backgroundColor: `${colors.accent.purple}15` }]}>
                    <Ionicons name="information-circle" size={20} color={colors.accent.purple} />
                    <Text style={[styles.noticeText, { color: colors.accent.purple }]}>
                        Ödemeler her ayın 1'i ile 5'i arasında toplanır ve hesabınıza aktarılır.
                    </Text>
                </View>

                {/* Payments List */}
                <Text style={styles.sectionTitle}>Hareketler</Text>
                <Card style={styles.listCard}>
                    <FlatList
                        data={RENT_PAYMENTS}
                        renderItem={renderPaymentItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </Card>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    title: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -1,
    },
    historyButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.subtle,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    summaryCard: {
        marginHorizontal: spacing.xl,
        padding: spacing.xl,
        marginBottom: spacing.lg,
        backgroundColor: colors.primary[900],
        borderWidth: 1,
        borderColor: colors.border.subtle,
        ...shadows.glow,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    summaryTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    collectionRate: {
        fontSize: fontSize.sm,
        color: colors.success,
        fontWeight: fontWeight.bold as any,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: colors.background.subtle,
        borderRadius: 4,
        marginBottom: spacing.lg,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.success,
        borderRadius: 4,
    },
    summaryStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: 4,
    },
    statValue: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    noticeContainer: {
        marginHorizontal: spacing.xl,
        marginBottom: spacing.xl,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    noticeText: {
        flex: 1,
        fontSize: fontSize.xs,
        lineHeight: 18,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginLeft: spacing.xl,
        marginBottom: spacing.md,
    },
    listCard: {
        marginHorizontal: spacing.xl,
        padding: 0,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    paymentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    paymentIconContainer: {
        width: 40,
        alignItems: 'center',
    },
    paymentDetails: {
        flex: 1,
        marginLeft: spacing.sm,
    },
    paymentProperty: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    paymentTenant: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
    },
    paymentRight: {
        alignItems: 'flex-end',
    },
    paymentAmount: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    paymentStatus: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium as any,
    },
    separator: {
        height: 1,
        backgroundColor: colors.border.subtle,
        marginLeft: spacing.xl + 40, // Indent past icon
    },
});
