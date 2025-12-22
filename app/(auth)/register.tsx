import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';
import { Button, TextInput } from '@/components/ui';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        setLoading(true);
        setError('');

        // Simulate registration - replace with actual API call
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.headerSection}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Pasi</Text>
                            <Text style={styles.logoAccent}>flow</Text>
                        </View>
                        <Text style={styles.welcomeTitle}>Hesap Oluşturun</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Yatırım yolculuğunuza başlamak için kayıt olun
                        </Text>
                    </View>

                    {/* Register Form */}
                    <View style={styles.formSection}>
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <TextInput
                            label="Ad Soyad"
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                            icon="person-outline"
                        />

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
                            label="Telefon (Opsiyonel)"
                            placeholder="+90 5XX XXX XX XX"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            icon="call-outline"
                        />

                        <TextInput
                            label="Şifre"
                            placeholder="En az 8 karakter"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon="lock-closed-outline"
                        />

                        <TextInput
                            label="Şifre Tekrar"
                            placeholder="Şifrenizi tekrar girin"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            icon="lock-closed-outline"
                        />

                        <Button
                            title={loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                            onPress={handleRegister}
                            loading={loading}
                            size="lg"
                            style={styles.registerButton}
                        />
                    </View>

                    {/* Terms */}
                    <Text style={styles.termsText}>
                        Kayıt olarak{' '}
                        <Text style={styles.termsLink}>Kullanım Şartları</Text>
                        {' '}ve{' '}
                        <Text style={styles.termsLink}>Gizlilik Politikası</Text>
                        'nı kabul etmiş olursunuz.
                    </Text>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Zaten hesabınız var mı?</Text>
                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.loginLink}>Giriş Yapın</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xxl,
        justifyContent: 'center',
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: spacing.xxxl,
    },
    logoContainer: {
        flexDirection: 'row',
        marginBottom: spacing.xl,
    },
    logoText: {
        fontSize: fontSize.xxxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    logoAccent: {
        fontSize: fontSize.xxxl,
        fontWeight: fontWeight.bold,
        color: colors.accent[500],
    },
    welcomeTitle: {
        fontSize: fontSize.xl,
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
        marginBottom: spacing.xl,
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
    registerButton: {
        marginTop: spacing.lg,
    },
    termsText: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        textAlign: 'center',
        marginBottom: spacing.xxl,
        lineHeight: 18,
    },
    termsLink: {
        color: colors.accent[500],
        fontWeight: fontWeight.semibold,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    footerText: {
        color: colors.text.muted,
        fontSize: fontSize.base,
    },
    loginLink: {
        color: colors.accent[500],
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold,
    },
});
