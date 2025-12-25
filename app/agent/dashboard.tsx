import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';

// Mock Data for Agent Stats
const AGENT_STATS = {
    totalCommission: '$12,450',
    pendingCommission: '$3,200',
    activeDeals: 4,
    nextPaymentDate: '15 Ocak 2026'
};

// Mock Client Investments
const CLIENT_INVESTMENTS = [
    {
        id: '1',
        clientName: 'Ahmet Yılmaz',
        property: '123 Oak St, Detroit',
        status: 'completed',
        price: '$45,000',
        commission: '$1,350',
        date: '20 Ara 2025'
    },
    {
        id: '2',
        clientName: 'Mehmet Demir',
        property: '456 Pine Ave, Cleveland',
        status: 'processing',
        price: '$52,000',
        commission: '$1,560',
        date: '23 Ara 2025'
    },
    {
        id: '3',
        clientName: 'Ayşe Kaya',
        property: '789 Maple Dr, Memphis',
        status: 'pending',
        price: '$68,000',
        commission: '$2,040',
        date: '24 Ara 2025'
    }
];

// Hot Deals with Commission Info (3% commission rate)
const HOT_DEALS = [
    {
        id: 'hd1',
        title: 'Modern Duplex - Detroit',
        address: '456 Woodward Ave, Detroit, MI',
        price: 48000,
        monthlyRent: 850,
        roi: 14.2,
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
        status: 'available',
        commission: 1440, // 3% of price
    },
    {
        id: 'hd2',
        title: 'Section 8 Ready - Cleveland',
        address: '789 Euclid Ave, Cleveland, OH',
        price: 35000,
        monthlyRent: 750,
        roi: 16.5,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        status: 'hot',
        commission: 1050,
    },
    {
        id: 'hd3',
        title: 'Renovated Single Family - Memphis',
        address: '321 Beale St, Memphis, TN',
        price: 52000,
        monthlyRent: 900,
        roi: 13.8,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        status: 'available',
        commission: 1560,
    },
    {
        id: 'hd4',
        title: 'Cash Flow King - Indianapolis',
        address: '555 Monument Cir, Indianapolis, IN',
        price: 42000,
        monthlyRent: 800,
        roi: 15.2,
        image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400',
        status: 'hot',
        commission: 1260,
    },
    {
        id: 'hd5',
        title: 'Turnkey Investment - St. Louis',
        address: '123 Gateway Dr, St. Louis, MO',
        price: 38000,
        monthlyRent: 700,
        roi: 14.7,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        status: 'available',
        commission: 1140,
    },
];

type TabType = 'overview' | 'deals';

