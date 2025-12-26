import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows, propertyStatus } from '@/lib/theme';
import { Card, Badge, StatBlock } from '@/components/ui';

// Mock Data - User's Current Properties (Updated from Pasiflow Info)
const PROPERTIES = [
    {
        id: '1',
        title: 'Section 8 Colonial - Cleveland',
        location: 'Cleveland Heights, OH',
        status: 'occupied',
        purchasePrice: '$98,000',
        monthlyRent: '$1,150',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '15 gün kaldı',
        section8: true,
        occupancyRate: 100,
    },
    {
        id: '2',
        title: 'Turnkey Single Family - Detroit',
        location: 'Detroit, MI',
        status: 'occupied',
        purchasePrice: '$85,000',
        monthlyRent: '$950',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '2 gün kaldı',
        section8: true,
        occupancyRate: 100,
    },
    {
        id: '3',
        title: 'Premium Craftsman - Memphis',
        location: 'Memphis, TN',
        status: 'vacancy',
        purchasePrice: '$125,000',
        monthlyRent: '$1,350',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '-',
        section8: true,
        occupancyRate: 0,
    },
];

// Hot Investment Opportunities (Updated from Pasiflow Official Info)
const HOT_OPPORTUNITIES = [
    {
        id: 'hot-1',
        title: '🏠 Section 8 Ready - Detroit',
        location: 'Detroit, MI',
        price: '$85,000',
        roi: '%11.5',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
        tag: 'Section 8 Onaylı',
        section8: true,
    },
    {
        id: 'hot-2',
        title: '💰 Turnkey Duplex - Cleveland',
        location: 'Cleveland, OH',
        price: '$95,000',
        roi: '%12.2',
        image: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=800&auto=format&fit=crop&q=80',
        tag: 'Devlet Garantili Kira',
        section8: true,
    },
    {
        id: 'hot-3',
        title: '⭐ Premium Single Family',
        location: 'Indianapolis, IN',
        price: '$125,000',
        roi: '%10.8',
        image: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=800&auto=format&fit=crop&q=80',
        tag: 'Anahtar Teslim',
        section8: true,
    },
    {
        id: 'hot-4',
        title: '🔥 Giriş Seviyesi Fırsat',
        location: 'Memphis, TN',
        price: '$72,000',
        roi: '%13.5',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
        tag: 'Düşük Giriş Maliyeti',
        section8: true,
    },
];

