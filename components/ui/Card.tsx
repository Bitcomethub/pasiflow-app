import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '@/lib/theme';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'accent' | 'success' | 'warning';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    style?: StyleProp<ViewStyle>;
}

export function Card({
    children,
    variant = 'default',
    padding = 'md',
    style,
}: CardProps) {
    return (
        <View
            style={[
                styles.base,
                styles[variant],
                styles[`${padding}Padding`],
                variant === 'elevated' && shadows.lg,
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },

    // Variants
    default: {
        backgroundColor: colors.background.card,
        ...shadows.sm, // Soft base shadow
        borderWidth: 0,
    },
    elevated: {
        backgroundColor: colors.background.card,
        ...shadows.lg, // High elevation
        borderWidth: 0,
    },
    accent: {
        backgroundColor: colors.primary[50],
        borderWidth: 1,
        borderColor: colors.primary[100],
    },
    success: {
        backgroundColor: '#ECFDF5',
        borderWidth: 1,
        borderColor: colors.success,
    },
    warning: {
        backgroundColor: '#FFFBEB',
        borderWidth: 1,
        borderColor: colors.warning,
    },

    // Padding
    nonePadding: {
        padding: 0,
    },
    smPadding: {
        padding: spacing.md,
    },
    mdPadding: {
        padding: spacing.lg,
    },
    lgPadding: {
        padding: spacing.xxl,
    },
});
