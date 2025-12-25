import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';

export default function AboutScreen() {
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
                    <Text style={styles.headerTitle}>Hakkımızda</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
                        <Image
                            source={require('../../assets/images/pasiflow-logo.png')}
                            style={{ width: 220, height: 70, resizeMode: 'contain' }}
                        />
                    </View>
                    <Text style={styles.brandSubtitle}>Kira Garantili Yatırım Sistemi</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionText}>
                            Pasiflow, gayrimenkul yatırımını herkes için erişilebilir, şeffaf ve güvenilir hale getirmeyi amaçlayan yeni nesil bir yatırım platformudur.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Vizyonumuz</Text>
                        <Text style={styles.sectionText}>
                            Amerika Birleşik Devletleri başta olmak üzere, dünyanın en güvenli ve yüksek getirili emlak piyasalarına doğrudan erişim sağlayarak, kullanıcılarımıza dolar bazlı pasif gelir imkanı sunuyoruz.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Neden Pasiflow?</Text>
                        <Text style={styles.sectionText}>
                            <Text style={styles.sectionText}>
                                • <Text style={styles.highlight}>Kira Garantisi:</Text> Mülkleriniz boş kalsa bile kiranız hesabınıza yatar.{'\n'}
                                • <Text style={styles.highlight}>Dolar Bazlı Getiri:</Text> Yatırımlarınız döviz bazında değerlenir.{'\n'}
                                • <Text style={styles.highlight}>Profesyonel Yönetim:</Text> Emlak yönetimi, bakım ve onarım süreçlerini biz üstleniyoruz.
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Nasıl Çalışır?</Text>
                        <View style={styles.stepItem}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Strateji & İlk Görüşme</Text>
                                <Text style={styles.stepText}>Finansal hedeflerinizi belirleyip size özel yatırım planı oluşturuyoruz.</Text>
                            </View>
                        </View>
                        <View style={styles.stepItem}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Ev Seçimi & Analiz</Text>
                                <Text style={styles.stepText}>Saha ekiplerimizin analizleriyle güçlü kira talep pazarlarında mülk seçimi.</Text>
                            </View>
                        </View>
                        <View style={styles.stepItem}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Satın Alma & Kapanış</Text>
                                <Text style={styles.stepText}>Online imza kolaylığı ile 3-5 gün içinde tapu devri.</Text>
                            </View>
                        </View>
                        <View style={styles.stepItem}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>4</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Yönetim & Kira</Text>
                                <Text style={styles.stepText}>Kiracı yönetimi ve 1. günden itibaren pasif gelir akışı.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Kurucu & İletişim</Text>
                        <Text style={styles.sectionText}>
                            Amerika'da yatırımın güvenilir adresi:{'\n'}
                            • <Text style={styles.highlight}>Erman Adanır</Text>{'\n'}
                            ✉️ erman.adanir@pasiflow.com{'\n'}
                            📞 +1 (302) 555-0123
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
    },
    brandTitle: {
        fontSize: 40,
        fontWeight: fontWeight.extrabold as any,
        color: colors.text.primary,
        textAlign: 'center',
        marginTop: spacing.lg,
        letterSpacing: 2,
    },
    brandSubtitle: {
        fontSize: fontSize.base,
        color: colors.accent.cyan,
        textAlign: 'center',
        marginBottom: spacing.section,
        letterSpacing: 1,
    },
    section: {
        marginBottom: spacing.xl,
        padding: spacing.lg,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    sectionText: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
        lineHeight: 24,
    },
    highlight: {
        color: colors.accent.cyan,
        fontWeight: fontWeight.bold as any,
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.accent.cyan,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
        marginTop: 2,
    },
    stepNumberText: {
        color: colors.background.main,
        fontWeight: fontWeight.bold as any,
        fontSize: 12,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    stepText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
    }
});