export default function PropertiesScreen() {
    // Pulse animation for Hot Opportunities section
    const pulseAnim = React.useRef(new Animated.Value(1)).current;
    const glowAnim = React.useRef(new Animated.Value(0.5)).current;
    const cardScaleAnim = React.useRef(new Animated.Value(1)).current;
    const cardGlowAnim = React.useRef(new Animated.Value(0)).current;

    // Run animations every time this tab is focused
    useFocusEffect(
        useCallback(() => {
            // Reset animation values
            pulseAnim.setValue(1);
            glowAnim.setValue(0.5);
            cardScaleAnim.setValue(1);
            cardGlowAnim.setValue(0);

            // Subtle pulse animation for the flame icon
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulseAnimation.start();

            // Glow animation for the section title (keep but make more subtle)
            const glowAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0.7,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            );
            glowAnimation.start();

            // Card subtle breathe animation
            const cardAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(cardScaleAnim, {
                        toValue: 1.02,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cardScaleAnim, {
                        toValue: 1,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                ])
            );
            cardAnimation.start();

            // Card border glow animation
            const cardGlowAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(cardGlowAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cardGlowAnim, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            );
            cardGlowAnimation.start();

            // Cleanup: stop animations when leaving the tab
            return () => {
                pulseAnimation.stop();
                glowAnimation.stop();
                cardAnimation.stop();
                cardGlowAnimation.stop();
            };
        }, [])
    );

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
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => router.push(`/property/${item.id}`)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.detailsButtonText}>Detaylar</Text>
                        <Ionicons name="arrow-forward" size={16} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <LinearGradient
            colors={[colors.background.main, '#1F2937']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={PROPERTIES}
                    renderItem={renderProperty}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={5}
                    removeClippedSubviews={false}
                    ListHeaderComponent={() => (
                        <>
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

                            {/* Hot Opportunities Section */}
                            <View style={styles.hotSection}>
                                <View style={styles.hotHeader}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                                            <Ionicons name="flame" size={22} color={colors.warning} />
                                        </Animated.View>
                                        <Animated.Text style={[styles.hotTitle, { opacity: glowAnim }]}>
                                            Sıcak Fırsatlar
                                        </Animated.Text>
                                    </View>
                                    <Text style={styles.hotSubtitle}>Özel yatırım fırsatları</Text>
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.xl }}>
                                    {HOT_OPPORTUNITIES.map((opportunity, index) => (
                                        <View key={opportunity.id} style={styles.hotCardWrapper}>
                                            {/* Animated Glow Border */}
                                            <Animated.View
                                                style={[
                                                    styles.glowBorder,
                                                    {
                                                        opacity: cardGlowAnim,
                                                    }
                                                ]}
                                            />
                                            <TouchableOpacity
                                                style={styles.hotCard}
                                                activeOpacity={0.9}
                                                onPress={() => router.push(`/property/${opportunity.id}`)}
                                            >
                                                <View style={styles.hotImageContainer}>
                                                    <View style={styles.imagePlaceholder}>
                                                        <Ionicons name="image-outline" size={30} color={colors.text.tertiary} />
                                                    </View>
                                                    <Image
                                                        source={{ uri: opportunity.image }}
                                                        style={styles.hotImage}
                                                        resizeMode="cover"
                                                    />
                                                </View>
                                                <LinearGradient
                                                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                                                    style={styles.hotGradient}
                                                >
                                                    <View style={styles.hotTag}>
                                                        <Text style={styles.hotTagText}>{opportunity.tag}</Text>
                                                    </View>
                                                    <Text style={styles.hotCardTitle}>{opportunity.title}</Text>
                                                    <Text style={styles.hotLocation}>{opportunity.location}</Text>
                                                    <View style={styles.hotStats}>
                                                        <Text style={styles.hotPrice}>{opportunity.price}</Text>
                                                        <View style={styles.hotRoiBadge}>
                                                            <Text style={styles.hotRoiText}>{opportunity.roi} ROI</Text>
                                                        </View>
                                                    </View>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                            <Text style={styles.myPropertiesTitle}>Mülklerim</Text>
                        </>
                    )}
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
        paddingHorizontal: spacing.lg, // Reduced from xl to better center content
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
    // Hot Opportunities Styles
    hotSection: {
        marginBottom: spacing.xl,
    },
    hotHeader: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.md,
    },
    hotTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    hotSubtitle: {
        fontSize: fontSize.sm,
        color: colors.text.tertiary,
        marginTop: 2,
    },
    hotCard: {
        width: 200,
        height: 260,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: colors.background.card,
    },
    hotCardWrapper: {
        marginRight: spacing.md,
        position: 'relative',
    },
    glowBorder: {
        position: 'absolute',
        top: -3,
        left: -3,
        right: -3,
        bottom: -3,
        borderRadius: borderRadius.xl + 3,
        borderWidth: 2,
        borderColor: colors.warning,
        shadowColor: '#FF6B00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 12,
        elevation: 8,
    },
    hotImageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.background.subtle,
    },
    imagePlaceholder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background.subtle,
    },
    hotImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    hotGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
    },
    hotTag: {
        alignSelf: 'flex-start',
        backgroundColor: colors.warning,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.sm,
    },
    hotTagText: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold as any,
        color: colors.background.main,
    },
    hotCardTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    hotLocation: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.sm,
    },
    hotStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hotPrice: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    hotRoiBadge: {
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    hotRoiText: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold as any,
        color: colors.success,
    },
    myPropertiesTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.md,
    },
});
