import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows, propertyStatus } from '@/lib/theme';
import { Card, Badge, StatBlock } from '@/components/ui';

// Mock Data
const PROPERTIES = [
    {
        id: '1',
        title: 'Modern Apartment in Miami',
        location: 'Miami, FL',
        status: 'occupied',
        purchasePrice: '$450,000',
        monthlyRent: '$3,200',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60',
        nextPaymentDate: '15 gün kaldı',
    },
    {
        id: '2',
        title: 'Downtown Loft',
        location: 'Austin, TX',
        status: 'vacancy',
        purchasePrice: '$320,000',
        monthlyRent: '$2,100',
        image: 'https://images.unsplash.com/photo-1512918760383-eda2723ad6e5?w=800&auto=format&fit=crop&q=60',
        nextPaymentDate: '-',
    },
];

export default function PropertiesScreen() {
    const renderProperty = ({ item }: { item: any }) => (
        <Card style={styles.propertyCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.propertyImage} />
                <View style={styles.statusBadgeContainer}>
                    <Badge
                        label={item.status === 'occupied' ? 'Kiracılı' : 'Boş'}
                        color={propertyStatus[item.status as keyof typeof propertyStatus]}
                    />
                </View>
                {/* Section 8 Badge Example */}
                {item.status === 'occupied' && (
                    <View style={styles.section8Badge}>
                        <Text style={styles.section8Text}>Section 8</Text>
                    </View>
                )}
            </View>

            <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.propertyTitle}>{item.title}</Text>
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-sharp" size={14} color={colors.text.tertiary} />
                            <Text style={styles.locationText}>{item.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Key Metrics Grid */}
                <View style={styles.metricsGrid}>
                    <StatBlock label="Mülk Değeri" value={item.purchasePrice} />
                    <StatBlock label="Kira Geliri" value={item.monthlyRent} highlight />
                    <StatBlock label="Net Getiri" value="~6.5%" />
                </View>

                {/* Action Footer */}
                <View style={styles.cardFooter}>
                    <View style={styles.nextPayment}>
                        <Ionicons name="time-outline" size={16} color={colors.text.tertiary} />
                        <Text style={styles.paymentText}>Ödeme: {item.nextPaymentDate}</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>Detaylar</Text>
                        <Ionicons name="arrow-forward" size={16} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <LinearGradient
            colors={[colors.background.main, '#0F172A']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Mülklerim</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Ionicons name="add" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.summaryScroll}>
                        <Card style={styles.summaryCard}>
                            <Ionicons name="business" size={24} color={colors.accent.cyan} style={styles.summaryIcon} />
                            <Text style={styles.summaryValue}>3</Text>
                            <Text style={styles.summaryLabel}>Toplam Mülk</Text>
                        </Card>
                        <Card style={styles.summaryCard}>
                            <Ionicons name="cash" size={24} color={colors.success} style={styles.summaryIcon} />
                            <Text style={styles.summaryValue}>$89k</Text>
                            <Text style={styles.summaryLabel}>Yıllık Gelir</Text>
                        </Card>
                        <Card style={styles.summaryCard}>
                            <Ionicons name="trending-up" size={24} color={colors.accent.purple} style={styles.summaryIcon} />
                            <Text style={styles.summaryValue}>%12</Text>
                            <Text style={styles.summaryLabel}>Değer Artışı</Text>
                        </Card>
                    </ScrollView>
                </View>

                <FlatList
                    data={PROPERTIES}
                    renderItem={renderProperty}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
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
    addButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary[600],
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.glow,
    },
    summaryContainer: {
        marginBottom: spacing.lg,
    },
    summaryScroll: {
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
    },
    summaryCard: {
        minWidth: 120,
        padding: spacing.lg,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    summaryIcon: {
        marginBottom: spacing.md,
    },
    summaryValue: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    summaryLabel: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
    },
    listContent: {
        paddingHorizontal: spacing.xl,
        paddingBottom: 100,
        gap: spacing.lg,
    },
    propertyCard: {
        padding: 0,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        overflow: 'hidden',
        ...shadows.card,
    },
    imageContainer: {
        height: 180,
        backgroundColor: colors.background.subtle,
        position: 'relative',
    },
    propertyImage: {
        width: '100%',
        height: '100%',
    },
    statusBadgeContainer: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
    },
    section8Badge: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    section8Text: {
        color: colors.text.primary,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold as any,
    },
    cardContent: {
        padding: spacing.lg,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    propertyTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: fontSize.sm,
        color: colors.text.tertiary,
    },
    metricsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border.subtle,
    },
    nextPayment: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    paymentText: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.primary[600],
        borderRadius: borderRadius.full,
    },
    detailsButtonText: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold as any,
        color: colors.text.primary,
    },
});
