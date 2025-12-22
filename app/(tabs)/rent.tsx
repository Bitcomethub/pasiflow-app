import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, rentStatus } from '@/lib/theme';
import { Card } from '@/components/ui';

type RentStatusType = 'expected' | 'received' | 'late';

interface RentPayment {
    id: string;
    propertyAddress: string;
    propertyCity: string;
    amount: number;
    dueDate: string;
    paidDate?: string;
    status: RentStatusType;
}

const rentPayments: RentPayment[] = [
    {
        id: '1',
        propertyAddress: '1234 Maple Street',
        propertyCity: 'Detroit, MI',
        amount: 1250,
        dueDate: '2024-12-01',
        paidDate: '2024-12-03',
        status: 'received',
    },
    {
        id: '2',
        propertyAddress: '567 Oak Avenue',
        propertyCity: 'Cleveland, OH',
        amount: 1400,
        dueDate: '2024-12-01',
        paidDate: '2024-12-02',
        status: 'received',
    },
    {
        id: '3',
        propertyAddress: '890 Pine Boulevard',
        propertyCity: 'Memphis, TN',
        amount: 1350,
        dueDate: '2024-12-01',
        status: 'expected',
    },
];

const statusLabels: Record<RentStatusType, string> = {
    expected: 'Bekleniyor',
    received: 'Ödendi',
    late: 'Gecikmiş',
};

const statusIcons: Record<RentStatusType, string> = {
    expected: 'time-outline',
    received: 'checkmark-circle',
    late: 'alert-circle',
};

export default function RentScreen() {
    const totalExpected = rentPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalReceived = rentPayments
        .filter((p) => p.status === 'received')
        .reduce((sum, p) => sum + p.amount, 0);

    const handlePress = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Kira Takibi</Text>
                    <Text style={styles.subtitle}>Aralık 2024</Text>
                </View>

                {/* Monthly Summary */}
                <Card variant="accent" style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Beklenen Toplam</Text>
                            <Text style={styles.summaryValue}>${totalExpected.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Alınan</Text>
                            <Text style={[styles.summaryValue, { color: colors.success[500] }]}>
                                ${totalReceived.toLocaleString()}
                            </Text>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${(totalReceived / totalExpected) * 100}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {Math.round((totalReceived / totalExpected) * 100)}% tahsil edildi
                        </Text>
                    </View>
                </Card>

                {/* Payment Window Notice */}
                <View style={styles.noticeContainer}>
                    <View style={styles.noticeIcon}>
                        <Ionicons name="calendar-outline" size={18} color={colors.accent[500]} />
                    </View>
                    <Text style={styles.noticeText}>
                        Ödeme penceresi: Her ayın <Text style={styles.noticeHighlight}>1-5'i</Text> arası
                    </Text>
                </View>

                {/* Rent List */}
                <View style={styles.listSection}>
                    <Text style={styles.sectionTitle}>Bu Ayki Ödemeler</Text>

                    {rentPayments.map((payment) => (
                        <TouchableOpacity
                            key={payment.id}
                            activeOpacity={0.7}
                            onPress={handlePress}
                        >
                            <Card style={styles.paymentCard}>
                                <View style={styles.paymentHeader}>
                                    <View style={styles.paymentInfo}>
                                        <Text style={styles.paymentAddress}>{payment.propertyAddress}</Text>
                                        <View style={styles.paymentLocation}>
                                            <Ionicons name="location-outline" size={12} color={colors.text.muted} />
                                            <Text style={styles.paymentCity}>{payment.propertyCity}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.paymentAmount}>
                                        <Text style={styles.amountValue}>${payment.amount.toLocaleString()}</Text>
                                    </View>
                                </View>

                                <View style={styles.paymentFooter}>
                                    <View style={[styles.statusBadge, { backgroundColor: `${rentStatus[payment.status]}15` }]}>
                                        <Ionicons
                                            name={statusIcons[payment.status] as any}
                                            size={14}
                                            color={rentStatus[payment.status]}
                                        />
                                        <Text style={[styles.statusText, { color: rentStatus[payment.status] }]}>
                                            {statusLabels[payment.status]}
                                        </Text>
                                    </View>

                                    {payment.paidDate && (
                                        <Text style={styles.paidDate}>
                                            Ödendi: {new Date(payment.paidDate).toLocaleDateString('tr-TR')}
                                        </Text>
                                    )}
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Rent History Link */}
                <TouchableOpacity
                    style={styles.historyButton}
                    onPress={handlePress}
                >
                    <Ionicons name="time-outline" size={20} color={colors.accent[500]} />
                    <Text style={styles.historyButtonText}>Geçmiş Ödemeleri Gör</Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />
                </TouchableOpacity>
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
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    subtitle: {
        fontSize: fontSize.sm,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    summaryCard: {
        marginHorizontal: spacing.xl,
        marginBottom: spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    summaryDivider: {
        width: 1,
        backgroundColor: colors.border.default,
    },
    summaryLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.xs,
    },
    summaryValue: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    progressContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
        paddingTop: spacing.lg,
    },
    progressBar: {
        height: 8,
        backgroundColor: colors.primary[800],
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        marginBottom: spacing.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.success[500],
        borderRadius: borderRadius.full,
    },
    progressText: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        textAlign: 'center',
    },
    noticeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.xl,
        marginBottom: spacing.xxl,
        padding: spacing.md,
        backgroundColor: `${colors.accent[500]}10`,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: `${colors.accent[500]}20`,
    },
    noticeIcon: {
        marginRight: spacing.md,
    },
    noticeText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    noticeHighlight: {
        fontWeight: fontWeight.bold,
        color: colors.accent[500],
    },
    listSection: {
        paddingHorizontal: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    paymentCard: {
        marginBottom: spacing.md,
    },
    paymentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentAddress: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    paymentLocation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentCity: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginLeft: spacing.xs,
    },
    paymentAmount: {
        alignItems: 'flex-end',
    },
    amountValue: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    paymentFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
        paddingTop: spacing.md,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    statusText: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.semibold,
        marginLeft: spacing.xs,
    },
    paidDate: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.xl,
        marginTop: spacing.lg,
        marginBottom: spacing.xxxl,
        paddingVertical: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    historyButtonText: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        color: colors.accent[500],
        flex: 1,
    },
});
