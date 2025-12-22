import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius, propertyStatus } from '@/lib/theme';
import { Card } from '@/components/ui';

type PropertyStatus = 'occupied' | 'vacancy' | 'turnover';

interface Property {
    id: string;
    address: string;
    city: string;
    purchasePrice: number;
    purchaseDate: string;
    monthlyRent: number;
    netRent: number;
    status: PropertyStatus;
    section8: boolean;
    image?: string;
}

const properties: Property[] = [
    {
        id: '1',
        address: '1234 Maple Street',
        city: 'Detroit, MI',
        purchasePrice: 95000,
        purchaseDate: '2024-06-15',
        monthlyRent: 1250,
        netRent: 1050,
        status: 'occupied',
        section8: true,
    },
    {
        id: '2',
        address: '567 Oak Avenue',
        city: 'Cleveland, OH',
        purchasePrice: 110000,
        purchaseDate: '2024-03-22',
        monthlyRent: 1400,
        netRent: 1180,
        status: 'occupied',
        section8: true,
    },
    {
        id: '3',
        address: '890 Pine Boulevard',
        city: 'Memphis, TN',
        purchasePrice: 120000,
        purchaseDate: '2024-09-10',
        monthlyRent: 1350,
        netRent: 1100,
        status: 'turnover',
        section8: true,
    },
];

const statusLabels: Record<PropertyStatus, string> = {
    occupied: 'Kiracılı',
    vacancy: 'Boş',
    turnover: 'Geçiş',
};

export default function PropertiesScreen() {
    const totalValue = properties.reduce((sum, p) => sum + p.purchasePrice, 0);
    const totalMonthlyRent = properties.reduce((sum, p) => sum + p.netRent, 0);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Evlerim</Text>
                    <Text style={styles.subtitle}>{properties.length} mülk</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryRow}>
                    <Card style={styles.summaryCard}>
                        <Ionicons name="business-outline" size={20} color={colors.accent[500]} />
                        <Text style={styles.summaryValue}>${totalValue.toLocaleString()}</Text>
                        <Text style={styles.summaryLabel}>Toplam Değer</Text>
                    </Card>
                    <Card style={styles.summaryCard}>
                        <Ionicons name="wallet-outline" size={20} color={colors.success[500]} />
                        <Text style={styles.summaryValue}>${totalMonthlyRent.toLocaleString()}</Text>
                        <Text style={styles.summaryLabel}>Aylık Net</Text>
                    </Card>
                </View>

                {/* Property List */}
                <View style={styles.listSection}>
                    {properties.map((property) => (
                        <TouchableOpacity key={property.id} activeOpacity={0.7}>
                            <Card style={styles.propertyCard}>
                                {/* Property Image Placeholder */}
                                <View style={styles.propertyImage}>
                                    <Ionicons name="home" size={32} color={colors.text.muted} />
                                </View>

                                {/* Property Info */}
                                <View style={styles.propertyInfo}>
                                    <View style={styles.propertyHeader}>
                                        <Text style={styles.propertyAddress}>{property.address}</Text>
                                        <View style={[styles.statusBadge, { backgroundColor: `${propertyStatus[property.status]}20` }]}>
                                            <View style={[styles.statusDot, { backgroundColor: propertyStatus[property.status] }]} />
                                            <Text style={[styles.statusText, { color: propertyStatus[property.status] }]}>
                                                {statusLabels[property.status]}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.propertyLocation}>
                                        <Ionicons name="location-outline" size={14} color={colors.text.muted} />
                                        <Text style={styles.cityText}>{property.city}</Text>
                                        {property.section8 && (
                                            <View style={styles.section8Badge}>
                                                <Ionicons name="shield-checkmark" size={12} color={colors.success[500]} />
                                                <Text style={styles.section8Text}>Section 8</Text>
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.propertyStats}>
                                        <View style={styles.statBlock}>
                                            <Text style={styles.statBlockLabel}>Alış Fiyatı</Text>
                                            <Text style={styles.statBlockValue}>${property.purchasePrice.toLocaleString()}</Text>
                                        </View>
                                        <View style={styles.statBlock}>
                                            <Text style={styles.statBlockLabel}>Aylık Kira</Text>
                                            <Text style={styles.statBlockValue}>${property.monthlyRent.toLocaleString()}</Text>
                                        </View>
                                        <View style={styles.statBlock}>
                                            <Text style={styles.statBlockLabel}>Net Gelir</Text>
                                            <Text style={[styles.statBlockValue, { color: colors.success[500] }]}>
                                                ${property.netRent.toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Arrow */}
                                <View style={styles.arrowContainer}>
                                    <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))}
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
    summaryRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    summaryCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    summaryValue: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginTop: spacing.sm,
    },
    summaryLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    listSection: {
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        paddingBottom: spacing.xxxl,
    },
    propertyCard: {
        flexDirection: 'row',
        padding: 0,
        overflow: 'hidden',
    },
    propertyImage: {
        width: 80,
        backgroundColor: colors.primary[800],
        alignItems: 'center',
        justifyContent: 'center',
    },
    propertyInfo: {
        flex: 1,
        padding: spacing.lg,
    },
    propertyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    propertyAddress: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        flex: 1,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        marginLeft: spacing.sm,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: spacing.xs,
    },
    statusText: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.semibold,
    },
    propertyLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    cityText: {
        fontSize: fontSize.sm,
        color: colors.text.muted,
        marginLeft: spacing.xs,
    },
    section8Badge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: spacing.md,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        backgroundColor: `${colors.success[500]}15`,
        borderRadius: borderRadius.sm,
    },
    section8Text: {
        fontSize: fontSize.xs,
        color: colors.success[500],
        fontWeight: fontWeight.semibold,
        marginLeft: 3,
    },
    propertyStats: {
        flexDirection: 'row',
        gap: spacing.lg,
    },
    statBlock: {},
    statBlockLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginBottom: 2,
    },
    statBlockValue: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    arrowContainer: {
        justifyContent: 'center',
        paddingRight: spacing.md,
    },
});
