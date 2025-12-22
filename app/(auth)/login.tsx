import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Button, TextInput } from '@/components/ui';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Lütfen tüm alanları doldurun');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        const DEMO_EMAIL = 'demo@pasiflow.com';
        const DEMO_PASSWORD = 'demo123';

        if (email.toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
            setError('Geçersiz e-posta veya şifre.\n\nDemo: demo@pasiflow.com / demo123');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        setLoading(true);
        setError('');

        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1000);
    };

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
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Text style={styles.logoText}>Pasiflow</Text>
                            </View>
                            <Text style={styles.subtitle}>Portföyünüze Hoş Geldiniz</Text>
                        </View>

                        {/* Login Card */}
                        <LinearGradient
                            colors={[colors.background.card, 'rgba(19, 19, 43, 0.8)']}
                            style={styles.cardContainer}
                        >
                            {error ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            ) : null}

                            <TextInput
                                label="E-posta Adresi"
                                placeholder="ornek@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon="mail-outline"
                                placeholderTextColor={colors.text.tertiary}
                            />

                            <TextInput
                                label="Şifre"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                icon="lock-closed-outline"
                                placeholderTextColor={colors.text.tertiary}
                            />

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
                            </TouchableOpacity>

                            <Button
                                title={loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                                onPress={handleLogin}
                                loading={loading}
                                size="lg"
                                style={styles.loginButton}
                                textStyle={{ color: colors.text.primary, fontWeight: 'bold' }}
                            />
                        </LinearGradient>

                        {/* Footer - Social Proof / Register */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Henüz üye değil misiniz?</Text>
                            <Link href="/(auth)/register" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.registerLink}>Hesap Oluşturun</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
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
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: spacing.xxl,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.giant,
    },
    logoContainer: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    logoText: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -1,
        textShadowColor: colors.accent.cyan,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15, // Neon glow effect
    },
    subtitle: {
        fontSize: fontSize.lg,
        color: colors.text.secondary,
        fontWeight: fontWeight.medium as any,
    },
    cardContainer: {
        borderRadius: borderRadius.xxl,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border.highlight,
        ...shadows.float,
    },
    errorContainer: {
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderLeftWidth: 4,
        borderLeftColor: colors.error,
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderRadius: borderRadius.sm,
    },
    errorText: {
        color: colors.error,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium as any,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -spacing.sm,
        marginBottom: spacing.xl,
    },
    forgotPasswordText: {
        color: colors.accent.cyan,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold as any,
    },
    loginButton: {
        marginTop: spacing.sm,
        backgroundColor: colors.accent.gradientStart,
        ...shadows.glow,
    },
    footer: {
        marginTop: spacing.giant,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xs,
    },
    footerText: {
        color: colors.text.secondary,
        fontSize: fontSize.base,
    },
    registerLink: {
        color: colors.accent.cyan,
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
    },
});
