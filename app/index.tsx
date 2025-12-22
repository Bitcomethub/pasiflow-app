import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, borderRadius } from '@/lib/theme';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const textAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        SplashScreen.hideAsync();

        Animated.sequence([
            // 1. Fade In & Scale Up Logo
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Fade In Text
            Animated.timing(textAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            // 3. Hold
            Animated.delay(1500),
        ]).start(() => {
            router.replace('/(auth)/login');
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[colors.background.main, '#0F172A']}
                style={styles.background}
            />

            <View style={styles.content}>
                <Animated.View style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}>
                    <LinearGradient
                        colors={[colors.accent.gradientStart, colors.accent.gradientEnd]}
                        style={styles.logoBox}
                    >
                        <Ionicons name="checkmark-sharp" size={70} color="white" style={styles.icon} />
                    </LinearGradient>
                </Animated.View>

                <Animated.View style={{ opacity: textAnim }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Pasi</Text>
                        <Text style={styles.titleAccent}>flow</Text>
                    </View>
                    <Text style={styles.subtitle}>Geleceğin Yatırımı</Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.main,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
    },
    logoContainer: {
        shadowColor: colors.accent.cyan,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    logoBox: {
        width: 120,
        height: 120,
        borderRadius: borderRadius.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    icon: {
        transform: [{ rotate: '-5deg' }]
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 42,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -1,
    },
    titleAccent: {
        fontSize: 42,
        fontWeight: fontWeight.bold as any,
        color: '#F59E0B',
        letterSpacing: -1,
    },
    subtitle: {
        marginTop: 8,
        fontSize: fontSize.base,
        color: colors.text.tertiary,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});
