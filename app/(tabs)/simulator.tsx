import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';



export default function SimulatorScreen() {
    const [investmentAmount, setInvestmentAmount] = useState(50000);
    const [years, setYears] = useState(5);
    const [selectedCity, setSelectedCity] = useState('Miami');

    const CITIES = [
        { name: 'Miami', appreciation: 12, rentalYield: 6.8, color: colors.accent.cyan },
        { name: 'Austin', appreciation: 8.5, rentalYield: 5.5, color: colors.accent.purple },
        { name: 'Detroit', appreciation: 15, rentalYield: 9.2, color: colors.warning },
    ];

    const calculateReturns = () => {
        const selectedCityData = CITIES.find(c => c.name === selectedCity) || CITIES[0];

        // Compound interest formula for appreciation: A = P(1 + r)^t
        const futureValue = investmentAmount * Math.pow((1 + selectedCityData.appreciation / 100), years);
        const totalAppreciation = futureValue - investmentAmount;

        // Simple rental yield calculation (reinvested annually for simplicity approx)
        // Total Rent = P * yield * t
        const annualRent = investmentAmount * (selectedCityData.rentalYield / 100);
        const totalRentalIncome = annualRent * years;

        const totalReturn = totalAppreciation + totalRentalIncome;
        const roi = (totalReturn / investmentAmount) * 100;

        return {
            futureValue,
            totalAppreciation,
            totalRentalIncome,
            totalReturn,
            roi
        };
    };

    const results = calculateReturns();

    return (
        <LinearGradient
            colors={[colors.background.main, '#0F172A']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Yatırım Simülatörü</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* City Selection */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityScroll}>
                        {CITIES.map((city) => (
                            <TouchableOpacity
                                key={city.name}
                                style={[
                                    styles.cityCard,
                                    selectedCity === city.name && styles.cityCardSelected,
                                    selectedCity === city.name && { borderColor: city.color, backgroundColor: `${city.color}10` }
                                ]}
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    setSelectedCity(city.name);
                                }}
                            >
                                <Text style={[
                                    styles.cityName,
                                    selectedCity === city.name && { color: city.color }
                                ]}>{city.name}</Text>
                                <View style={styles.cityStats}>
                                    <Text style={styles.cityStatLabel}>Değer Artışı</Text>
                                    <Text style={[styles.cityStatValue, { color: city.color }]}>%{city.appreciation}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Inputs */}
                    <Card style={styles.inputCard}>
                        <Text style={styles.inputLabel}>Yatırım Tutarı: ${investmentAmount.toLocaleString()}</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1000}
                            maximumValue={500000}
                            step={1000}
                            value={investmentAmount}
                            onValueChange={setInvestmentAmount}
                            minimumTrackTintColor={colors.accent.cyan}
                            maximumTrackTintColor={colors.background.subtle}
                            thumbTintColor={colors.accent.cyan}
                        />

                        <View style={styles.divider} />

                        <Text style={styles.inputLabel}>Vade: {Math.round(years)} Yıl</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={30}
                            step={1}
                            value={years}
                            onValueChange={setYears}
                            minimumTrackTintColor={colors.accent.cyan}
                            maximumTrackTintColor={colors.background.subtle}
                            thumbTintColor={colors.accent.cyan}
                        />
                    </Card>

                    {/* Results - Cosmic Highlight */}
                    <LinearGradient
                        colors={[colors.primary[800], colors.primary[900]]}
                        style={styles.resultCard}
                    >
                        <Text style={styles.resultTitle}>Tahmini Toplam Getiri</Text>
                        <Text style={styles.resultAmount}>${results.totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>

                        <View style={styles.roiContainer}>
                            <Text style={styles.roiLabel}>Toplam ROI</Text>
                            <Text style={styles.roiValue}>%{results.roi.toFixed(1)}</Text>
                        </View>

                        <View style={styles.breakdownContainer}>
                            <View style={styles.breakdownItem}>
                                <Text style={styles.breakdownLabel}>Değer Artışı</Text>
                                <Text style={styles.breakdownValue}>+${results.totalAppreciation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                            </View>
                            <View style={styles.breakdownItem}>
                                <Text style={styles.breakdownLabel}>Kira Geliri</Text>
                                <Text style={styles.breakdownValue}>+${results.totalRentalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Detailed Breakdown Section */}
                    <Card style={styles.detailCard}>
                        <View style={styles.detailHeader}>
                            <Ionicons name="analytics" size={20} color={colors.accent.cyan} />
                            <Text style={styles.detailTitle}>Detaylı Analiz</Text>
                        </View>

                        {/* Expense Breakdown */}
                        <View style={styles.expenseSection}>
                            <Text style={styles.expenseSectionTitle}>Tahmini Giderler (Yıllık)</Text>
                            <View style={styles.expenseRow}>
                                <Text style={styles.expenseLabel}>Sigorta</Text>
                                <Text style={styles.expenseValue}>-${Math.round(investmentAmount * 0.005).toLocaleString()}</Text>
                            </View>
                            <View style={styles.expenseRow}>
                                <Text style={styles.expenseLabel}>Vergi</Text>
                                <Text style={styles.expenseValue}>-${Math.round(investmentAmount * 0.012).toLocaleString()}</Text>
                            </View>
                            <View style={styles.expenseRow}>
                                <Text style={styles.expenseLabel}>Bakım/Onarım</Text>
                                <Text style={styles.expenseValue}>-${Math.round(investmentAmount * 0.01).toLocaleString()}</Text>
                            </View>
                            <View style={styles.expenseRow}>
                                <Text style={styles.expenseLabel}>Yönetim</Text>
                                <Text style={styles.expenseValue}>-${Math.round(investmentAmount * (CITIES.find(c => c.name === selectedCity)?.rentalYield || 6) / 100 * 0.08).toLocaleString()}</Text>
                            </View>
                            <View style={[styles.expenseRow, styles.expenseTotal]}>
                                <Text style={styles.expenseTotalLabel}>Net Yıllık Gelir</Text>
                                <Text style={styles.expenseTotalValue}>
                                    ${Math.round(
                                        (investmentAmount * (CITIES.find(c => c.name === selectedCity)?.rentalYield || 6) / 100) -
                                        (investmentAmount * 0.027) -
                                        (investmentAmount * (CITIES.find(c => c.name === selectedCity)?.rentalYield || 6) / 100 * 0.08)
                                    ).toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    </Card>

                    {/* Yearly Projection Table */}
                    <Card style={styles.detailCard}>
                        <View style={styles.detailHeader}>
                            <Ionicons name="calendar" size={20} color={colors.accent.purple} />
                            <Text style={styles.detailTitle}>Yıllık Projeksiyon</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Yıl</Text>
                            <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Değer</Text>
                            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Kira</Text>
                            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Toplam</Text>
                        </View>

                        {Array.from({ length: Math.min(years, 10) }, (_, i) => {
                            const year = i + 1;
                            const cityData = CITIES.find(c => c.name === selectedCity) || CITIES[0];
                            const valueAtYear = investmentAmount * Math.pow((1 + cityData.appreciation / 100), year);
                            const rentAtYear = investmentAmount * (cityData.rentalYield / 100) * year;
                            const totalAtYear = (valueAtYear - investmentAmount) + rentAtYear;

                            return (
                                <View key={year} style={[styles.tableRow, year % 2 === 0 && styles.tableRowAlt]}>
                                    <Text style={[styles.tableCell, { flex: 0.8 }]}>{year}</Text>
                                    <Text style={[styles.tableCell, { flex: 1.2 }]}>${Math.round(valueAtYear).toLocaleString()}</Text>
                                    <Text style={[styles.tableCell, { flex: 1, color: colors.success }]}>+${Math.round(rentAtYear).toLocaleString()}</Text>
                                    <Text style={[styles.tableCell, { flex: 1, color: colors.accent.cyan }]}>+${Math.round(totalAtYear).toLocaleString()}</Text>
                                </View>
                            );
                        })}

                        {years > 10 && (
                            <Text style={styles.tableNote}>...ve {years - 10} yıl daha</Text>
                        )}
                    </Card>

                    {/* Investment Tips */}
                    <Card style={styles.detailCard}>
                        <View style={styles.detailHeader}>
                            <Ionicons name="bulb" size={20} color={colors.warning} />
                            <Text style={styles.detailTitle}>Yatırım İpuçları</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                            <Text style={styles.tipText}>Detroit bölgesi yüksek kira getirisi sunar, ancak bakım maliyetleri daha yüksek olabilir.</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                            <Text style={styles.tipText}>Uzun vadeli yatırımlarda bileşik getiri etkisi artış gösterir.</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                            <Text style={styles.tipText}>Section 8 garantili kiracılar daha düşük risk sunar.</Text>
                        </View>
                    </Card>
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
    header: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    title: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    cityScroll: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xl,
    },
    cityCard: {
        padding: spacing.lg,
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.xl,
        marginRight: spacing.md,
        width: 140,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    cityCardSelected: {
        borderWidth: 2,
    },
    cityName: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.secondary,
        marginBottom: spacing.md,
    },
    cityStats: {
        gap: 2,
    },
    cityStatLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    cityStatValue: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
    },
    inputCard: {
        marginHorizontal: spacing.xl,
        padding: spacing.xl,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        marginBottom: spacing.xl,
    },
    inputLabel: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        fontWeight: fontWeight.bold as any,
        marginBottom: -spacing.sm, // pulling closer to slider
    },
    divider: {
        height: 1,
        backgroundColor: colors.border.subtle,
        marginVertical: spacing.lg,
    },
    resultCard: {
        marginHorizontal: spacing.xl,
        padding: spacing.xl,
        borderRadius: borderRadius.xxl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        ...shadows.float,
    },
    resultTitle: {
        fontSize: fontSize.sm,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
        letterSpacing: 1,
        fontWeight: fontWeight.bold as any,
        textTransform: 'uppercase',
    },
    resultAmount: {
        fontSize: 42,
        fontWeight: fontWeight.bold as any,
        color: colors.success,
        marginBottom: spacing.lg,
        textShadowColor: 'rgba(52, 211, 153, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    roiContainer: {
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        marginBottom: spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    roiLabel: {
        color: colors.success,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
    },
    roiValue: {
        color: colors.success,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
    },
    breakdownContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    breakdownItem: {
        flex: 1,
        alignItems: 'center',
    },
    breakdownLabel: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        marginBottom: 4,
    },
    breakdownValue: {
        fontSize: fontSize.base,
        color: colors.text.primary,
        fontWeight: fontWeight.bold as any,
    },
    // New styles for detailed breakdown
    detailCard: {
        marginHorizontal: spacing.xl,
        marginTop: spacing.lg,
        padding: spacing.lg,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    detailTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    expenseSection: {
        gap: spacing.sm,
    },
    expenseSectionTitle: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.sm,
    },
    expenseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.xs,
    },
    expenseLabel: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    expenseValue: {
        fontSize: fontSize.sm,
        color: colors.error,
        fontWeight: fontWeight.medium as any,
    },
    expenseTotal: {
        borderTopWidth: 1,
        borderTopColor: colors.border.subtle,
        marginTop: spacing.sm,
        paddingTop: spacing.md,
    },
    expenseTotalLabel: {
        fontSize: fontSize.base,
        color: colors.text.primary,
        fontWeight: fontWeight.bold as any,
    },
    expenseTotalValue: {
        fontSize: fontSize.base,
        color: colors.success,
        fontWeight: fontWeight.bold as any,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: spacing.sm,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.xs,
    },
    tableHeaderCell: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        fontWeight: fontWeight.bold as any,
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
    },
    tableRowAlt: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: borderRadius.sm,
    },
    tableCell: {
        fontSize: fontSize.sm,
        color: colors.text.primary,
    },
    tableNote: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        textAlign: 'center',
        marginTop: spacing.sm,
        fontStyle: 'italic',
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    tipText: {
        flex: 1,
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
    },
});
