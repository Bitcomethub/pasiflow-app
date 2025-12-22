/**
 * Pasiflow Design System
 * Based on website design: Navy + Amber + Green
 */

export const colors = {
    // Primary - Deep Navy/Slate
    primary: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A', // Main background
        950: '#020617',
    },

    // Accent - Amber/Orange (Pasiflow brand)
    accent: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B', // Main accent
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
    },

    // Success - Green (for rent received, positive stats)
    success: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E', // Main success
        600: '#16A34A',
        700: '#15803D',
    },

    // Warning - Orange (for pending, attention needed)
    warning: {
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
    },

    // Error - Red (for late rent, issues)
    error: {
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
    },

    // Neutrals
    white: '#FFFFFF',
    black: '#000000',

    // Background gradients reference
    background: {
        dark: '#0F172A',
        card: '#1E293B',
        cardHover: '#334155',
        overlay: 'rgba(15, 23, 42, 0.8)',
    },

    // Text colors
    text: {
        primary: '#F8FAFC',
        secondary: '#94A3B8',
        muted: '#64748B',
        inverse: '#0F172A',
    },

    // Border colors
    border: {
        default: '#334155',
        light: '#475569',
        accent: '#F59E0B',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    giant: 48,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
};

export const fontSize = {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    display: 48,
};

export const fontWeight = {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    accent: {
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
};

// Status colors for rent tracker
export const rentStatus = {
    expected: colors.warning[500],
    received: colors.success[500],
    late: colors.error[500],
};

// Property status colors
export const propertyStatus = {
    occupied: colors.success[500],
    vacancy: colors.warning[500],
    turnover: colors.accent[500],
};

export default {
    colors,
    spacing,
    borderRadius,
    fontSize,
    fontWeight,
    shadows,
    rentStatus,
    propertyStatus,
};
