import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput as RNTextInput,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Button } from '@/components/ui';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);

    const handleLogin = async () => {
        Keyboard.dismiss();

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError('Lütfen tüm alanları doldurun');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        const DEMO_EMAIL = 'demo@pasiflow.com';
        const DEMO_PASSWORD = 'demo123';

        if (trimmedEmail !== DEMO_EMAIL || trimmedPassword !== DEMO_PASSWORD) {
            setError('Geçersiz e-posta veya şifre.\n\nDemo Bilgileri:\n📧 demo@pasiflow.com\n🔑 demo123');
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
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/(tabs)');
        }, 800);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
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
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <TouchableWithoutFeedback onPress={dismissKeyboard}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                        >
                            <View style={styles.content}>
                                {/* Header */}
                                <View style={styles.header}>
                                    <View style={styles.logoContainer}>
                                        <Image
                                            source={require('../../assets/images/pasiflow-logo.png')}
                                            style={styles.logo}
                                        />
                                    </View>
                                    <Text style={styles.subtitle}>Portföyünüze Hoş Geldiniz</Text>
                                </View>

                                {/* Login Card */}
                                <View style={styles.cardContainer}>
                                    {error ? (
                                        <View style={styles.errorContainer}>
                                            <Text style={styles.errorText}>{error}</Text>
                                        </View>
                                    ) : null}

                                    {/* Email Input */}
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>E-posta Adresi</Text>
                                        <View style={[
                                            styles.inputContainer,
                                            emailFocused && styles.inputContainerFocused
                                        ]}>
                                            <Ionicons
                                                name="mail-outline"
                                                size={20}
                                                color={emailFocused ? colors.accent.cyan : colors.text.tertiary}
                                                style={styles.inputIcon}
                                            />
                                            <RNTextInput
                                                ref={emailRef}
                                                style={styles.input}
                                                placeholder="ornek@email.com"
                                                placeholderTextColor={colors.text.tertiary}
                                                value={email}
                                                onChangeText={setEmail}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                onFocus={() => setEmailFocused(true)}
                                                onBlur={() => setEmailFocused(false)}
                                                returnKeyType="next"
                                                onSubmitEditing={() => passwordRef.current?.focus()}
                                                blurOnSubmit={false}
                                            />
                                        </View>
                                    </View>

                                    {/* Password Input */}
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>Şifre</Text>
                                        <View style={[
                                            styles.inputContainer,
                                            passwordFocused && styles.inputContainerFocused
                                        ]}>
                                            <Ionicons
                                                name="lock-closed-outline"
                                                size={20}
                                                color={passwordFocused ? colors.accent.cyan : colors.text.tertiary}
                                                style={styles.inputIcon}
                                            />
                                            <RNTextInput
                                                ref={passwordRef}
                                                style={styles.input}
                                                placeholder="••••••••"
                                                placeholderTextColor={colors.text.tertiary}
                                                value={password}
                                                onChangeText={setPassword}
                                                secureTextEntry={!showPassword}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                onFocus={() => setPasswordFocused(true)}
                                                onBlur={() => setPasswordFocused(false)}
                                                returnKeyType="done"
                                                onSubmitEditing={handleLogin}
                                            />
                                            <TouchableOpacity
                                                onPress={() => setShowPassword(!showPassword)}
                                                style={styles.eyeButton}
                                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                            >
                                                <Ionicons
                                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                                    size={20}
                                                    color={colors.text.tertiary}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

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
                                </View>

                                {/* Footer */}
                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Henüz üye değil misiniz?</Text>
                                    <Link href="/(auth)/register" asChild>
                                        <TouchableOpacity>
                                            <Text style={styles.registerLink}>Hesap Oluşturun</Text>
                                        </TouchableOpacity>
                                    </Link>
                                </View>

                                {/* Agent Login Link */}
                                <TouchableOpacity
                                    onPress={() => router.push('/agent/dashboard')}
                                    style={styles.agentLoginButton}
                                >
                                    <Text style={styles.agentLoginText}>Acente Girişi</Text>
                                    <Ionicons name="briefcase-outline" size={16} color={colors.text.tertiary} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
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
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
    },
    content: {
        paddingHorizontal: spacing.xl,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    logoContainer: {
        marginBottom: spacing.md,
    },
    logo: {
        width: 260,
        height: 85,
        resizeMode: 'contain',
    },
    subtitle: {
        fontSize: fontSize.lg,
        color: colors.text.secondary,
        fontWeight: fontWeight.medium as any,
    },
    cardContainer: {
        backgroundColor: colors.background.card,
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
    inputGroup: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        color: colors.text.primary,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold as any,
        marginBottom: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingHorizontal: spacing.md,
        height: 52,
    },
    inputContainerFocused: {
        backgroundColor: colors.background.card,
        borderColor: colors.accent.cyan,
        ...shadows.glow,
    },
    inputIcon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        color: colors.text.primary,
        fontSize: fontSize.base,
        paddingVertical: 0,
    },
    eyeButton: {
        padding: spacing.xs,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: spacing.xl,
    },
    forgotPasswordText: {
        color: colors.accent.cyan,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold as any,
    },
    loginButton: {
        backgroundColor: colors.accent.gradientStart,
        ...shadows.glow,
    },
    footer: {
        marginTop: spacing.xl,
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
    agentLoginButton: {
        marginTop: spacing.xl,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
        gap: spacing.xs,
        opacity: 0.7,
    },
    agentLoginText: {
        color: colors.text.tertiary,
        fontSize: fontSize.sm,
    }
});
