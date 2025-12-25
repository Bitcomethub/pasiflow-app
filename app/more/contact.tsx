import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';
import { Button } from '@/components/ui';

export default function ContactScreen() {
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
                    <Text style={styles.headerTitle}>İletişime Geç</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.introText}>
                        Sorularınız mı var? Ekibimiz size yardımcı olmaktan mutluluk duyar.
                    </Text>

                    <View style={styles.formCard}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Ad Soyad</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Adınız"
                                placeholderTextColor={colors.text.tertiary}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>E-posta</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ornek@email.com"
                                placeholderTextColor={colors.text.tertiary}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mesajınız</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Nasıl yardımcı olabiliriz?"
                                placeholderTextColor={colors.text.tertiary}
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Gönder</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactInfo}>
                        <View style={styles.infoItem}>
                            <Ionicons name="mail-outline" size={24} color={colors.accent.cyan} />
                            <Text style={styles.infoText}>erman.adanir@pasiflow.com</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="call-outline" size={24} color={colors.accent.cyan} />
                            <Text style={styles.infoText}>+1 (302) 555-0123</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="location-outline" size={24} color={colors.accent.cyan} />
                            <Text style={styles.infoText}>Delaware, USA</Text>
                        </View>
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
    introText: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    formCard: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        marginBottom: spacing.xl,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: fontSize.sm,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
        fontWeight: fontWeight.bold as any,
    },
    input: {
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        color: colors.text.primary,
        fontSize: fontSize.base,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: colors.accent.gradientStart,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        marginTop: spacing.sm,
        shadowColor: colors.accent.gradientStart,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        color: colors.text.primary,
        fontWeight: fontWeight.bold as any,
        fontSize: fontSize.base,
    },
    contactInfo: {
        gap: spacing.md,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    infoText: {
        color: colors.text.primary,
        fontSize: fontSize.base,
    }
});
