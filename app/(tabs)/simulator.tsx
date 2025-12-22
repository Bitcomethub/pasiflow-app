import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';

// Simple implementation of a slider-like component since we don't have Slider installed
const CustomSlider = ({ value, onValueChange, min, max, format }: { value: number, onValueChange: (val: number) => void, min: number, max: number, format: (val: number) => string }) => {
    return (
        <View style={sliderStyles.container}>
            <View style={sliderStyles.track}>
                <View style={[sliderStyles.fill, { width: `${((value - min) / (max - min)) * 100}%` }]} />
            </View>
            <View style={sliderStyles.controls}>
                <TouchableOpacity onPress={() => onValueChange(Math.max(min, value - (max - min) * 0.1))}>
                    <Ionicons name="remove-circle-outline" size={28} color={colors.text.secondary} />
                </TouchableOpacity>
                <Text style={sliderStyles.value}>{format(value)}</Text>
                <TouchableOpacity onPress={() => onValueChange(Math.min(max, value + (max - min) * 0.1))}>
                    <Ionicons name="add-circle-outline" size={28} color={colors.accent.cyan} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const sliderStyles = StyleSheet.create({
    container: {
        marginVertical: spacing.md,
    },
    track: {
        height: 4,
        backgroundColor: colors.background.subtle,
        borderRadius: 2,
        marginBottom: spacing.md,
    },
    fill: {
        height: '100%',
        backgroundColor: colors.accent.cyan,
        borderRadius: 2,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    }
});

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
                        <Text style={styles.inputLabel}>Yatırım Tutarı</Text>
                        <CustomSlider
                            value={investmentAmount}
                            onValueChange={setInvestmentAmount}
                            min={1000}
                            max={500000}
                            format={(val) => `$${val.toLocaleString()}`}
                        />

                        <View style={styles.divider} />

                        <Text style={styles.inputLabel}>Vade (Yıl)</Text>
                        <CustomSlider
                            value={years}
                            onValueChange={setYears}
                            min={1}
                            max={30}
                            format={(val) => `${Math.round(val)} Yıl`}
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
});