export default function AgentDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const renderDealCard = ({ item }: { item: typeof HOT_DEALS[0] }) => (
        <Card style={styles.dealCard}>
            <Image source={{ uri: item.image }} style={styles.dealImage} />
            {item.status === 'hot' && (
                <View style={styles.hotBadge}>
                    <Ionicons name="flame" size={12} color="#FFF" />
                    <Text style={styles.hotBadgeText}>HOT</Text>
                </View>
            )}
            <View style={styles.dealContent}>
                <Text style={styles.dealTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.dealAddress} numberOfLines={1}>{item.address}</Text>

                <View style={styles.dealStats}>
                    <View style={styles.dealStat}>
                        <Text style={styles.dealStatLabel}>Price</Text>
                        <Text style={styles.dealStatValue}>${item.price.toLocaleString()}</Text>
                    </View>
                    <View style={styles.dealStat}>
                        <Text style={styles.dealStatLabel}>ROI</Text>
                        <Text style={[styles.dealStatValue, { color: colors.success }]}>{item.roi}%</Text>
                    </View>
                    <View style={styles.dealStat}>
                        <Text style={styles.dealStatLabel}>Rent</Text>
                        <Text style={styles.dealStatValue}>${item.monthlyRent}/mo</Text>
                    </View>
                </View>

                {/* Commission Highlight */}
                <LinearGradient
                    colors={['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.05)']}
                    style={styles.commissionBanner}
                >
                    <Ionicons name="cash-outline" size={18} color={colors.accent.purple} />
                    <View>
                        <Text style={styles.commissionLabel}>Your Commission (3%)</Text>
                        <Text style={styles.commissionValue}>${item.commission.toLocaleString()}</Text>
                    </View>
                </LinearGradient>
            </View>
        </Card>
    );

    return (
        <LinearGradient
            colors={[colors.background.main, colors.primary[900]]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <Text style={styles.agentName}>Agent John</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.logoutButton}>
                        <Ionicons name="log-out-outline" size={24} color={colors.error} />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
                        onPress={() => setActiveTab('overview')}
                    >
                        <Ionicons
                            name="stats-chart"
                            size={18}
                            color={activeTab === 'overview' ? colors.accent.purple : colors.text.tertiary}
                        />
                        <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
                            Overview
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'deals' && styles.tabActive]}
                        onPress={() => setActiveTab('deals')}
                    >
                        <Ionicons
                            name="flame"
                            size={18}
                            color={activeTab === 'deals' ? colors.accent.purple : colors.text.tertiary}
                        />
                        <Text style={[styles.tabText, activeTab === 'deals' && styles.tabTextActive]}>
                            Hot Deals
                        </Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'overview' ? (
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {/* Stats Grid */}
                        <View style={styles.statsGrid}>
                            <Card style={styles.statCard}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="wallet-outline" size={24} color={colors.accent.cyan} />
                                </View>
                                <Text style={styles.statValue}>{AGENT_STATS.totalCommission}</Text>
                                <Text style={styles.statLabel}>Total Earned</Text>
                            </Card>
                            <Card style={styles.statCard}>
                                <View style={[styles.iconContainer, { backgroundColor: 'rgba(250, 204, 21, 0.1)' }]}>
                                    <Ionicons name="time-outline" size={24} color={colors.warning} />
                                </View>
                                <Text style={[styles.statValue, { color: colors.warning }]}>{AGENT_STATS.pendingCommission}</Text>
                                <Text style={styles.statLabel}>Pending</Text>
                            </Card>
                        </View>

                        {/* Payment Status Banner */}
                        <LinearGradient
                            colors={[colors.accent.gradientStart, colors.accent.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.paymentBanner}
                        >
                            <View style={styles.paymentContent}>
                                <Ionicons name="calendar-outline" size={24} color={colors.text.primary} />
                                <View>
                                    <Text style={styles.paymentTitle}>Next Payment Date</Text>
                                    <Text style={styles.paymentDate}>{AGENT_STATS.nextPaymentDate}</Text>
                                </View>
                            </View>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>Active</Text>
                            </View>
                        </LinearGradient>

                        {/* Client Investments List */}
                        <Text style={styles.sectionTitle}>Client Portfolio</Text>

                        {CLIENT_INVESTMENTS.map((deal) => (
                            <Card key={deal.id} style={styles.clientCard}>
                                <View style={styles.clientHeader}>
                                    <View style={styles.clientInfo}>
                                        <View style={styles.avatarPlaceholder}>
                                            <Text style={styles.avatarText}>{deal.clientName.charAt(0)}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.clientName}>{deal.clientName}</Text>
                                            <Text style={styles.propertyText}>{deal.property}</Text>
                                        </View>
                                    </View>
                                    <View style={[
                                        styles.clientStatus,
                                        deal.status === 'completed' ? styles.statusCompleted :
                                            deal.status === 'processing' ? styles.statusProcessing : styles.statusPending
                                    ]}>
                                        <Text style={[
                                            styles.clientStatusText,
                                            {
                                                color: deal.status === 'completed' ? colors.success :
                                                    deal.status === 'processing' ? colors.warning : colors.text.tertiary
                                            }
                                        ]}>
                                            {deal.status === 'completed' ? 'Completed' :
                                                deal.status === 'processing' ? 'Processing' : 'Pending'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.clientFooter}>
                                    <View>
                                        <Text style={styles.footerLabel}>Sale Price</Text>
                                        <Text style={styles.footerValue}>{deal.price}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.footerLabel}>Commission</Text>
                                        <Text style={styles.commissionEarned}>+{deal.commission}</Text>
                                    </View>
                                </View>
                            </Card>
                        ))}
                    </ScrollView>
                ) : (
                    <FlatList
                        data={HOT_DEALS}
                        renderItem={renderDealCard}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.dealsListContent}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <Text style={styles.dealsHeader}>
                                Sell these properties and earn commission!
                            </Text>
                        }
                    />
                )}
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
        padding: spacing.lg,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    welcomeText: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
        marginBottom: 4,
    },
    agentName: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    logoutButton: {
        padding: spacing.sm,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: borderRadius.full,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: spacing.lg,
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        padding: 4,
        marginBottom: spacing.md,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        gap: spacing.xs,
    },
    tabActive: {
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
    },
    tabText: {
        fontSize: fontSize.sm,
        color: colors.text.tertiary,
        fontWeight: '500',
    },
    tabTextActive: {
        color: colors.accent.purple,
        fontWeight: 'bold',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    statCard: {
        flex: 1,
        padding: spacing.md,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statValue: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    paymentBanner: {
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
        ...shadows.glow,
    },
    paymentContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    paymentTitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: fontSize.xs,
        marginBottom: 2,
    },
    paymentDate: {
        color: '#fff',
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
    statusBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    statusText: {
        color: '#fff',
        fontSize: fontSize.xs,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    clientCard: {
        marginBottom: spacing.md,
        padding: spacing.md,
    },
    clientHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    clientInfo: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.subtle,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    avatarText: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.accent.purple,
    },
    clientName: {
        fontSize: fontSize.base,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    propertyText: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
    },
    clientStatus: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusCompleted: { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
    statusProcessing: { backgroundColor: 'rgba(250, 204, 21, 0.1)' },
    statusPending: { backgroundColor: 'rgba(148, 163, 184, 0.1)' },
    clientStatusText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    clientFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.border.subtle,
    },
    footerLabel: {
        fontSize: 10,
        color: colors.text.tertiary,
        marginBottom: 2,
    },
    footerValue: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    commissionEarned: {
        fontSize: fontSize.sm,
        fontWeight: 'bold',
        color: colors.success,
    },
    // Deals Tab Styles
    dealsListContent: {
        padding: spacing.lg,
        paddingBottom: 100,
    },
    dealsHeader: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    dealCard: {
        marginBottom: spacing.lg,
        overflow: 'hidden',
        padding: 0,
    },
    dealImage: {
        width: '100%',
        height: 150,
    },
    hotBadge: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.warning,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    hotBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },
    dealContent: {
        padding: spacing.md,
    },
    dealTitle: {
        fontSize: fontSize.base,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 4,
    },
    dealAddress: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.md,
    },
    dealStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    dealStat: {
        alignItems: 'center',
    },
    dealStatLabel: {
        fontSize: 10,
        color: colors.text.tertiary,
        marginBottom: 2,
    },
    dealStatValue: {
        fontSize: fontSize.sm,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    commissionBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: borderRadius.md,
    },
    commissionLabel: {
        fontSize: 10,
        color: colors.text.tertiary,
    },
    commissionValue: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.accent.purple,
    },
});
