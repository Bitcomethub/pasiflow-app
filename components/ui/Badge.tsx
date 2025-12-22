import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, fontSize, fontWeight, borderRadius } from '@/lib/theme';

interface BadgeProps {
    label: string;
    color?: string;
    style?: ViewStyle;
}

export function Badge({ label, color = colors.primary[500], style }: BadgeProps) {
    return (
        <View style={[
            styles.container,
            { backgroundColor: `${color}20`, borderColor: `${color}40` }, // Transparent bg with border
            style
        ]}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={[styles.text, { color: color }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
        borderWidth: 1,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold as any,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    }
});
