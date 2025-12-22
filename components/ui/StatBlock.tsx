import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '@/lib/theme';

interface StatBlockProps {
    label: string;
    value: string;
    highlight?: boolean;
    style?: ViewStyle;
}

export function StatBlock({ label, value, highlight = false, style }: StatBlockProps) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[
                styles.value,
                highlight && styles.highlightValue
            ]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: 4,
        fontWeight: fontWeight.medium as any,
    },
    value: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    highlightValue: {
        color: colors.accent.cyan,
        textShadowColor: 'rgba(34, 211, 238, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    }
});
