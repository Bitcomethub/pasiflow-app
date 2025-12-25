import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSize, fontWeight } from '@/lib/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(30)).current;
    const screenOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Logo animation sequence
        Animated.sequence([
            // 1. Logo fades in and scales up
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.exp),
                }),
                Animated.spring(logoScale, {
                    toValue: 1,
                    friction: 4,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Text slides up and fades in
            Animated.parallel([
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.back(1.5)),
                }),
            ]),
            // 3. Hold for a moment
            Animated.delay(800),
            // 4. Fade out entire screen
            Animated.timing(screenOpacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Navigate to login after animation
            router.replace('/(auth)/login');
        });
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
            <LinearGradient
                colors={[colors.background.main, '#0F172A', colors.primary[900]]}
                style={styles.gradient}
            >
                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: logoOpacity,
                            transform: [{ scale: logoScale }],
                        },
                    ]}
                >
                    <View style={styles.logoWrapper}>
                        <Image
                            source={require('../assets/images/pasiflow-logo.png')}
                            style={styles.logo}
                        />
                    </View>
                </Animated.View>

                {/* Tagline */}
                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            opacity: textOpacity,
                            transform: [{ translateY: textTranslateY }],
                        },
                    ]}
                >
                    <Text style={styles.tagline}>Geleceğin Yatırımı</Text>
                    <View style={styles.underline} />
                </Animated.View>

                {/* Decorative glow orbs */}
                <View style={styles.glowOrb1} />
                <View style={styles.glowOrb2} />
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    textContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tagline: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: 2,
        textTransform: 'uppercase',
        textShadowColor: colors.accent.cyan,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    underline: {
        width: 100,
        height: 3,
        backgroundColor: colors.accent.cyan,
        marginTop: 12,
        borderRadius: 2,
        shadowColor: colors.accent.cyan,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    glowOrb1: {
        position: 'absolute',
        top: height * 0.15,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.accent.cyan,
        opacity: 0.1,
    },
    glowOrb2: {
        position: 'absolute',
        bottom: height * 0.2,
        right: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: colors.accent.purple,
        opacity: 0.08,
    },
});
