import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
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
                    <Text style={styles.brandTitle}>PASIFLOW</Text>
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
                            • <Text style={styles.highlight}>Kira Garantisi:</Text> Mülkleriniz boş kalsa bile kiranız hesabınıza yatar.{'\n'}
                            • <Text style={styles.highlight}>Dolar Bazlı Getiri:</Text> Yatırımlarınız döviz bazında değerlenir.{'\n'}
                            • <Text style={styles.highlight}>Profesyonel Yönetim:</Text> Emlak yönetimi, bakım ve onarım süreçlerini biz üstleniyoruz.
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
    }
});
