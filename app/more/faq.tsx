import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const FAQ_ITEMS = [
    {
        question: 'Pasiflow sistemi nasıl çalışır?',
        answer: 'Pasiflow, ABD\'deki gayrimenkulleri tokenize ederek veya doğrudan yatırım imkanı sağlayarak, sizin adınıza mülk yönetimi yapar. Kira gelirleriniz düzenli olarak, masraflar düşüldükten sonra hesabınıza aktarılır.'
    },
    {
        question: 'Minimum yatırım tutarı nedir?',
        answer: 'Pasiflow ile yatırım yapmaya başlamak için minimum tutar mülk tipine göre değişmekle birlikte, genellikle $1,000 gibi düşük bir bütçeyle başlayabilirsiniz.'
    },
    {
        question: 'Kira garantisi ne anlama geliyor?',
        answer: 'Seçili mülklerimizde, kiracı çıkması veya ödeme yapmaması durumunda bile kira ödemeleriniz sigorta fonumuz tarafından karşılanır ve gelir kaybı yaşamazsınız.'
    },
    {
        question: 'Vergi süreçleri nasıl işliyor?',
        answer: 'Pasiflow, tüm vergi beyan süreçlerinizde size rehberlik eder. ABD ve Türkiye arasındaki çifte vergilendirmeyi önleme anlaşması kapsamında avantajlı vergi oranlarından yararlanmanızı sağlıyoruz.'
    },
    {
        question: 'Paramı ne zaman çekebilirim?',
        answer: 'Kira gelirlerinizi dilediğiniz zaman çekebilirsiniz. Ana para (mülk hissesi) satışı için ise ikincil piyasamızı kullanabilir veya belirli dönemlerde çıkış yapabilirsiniz.'
    }
];

export default function FAQScreen() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <LinearGradient
            colors={[colors.background.main, colors.primary[900]]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sıkça Sorulan Sorular</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {FAQ_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.faqItem,
                                expandedIndex === index && styles.faqItemExpanded
                            ]}
                            onPress={() => toggleExpand(index)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.questionRow}>
                                <Text style={styles.questionText}>{item.question}</Text>
                                <Ionicons
                                    name={expandedIndex === index ? "remove-circle" : "add-circle"}
                                    size={24}
                                    color={expandedIndex === index ? colors.accent.cyan : colors.text.tertiary}
                                />
                            </View>
                            {expandedIndex === index && (
                                <View style={styles.answerContainer}>
                                    <Text style={styles.answerText}>{item.answer}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    headerTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    content: {
        padding: spacing.xl,
    },
    faqItem: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        overflow: 'hidden',
    },
    faqItemExpanded: {
        borderColor: colors.accent.cyan,
        backgroundColor: 'rgba(34, 211, 238, 0.05)',
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
    },
    questionText: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold as any,
        color: colors.text.primary,
        flex: 1,
        marginRight: spacing.md,
    },
    answerContainer: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    answerText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
    }
});
