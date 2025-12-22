import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors, borderRadius, fontSize, fontWeight, shadows } from '@/lib/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    style,
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
            style={[
                styles.base,
                styles[variant],
                styles[`${size}Size`],
                isDisabled && styles.disabled,
                variant === 'primary' && shadows.accent,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? colors.white : colors.accent[500]}
                    size="small"
                />
            ) : (
                <>
                    {icon && icon}
                    <Text
                        style={[
                            styles.text,
                            styles[`${variant}Text`],
                            styles[`${size}Text`],
                            icon && { marginLeft: 8 },
                        ]}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
    },

    // Variants
    primary: {
        backgroundColor: colors.accent[500],
    },
    secondary: {
        backgroundColor: colors.primary[700],
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.accent[500],
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Sizes
    smSize: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    mdSize: {
        paddingVertical: 14,
        paddingHorizontal: 24,
    },
    lgSize: {
        paddingVertical: 18,
        paddingHorizontal: 32,
    },

    // Text
    text: {
        fontWeight: fontWeight.bold,
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.white,
    },
    outlineText: {
        color: colors.accent[500],
    },
    ghostText: {
        color: colors.accent[500],
    },

    // Text sizes
    smText: {
        fontSize: fontSize.sm,
    },
    mdText: {
        fontSize: fontSize.base,
    },
    lgText: {
        fontSize: fontSize.md,
    },

    disabled: {
        opacity: 0.5,
    },
});
