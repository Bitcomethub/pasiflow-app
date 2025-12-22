import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '@/lib/theme';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'accent' | 'success' | 'warning';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    style?: ViewStyle;
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
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    elevated: {
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.light,
    },
    accent: {
        backgroundColor: `${colors.accent[500]}15`,
        borderWidth: 1,
        borderColor: `${colors.accent[500]}30`,
    },
    success: {
        backgroundColor: `${colors.success[500]}15`,
        borderWidth: 1,
        borderColor: `${colors.success[500]}30`,
    },
    warning: {
        backgroundColor: `${colors.warning[500]}15`,
        borderWidth: 1,
        borderColor: `${colors.warning[500]}30`,
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
