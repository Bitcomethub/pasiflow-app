import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, borderRadius, shadows } from '@/lib/theme';
import { Card } from './Card';

// Color constants for assets
const ASSET_COLORS = {
    pasiflow: colors.accent.cyan,
    sp500: '#10B981', // Emerald
    bitcoin: '#F59E0B', // Amber
    gold: '#FCD34D', // Yellow-300
    deposit: '#64748B' // Slate
};

interface PortfolioComparisonProps {
    userPortfolioName?: string;
    roi: number; // Percentage
}

export function PortfolioComparison({ userPortfolioName = 'Portföyüm', roi }: PortfolioComparisonProps) {
    // Mock comparative data based on Pasiflow exceeding others
    // normalized to max 100 height for bars
    const comparisons = [
        { label: 'Pasiflow', value: roi, color: ASSET_COLORS.pasiflow, icon: '🏠' },
        { label: 'S&P 500', value: 12, color: ASSET_COLORS.sp500, icon: '📈' },
        { label: 'Altın', value: 8, color: ASSET_COLORS.gold, icon: '🥇' },
        { label: 'Mevduat (USD)', value: 4, color: ASSET_COLORS.deposit, icon: '🏦' }
    ];

    const maxValue = Math.max(...comparisons.map(c => c.value));

    return (
        <Card style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Portföy Performansı</Text>
                <Text style={styles.subtitle}>Son 12 Aylık Getiri (USD)</Text>
            </View>

            <View style={styles.chartContainer}>
                {comparisons.map((item, index) => {
                    const heightPercent = (item.value / maxValue) * 100;

                    return (
                        <View key={index} style={styles.barGroup}>
                            <View style={styles.barWrapper}>
                                <Text style={[styles.barValue, { color: item.color }]}>%{item.value}</Text>
                                <View style={[styles.barTrack]}>
                                    <View
                                        style={[
                                            styles.barFill,
                                            {
                                                height: `${heightPercent}%`,
                                                backgroundColor: item.color,
                                                opacity: item.label === 'Pasiflow' ? 1 : 0.7
                                            }
                                        ]}
                                    />
                                </View>
                            </View>
                            <Text style={styles.barLabel}>{item.label}</Text>
                        </View>
                    );
                })}
            </View>

            <View style={styles.insightContainer}>
                <Text style={styles.insightText}>
                    🎉 Portföyünüz, geleneksel piyasalardan <Text style={{ color: colors.success, fontWeight: 'bold' }}>%{(roi - 12).toFixed(1)} daha fazla</Text> getiri sağladı.
                </Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    header: {
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 180,
        paddingBottom: spacing.sm,
    },
    barGroup: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
    },
    barWrapper: {
        height: 140, // Max bar height
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 8,
    },
    barTrack: {
        width: 12,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: borderRadius.full,
    },
    barValue: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    barLabel: {
        fontSize: 10,
        color: colors.text.secondary,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
    insightContainer: {
        marginTop: spacing.md,
        padding: spacing.md,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderRadius: borderRadius.md,
        borderLeftWidth: 3,
        borderLeftColor: colors.success,
    },
    insightText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
    },
});
