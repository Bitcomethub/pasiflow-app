import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card, StatBlock } from '@/components/ui';

// Mock Data for Agent
const AGENT_STATS = {
    totalCommission: '$12,450',
    pendingCommission: '$3,200',
    activeDeals: 4,
    nextPaymentDate: '15 Ocak 2026'
};

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

export default function AgentDashboard() {
    return (
        <LinearGradient
            colors={[colors.background.main, colors.primary[900]]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.welcomeText}>Hoş Geldiniz,</Text>
                            <Text style={styles.agentName}>Pasiflow Agent</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.logoutButton}>
                            <Ionicons name="log-out-outline" size={24} color={colors.error} />
                        </TouchableOpacity>
                    </View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <Card style={styles.statCard}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="wallet-outline" size={24} color={colors.accent.cyan} />
                            </View>
                            <Text style={styles.statValue}>{AGENT_STATS.totalCommission}</Text>
                            <Text style={styles.statLabel}>Toplam Kazanç</Text>
                        </Card>
                        <Card style={styles.statCard}>
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(250, 204, 21, 0.1)' }]}>
                                <Ionicons name="time-outline" size={24} color={colors.warning} />
                            </View>
                            <Text style={[styles.statValue, { color: colors.warning }]}>{AGENT_STATS.pendingCommission}</Text>
                            <Text style={styles.statLabel}>Bekleyen Ödeme</Text>
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
                                <Text style={styles.paymentTitle}>Sonraki Ödeme Tarihi</Text>
                                <Text style={styles.paymentDate}>{AGENT_STATS.nextPaymentDate}</Text>
                            </View>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Aktif</Text>
                        </View>
                    </LinearGradient>

                    {/* Client Investments List */}
                    <Text style={styles.sectionTitle}>Müşteri Portföyü</Text>

                    {CLIENT_INVESTMENTS.map((deal) => (
                        <Card key={deal.id} style={styles.dealCard}>
                            <View style={styles.dealHeader}>
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
                                    styles.dealStatus,
                                    deal.status === 'completed' ? styles.statusCompleted :
                                        deal.status === 'processing' ? styles.statusProcessing : styles.statusPending
                                ]}>
                                    <Text style={[
                                        styles.dealStatusText,
                                        {
                                            color: deal.status === 'completed' ? colors.success :
                                                deal.status === 'processing' ? colors.warning : colors.text.tertiary
                                        }
                                    ]}>
                                        {deal.status === 'completed' ? 'Tamamlandı' :
                                            deal.status === 'processing' ? 'İşleniyor' : 'Beklemede'}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.dealFooter}>
                                <View>
                                    <Text style={styles.footerLabel}>Satış Tutarı</Text>
                                    <Text style={styles.footerValue}>{deal.price}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.footerLabel}>Komisyon</Text>
                                    <Text style={styles.commissionValue}>+{deal.commission}</Text>
                                </View>
                            </View>
                        </Card>
                    ))}

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
        padding: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
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
    dealCard: {
        marginBottom: spacing.md,
        padding: spacing.md,
    },
    dealHeader: {
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
    dealStatus: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusCompleted: { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
    statusProcessing: { backgroundColor: 'rgba(250, 204, 21, 0.1)' },
    statusPending: { backgroundColor: 'rgba(148, 163, 184, 0.1)' },
    dealStatusText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    dealFooter: {
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
    commissionValue: {
        fontSize: fontSize.sm,
        fontWeight: 'bold',
        color: colors.success,
    },
});
