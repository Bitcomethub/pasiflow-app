import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';

export default function PrivacyScreen() {
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
                    <Text style={styles.headerTitle}>Gizlilik Politikası</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.lastUpdated}>Son Güncelleme: 22 Aralık 2025</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Veri Toplama</Text>
                        <Text style={styles.sectionText}>
                            Pasiflow olarak, hizmetlerimizi size en iyi şekilde sunabilmek için adınız, iletişim bilgileriniz, finansal durumunuz ve yatırım tercihleriniz gibi kişisel verilerinizi topluyoruz. Bu veriler, yatırım süreçlerini yönetmek ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. Veri Kullanımı</Text>
                        <Text style={styles.sectionText}>
                            Topladığımız veriler şu amaçlarla işlenir:
                            {'\n'}• Hesap oluşturma ve kimlik doğrulama
                            {'\n'}• Yatırım işlemlerinin gerçekleştirilmesi
                            {'\n'}• Kira ödemelerinin takibi ve raporlanması
                            {'\n'}• Müşteri hizmetleri desteği sağlanması
                            {'\n'}• Yasal bildirimlerin yapılması
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. Veri Güvenliği</Text>
                        <Text style={styles.sectionText}>
                            Verileriniz, endüstri standardı şifreleme teknolojileri (SSL/TLS) ile korunmaktadır. Sunucularımız, yetkisiz erişime karşı katı güvenlik protokolleri ile izlenmektedir.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. Üçüncü Taraflar</Text>
                        <Text style={styles.sectionText}>
                            Kişisel verileriniz, yasal zorunluluklar veya hizmetin ifası (örneğin: ödeme işleyicileri, emlak yönetim firmaları) dışında üçüncü taraflarla paylaşılmaz.
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
