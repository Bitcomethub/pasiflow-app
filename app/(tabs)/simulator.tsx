import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';

// City data from website ROI calculator
const cityData = {
    detroit: {
        name: 'Detroit, MI',
        minBudget: 75000,
        maxBudget: 110000,
        avgRentRatio: 0.0125,
        taxRate: 0.014,
        insuranceRate: 0.011,
        highlight: 'Maksimum Nakit Akışı',
    },
    cleveland: {
        name: 'Cleveland, OH',
        minBudget: 85000,
        maxBudget: 120000,
        avgRentRatio: 0.012,
        taxRate: 0.01,
        insuranceRate: 0.012,
        highlight: 'Dengeli & Güvenli',
    },
    memphis: {
        name: 'Memphis, TN',
        minBudget: 90000,
        maxBudget: 130000,
        avgRentRatio: 0.011,
        taxRate: 0.008,
        insuranceRate: 0.012,
        highlight: 'Vergi Avantajı',
    },
};

const PASIFLOW_SERVICE_FEE = 5000;
const MANAGEMENT_FEE_RATE = 0.1;
const YEARLY_APPRECIATION_RATE = 0.07;

const holdingPeriods = [1, 3, 5, 10];
const propertyOptions = [1, 2, 3, 5, 10];

export default function SimulatorScreen() {
    const [selectedCity, setSelectedCity] = useState<keyof typeof cityData>('detroit');
    const [propertyCount, setPropertyCount] = useState(1);
    const [holdingPeriod, setHoldingPeriod] = useState(5);
    const [appreciationRate, setAppreciationRate] = useState(7);
    const [rentGrowthRate, setRentGrowthRate] = useState(3);

    const city = cityData[selectedCity];
    const avgPrice = (city.minBudget + city.maxBudget) / 2;

    // Calculations
    const totalPurchasePrice = avgPrice * propertyCount;
    const totalInvestment = (avgPrice + PASIFLOW_SERVICE_FEE) * propertyCount;

    const monthlyRentPerProperty = avgPrice * city.avgRentRatio;
    const yearlyRentPerProperty = monthlyRentPerProperty * 12;

    // Annual expenses per property
    const yearlyPropertyTax = avgPrice * city.taxRate;
    const yearlyInsurance = avgPrice * city.insuranceRate;
    const yearlyManagement = yearlyRentPerProperty * MANAGEMENT_FEE_RATE;
    const totalYearlyExpensesPerProperty = yearlyPropertyTax + yearlyInsurance + yearlyManagement;

    const yearlyNetIncomePerProperty = yearlyRentPerProperty - totalYearlyExpensesPerProperty;
    const totalYearlyNetIncome = yearlyNetIncomePerProperty * propertyCount;
    const monthlyNetIncome = totalYearlyNetIncome / 12;

    // Future value calculations
    const appreciationDecimal = appreciationRate / 100;
    const futurePropertyValue = totalPurchasePrice * Math.pow(1 + appreciationDecimal, holdingPeriod);
    const appreciationAmount = futurePropertyValue - totalPurchasePrice;

    // Total rental income over holding period (with rent growth)
    let totalRentalIncome = 0;
    const rentGrowthDecimal = rentGrowthRate / 100;
    for (let year = 1; year <= holdingPeriod; year++) {
        totalRentalIncome += totalYearlyNetIncome * Math.pow(1 + rentGrowthDecimal, year - 1);
    }

    const totalReturn = totalRentalIncome + appreciationAmount;
    const totalRoiPercent = (totalReturn / totalInvestment) * 100;
    const annualizedRoi = totalRoiPercent / holdingPeriod;

    const handleSelect = () => {
        if (Platform.OS === 'ios') {
            Haptics.selectionAsync();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Değer Simülasyonu</Text>
                    <Text style={styles.subtitle}>Portföyünüzün geleceğini hesaplayın</Text>
                </View>

                {/* City Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Yatırım Şehri</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.cityRow}>
                            {(Object.keys(cityData) as Array<keyof typeof cityData>).map((cityKey) => (
                                <TouchableOpacity
                                    key={cityKey}
                                    onPress={() => {
                                        setSelectedCity(cityKey);
                                        handleSelect();
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Card
                                        variant={selectedCity === cityKey ? 'accent' : 'default'}
                                        style={[
                                            styles.cityCard,
                                            selectedCity === cityKey && styles.cityCardSelected,
                                        ]}
                                    >
                                        <Text style={[
                                            styles.cityName,
                                            selectedCity === cityKey && styles.cityNameSelected,
                                        ]}>
                                            {cityData[cityKey].name}
                                        </Text>
                                        <Text style={styles.cityHighlight}>
                                            {cityData[cityKey].highlight}
                                        </Text>
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Property Count */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mülk Sayısı</Text>
                    <View style={styles.optionsRow}>
                        {propertyOptions.map((count) => (
                            <TouchableOpacity
                                key={count}
                                onPress={() => {
                                    setPropertyCount(count);
                                    handleSelect();
                                }}
                                style={[
                                    styles.optionButton,
                                    propertyCount === count && styles.optionButtonSelected,
                                ]}
                            >
                                <Text style={[
                                    styles.optionText,
                                    propertyCount === count && styles.optionTextSelected,
                                ]}>
                                    {count}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Holding Period */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tutma Süresi</Text>
                    <View style={styles.optionsRow}>
                        {holdingPeriods.map((years) => (
                            <TouchableOpacity
                                key={years}
                                onPress={() => {
                                    setHoldingPeriod(years);
                                    handleSelect();
                                }}
                                style={[
                                    styles.optionButton,
                                    styles.optionButtonWide,
                                    holdingPeriod === years && styles.optionButtonSelected,
                                ]}
                            >
                                <Text style={[
                                    styles.optionText,
                                    holdingPeriod === years && styles.optionTextSelected,
                                ]}>
                                    {years} Yıl
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Rate Adjustments */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Varsayımlar</Text>
                    <Card style={styles.ratesCard}>
                        <View style={styles.rateRow}>
                            <View style={styles.rateInfo}>
                                <Text style={styles.rateLabel}>Değer Artışı (Yıllık)</Text>
                                <Text style={styles.rateValue}>%{appreciationRate}</Text>
                            </View>
                            <View style={styles.rateControls}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAppreciationRate(Math.max(3, appreciationRate - 1));
                                        handleSelect();
                                    }}
                                    style={styles.rateButton}
                                >
                                    <Ionicons name="remove" size={18} color={colors.text.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAppreciationRate(Math.min(12, appreciationRate + 1));
                                        handleSelect();
                                    }}
                                    style={styles.rateButton}
                                >
                                    <Ionicons name="add" size={18} color={colors.text.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.rateRow, { borderTopWidth: 1, borderTopColor: colors.border.default, paddingTop: spacing.lg }]}>
                            <View style={styles.rateInfo}>
                                <Text style={styles.rateLabel}>Kira Artışı (Yıllık)</Text>
                                <Text style={styles.rateValue}>%{rentGrowthRate}</Text>
                            </View>
                            <View style={styles.rateControls}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setRentGrowthRate(Math.max(1, rentGrowthRate - 1));
                                        handleSelect();
                                    }}
                                    style={styles.rateButton}
                                >
                                    <Ionicons name="remove" size={18} color={colors.text.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setRentGrowthRate(Math.min(8, rentGrowthRate + 1));
                                        handleSelect();
                                    }}
                                    style={styles.rateButton}
                                >
                                    <Ionicons name="add" size={18} color={colors.text.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Results */}
                <View style={styles.resultsSection}>
                    <Text style={styles.resultsTitle}>{holdingPeriod} Yıl Sonunda</Text>

                    {/* Main Result Card */}
                    <Card variant="accent" style={styles.mainResultCard}>
                        <Text style={styles.mainResultLabel}>TOPLAM GETİRİ</Text>
                        <Text style={styles.mainResultValue}>${Math.round(totalReturn).toLocaleString()}</Text>
                        <View style={styles.mainResultStats}>
                            <View style={styles.mainResultStat}>
                                <Text style={styles.mainResultStatValue}>%{totalRoiPercent.toFixed(0)}</Text>
                                <Text style={styles.mainResultStatLabel}>Toplam ROI</Text>
                            </View>
                            <View style={styles.mainResultDivider} />
                            <View style={styles.mainResultStat}>
                                <Text style={styles.mainResultStatValue}>%{annualizedRoi.toFixed(1)}</Text>
                                <Text style={styles.mainResultStatLabel}>Yıllık Ortalama</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Breakdown */}
                    <View style={styles.breakdownGrid}>
                        <Card style={styles.breakdownCard}>
                            <Ionicons name="trending-up" size={24} color={colors.success[500]} />
                            <Text style={styles.breakdownValue}>${Math.round(futurePropertyValue).toLocaleString()}</Text>
                            <Text style={styles.breakdownLabel}>Portföy Değeri</Text>
                            <Text style={styles.breakdownSubtext}>+${Math.round(appreciationAmount).toLocaleString()}</Text>
                        </Card>

                        <Card style={styles.breakdownCard}>
                            <Ionicons name="wallet" size={24} color={colors.accent[500]} />
                            <Text style={styles.breakdownValue}>${Math.round(totalRentalIncome).toLocaleString()}</Text>
                            <Text style={styles.breakdownLabel}>Kira Geliri</Text>
                            <Text style={styles.breakdownSubtext}>{holdingPeriod} yıl toplam</Text>
                        </Card>
                    </View>

                    {/* Investment Summary */}
                    <Card style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Toplam Yatırım</Text>
                            <Text style={styles.summaryValue}>${Math.round(totalInvestment).toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Aylık Net Gelir</Text>
                            <Text style={[styles.summaryValue, { color: colors.success[500] }]}>
                                ${Math.round(monthlyNetIncome).toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Yıllık Net Gelir</Text>
                            <Text style={[styles.summaryValue, { color: colors.success[500] }]}>
                                ${Math.round(totalYearlyNetIncome).toLocaleString()}
                            </Text>
                        </View>
                    </Card>
                </View>

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                    * Hesaplamalar tahminidir. Gerçek sonuçlar piyasa koşullarına göre değişebilir.
                </Text>
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
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        color: colors.text.secondary,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.xl,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cityRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
    },
    cityCard: {
        width: 140,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    cityCardSelected: {
        borderColor: colors.accent[500],
        borderWidth: 2,
    },
    cityName: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    cityNameSelected: {
        color: colors.accent[500],
    },
    cityHighlight: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
    },
    optionsRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        gap: spacing.sm,
    },
    optionButton: {
        flex: 1,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        backgroundColor: colors.primary[800],
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    optionButtonWide: {
        paddingHorizontal: spacing.lg,
    },
    optionButtonSelected: {
        backgroundColor: colors.accent[500],
        borderColor: colors.accent[500],
    },
    optionText: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    optionTextSelected: {
        color: colors.white,
    },
    ratesCard: {
        marginHorizontal: spacing.xl,
    },
    rateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rateInfo: {
        flex: 1,
    },
    rateLabel: {
        fontSize: fontSize.sm,
        color: colors.text.muted,
    },
    rateValue: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginTop: spacing.xs,
    },
    rateControls: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    rateButton: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        backgroundColor: colors.primary[700],
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultsSection: {
        paddingHorizontal: spacing.xl,
        marginTop: spacing.lg,
    },
    resultsTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    mainResultCard: {
        alignItems: 'center',
        paddingVertical: spacing.xxl,
        marginBottom: spacing.lg,
        ...shadows.accent,
    },
    mainResultLabel: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold,
        color: colors.accent[500],
        letterSpacing: 1,
        marginBottom: spacing.sm,
    },
    mainResultValue: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.extrabold,
        color: colors.accent[500],
        marginBottom: spacing.lg,
    },
    mainResultStats: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
        paddingTop: spacing.lg,
        width: '100%',
    },
    mainResultStat: {
        flex: 1,
        alignItems: 'center',
    },
    mainResultStatValue: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    mainResultStatLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    mainResultDivider: {
        width: 1,
        backgroundColor: colors.border.default,
    },
    breakdownGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    breakdownCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    breakdownValue: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginTop: spacing.md,
    },
    breakdownLabel: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    breakdownSubtext: {
        fontSize: fontSize.xs,
        color: colors.success[500],
        fontWeight: fontWeight.semibold,
        marginTop: spacing.xs,
    },
    summaryCard: {
        marginBottom: spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    summaryLabel: {
        fontSize: fontSize.sm,
        color: colors.text.muted,
    },
    summaryValue: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    disclaimer: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
    },
});
