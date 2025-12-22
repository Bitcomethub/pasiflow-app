import React, { useState } from 'react';
import {
    View,
    TextInput as RNTextInput,
    Text,
    StyleSheet,
    TextInputProps as RNTextInputProps,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '@/lib/theme';

interface TextInputProps extends RNTextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
}

export function TextInput({
    label,
    error,
    icon,
    rightIcon,
    onRightIconPress,
    secureTextEntry,
    style,
    ...props
}: TextInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPassword = secureTextEntry !== undefined;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    error && styles.inputContainerError,
                ]}
            >
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={isFocused ? colors.accent[500] : colors.text.muted}
                        style={styles.leftIcon}
                    />
                )}

                <RNTextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.text.muted}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...props}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.rightIconButton}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.text.muted}
                        />
                    </TouchableOpacity>
                )}

                {rightIcon && !isPassword && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        style={styles.rightIconButton}
                        disabled={!onRightIconPress}
                    >
                        <Ionicons
                            name={rightIcon}
                            size={20}
                            color={colors.text.muted}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    label: {
        color: colors.text.primary,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        marginBottom: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary[800],
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
        paddingHorizontal: spacing.lg,
    },
    inputContainerFocused: {
        borderColor: colors.accent[500],
        backgroundColor: colors.primary[900],
    },
    inputContainerError: {
        borderColor: colors.error[500],
    },
    leftIcon: {
        marginRight: spacing.md,
    },
    input: {
        flex: 1,
        color: colors.text.primary,
        fontSize: fontSize.base,
        paddingVertical: spacing.lg,
    },
    rightIconButton: {
        padding: spacing.sm,
        marginLeft: spacing.sm,
    },
    error: {
        color: colors.error[500],
        fontSize: fontSize.xs,
        marginTop: spacing.xs,
        marginLeft: spacing.xs,
    },
});
