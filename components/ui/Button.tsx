import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
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
    textStyle?: TextStyle;
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
    textStyle,
}: ButtonProps) {
    const isDisabled = disabled || loading;

    const handlePress = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={isDisabled}
            activeOpacity={0.8}
            style={[
                styles.base,
                styles[variant],
                styles[`${size}Size`],
                isDisabled && styles.disabled,
                variant === 'primary' && shadows.float,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? colors.text.inverse : colors.primary[600]}
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
                            icon ? { marginLeft: 8 } : undefined,
                            textStyle,
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

    // Variants - COSMIC THEME
    primary: {
        backgroundColor: colors.accent.gradientStart,
        ...shadows.float,
    },
    secondary: {
        backgroundColor: colors.background.subtle,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary[600],
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Sizes
    smSize: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    mdSize: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    lgSize: {
        paddingVertical: 20,
        paddingHorizontal: 40,
    },

    // Text
    text: {
        fontWeight: fontWeight.bold as any,
    },
    primaryText: {
        color: colors.text.primary,
    },
    secondaryText: {
        color: colors.accent.cyan,
    },
    outlineText: {
        color: colors.primary[600],
    },
    ghostText: {
        color: colors.primary[600],
    },

    // Text sizes
    smText: {
        fontSize: fontSize.sm,
    },
    mdText: {
        fontSize: fontSize.base,
    },
    lgText: {
        fontSize: fontSize.lg,
    },

    disabled: {
        opacity: 0.5,
        shadowOpacity: 0,
    },
});
