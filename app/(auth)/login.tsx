import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';
import { Button, TextInput } from '@/components/ui';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }

        // Demo credentials
        const DEMO_EMAIL = 'demo@pasiflow.com';
        const DEMO_PASSWORD = 'demo123';

        if (email.toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
            setError('Geçersiz e-posta veya şifre.\n\nDemo: demo@pasiflow.com / demo123');
            return;
        }

        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        setLoading(true);
        setError('');

        // Simulate login - replace with actual API call
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* Logo & Welcome */}
                    <View style={styles.headerSection}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Pasi</Text>
                            <Text style={styles.logoAccent}>flow</Text>
                        </View>
                        <Text style={styles.welcomeTitle}>Hoş Geldiniz</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Yatırım portföyünüze erişmek için giriş yapın
                        </Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formSection}>
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <TextInput
                            label="E-posta"
                            placeholder="ornek@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon="mail-outline"
                        />

                        <TextInput
                            label="Şifre"
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon="lock-closed-outline"
                        />

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
                        </TouchableOpacity>

                        <Button
                            title={loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            onPress={handleLogin}
                            loading={loading}
                            size="lg"
                            style={styles.loginButton}
                        />
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Hesabınız yok mu?</Text>
                        <Link href="/(auth)/register" asChild>
                            <TouchableOpacity>
                                <Text style={styles.registerLink}>Kayıt Olun</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>

                    {/* Support */}
                    <TouchableOpacity style={styles.supportButton}>
                        <Text style={styles.supportText}>Yardıma mı ihtiyacınız var? Destek Alın</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary[900],
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        justifyContent: 'center',
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: spacing.giant,
    },
    logoContainer: {
        flexDirection: 'row',
        marginBottom: spacing.xxl,
    },
    logoText: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    logoAccent: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold,
        color: colors.accent[500],
    },
    welcomeTitle: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    welcomeSubtitle: {
        fontSize: fontSize.base,
        color: colors.text.muted,
        textAlign: 'center',
    },
    formSection: {
        marginBottom: spacing.xxl,
    },
    errorContainer: {
        backgroundColor: `${colors.error[500]}20`,
        borderWidth: 1,
        borderColor: colors.error[500],
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    errorText: {
        color: colors.error[500],
        fontSize: fontSize.sm,
        textAlign: 'center',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: spacing.xxl,
    },
    forgotPasswordText: {
        color: colors.accent[500],
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
    },
    loginButton: {
        marginTop: spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xxl,
    },
    footerText: {
        color: colors.text.muted,
        fontSize: fontSize.base,
    },
    registerLink: {
        color: colors.accent[500],
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold,
    },
    supportButton: {
        alignItems: 'center',
    },
    supportText: {
        color: colors.text.muted,
        fontSize: fontSize.sm,
    },
});
