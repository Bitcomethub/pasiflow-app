import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';

export default function TermsScreen() {
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
                    <Text style={styles.headerTitle}>Kullanım Koşulları</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.lastUpdated}>Son Güncelleme: 22 Aralık 2025</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Kabul Edilme</Text>
                        <Text style={styles.sectionText}>
                            Pasiflow uygulamasını indirerek veya kullanarak, bu Kullanım Koşulları'nı kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayınız.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. Yatırım Riskleri</Text>
                        <Text style={styles.sectionText}>
                            Gayrimenkul yatırımları belirli riskler içerir. Geçmiş performans, gelecek sonuçların garantisi değildir. Mülk değerleri artabilir veya azalabilir. Kullanıcılar, yatırım kararlarını kendi risk değerlendirmelerine göre vermelidir.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. Hesap Güvenliği</Text>
                        <Text style={styles.sectionText}>
                            Hesap bilgilerinizin ve şifrenizin güvenliğinden siz sorumlusunuz. Hesabınızla yapılan tüm işlemlerden sorumlu olduğunuzu kabul edersiniz.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. Hizmet Değişiklikleri</Text>
                        <Text style={styles.sectionText}>
                            Pasiflow, sunduğu hizmetleri, özellikleri veya arayüzü önceden bildirmeksizin değiştirme veya sonlandırma hakkını saklı tutar.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. İletişim</Text>
                        <Text style={styles.sectionText}>
                            Kullanım koşulları ile ilgili sorularınız için legal@pasiflow.com adresinden bizimle iletişime geçebilirsiniz.
                        </Text>
                    </View>
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
        paddingBottom: spacing.section,
    },
    lastUpdated: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    sectionText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 22,
    }
});
