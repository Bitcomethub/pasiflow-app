import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Button } from '@/components/ui';

export default function Register() {
    return (
        <LinearGradient
            colors={[colors.background.main, colors.primary[900]]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                        </TouchableOpacity>

                        <Text style={styles.title}>Hesap Oluştur</Text>
                        <Text style={styles.subtitle}>Geleceğin yatırım dünyasına adım atın.</Text>

                        {/* Social Login */}
                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={24} color={colors.text.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-apple" size={24} color={colors.text.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>veya e-posta ile</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Ad Soyad</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Adınız Soyadınız"
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
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Şifre</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    placeholderTextColor={colors.text.tertiary}
                                    secureTextEntry
                                />
                            </View>

                            <Button
                                title="Kayıt Ol"
                                onPress={() => router.replace('/(tabs)')}
                                style={styles.signupButton}
                                textStyle={{ color: colors.text.primary, fontWeight: 'bold' }}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Zaten hesabınız var mı? </Text>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.loginLink}>Giriş Yap</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xl,
        paddingBottom: spacing.section,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.card,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    title: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.sm,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
        marginBottom: spacing.section,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: spacing.lg,
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.xl,
        backgroundColor: colors.background.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border.subtle,
    },
    dividerText: {
        fontSize: fontSize.sm,
        color: colors.text.tertiary,
    },
    form: {
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },
    inputGroup: {
        gap: spacing.xs,
    },
    label: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.secondary,
        marginLeft: 4,
    },
    input: {
        height: 56,
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        color: colors.text.primary,
        fontSize: fontSize.base,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    signupButton: {
        marginTop: spacing.md,
        backgroundColor: colors.accent.gradientStart,
        ...shadows.glow,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    footerText: {
        color: colors.text.secondary,
        fontSize: fontSize.base,
    },
    loginLink: {
        color: colors.accent.cyan,
        fontWeight: fontWeight.bold as any,
        fontSize: fontSize.base,
    },
});
