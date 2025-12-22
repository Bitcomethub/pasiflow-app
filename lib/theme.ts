// Cosmic Glass Theme
// A futuristic, deep gradient aesthetic with neon accents and glassmorphism

export const colors = {
    // Brand Colors - Deep Cosmos & Neon
    primary: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8', // Sky Blue Neon
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0F172A', // Deep Midnight (Base)
    },
    // Accent - High Energy
    accent: {
        500: '#F472B6', // Neon Pink
        600: '#DB2777',
        cyan: '#22D3EE', // Electric Cyan
        purple: '#C084FC', // Electric Purple
        gradientStart: '#4F46E5', // Indigo
        gradientEnd: '#9333EA', // Purple
    },
    // Backgrounds - Deep & Glassy
    background: {
        main: '#0B0B15', // Deep Blue/Black (Void)
        card: '#13132B', // Slightly lighter deep blue
        subtle: '#1C1C35', // Section backgrounds
        glass: 'rgba(30, 30, 60, 0.7)', // Glass effect base
        modal: 'rgba(10, 10, 20, 0.95)',
    },
    // Text - Glowing & crisp
    text: {
        primary: '#FFFFFF', // Pure White
        secondary: '#94A3B8', // Blue-Gray
        tertiary: '#64748B', // Muted Blue
        inverse: '#000000',
        glow: '#E0E7FF', // Slight blue tint for glowing text
    },
    // Status
    success: '#34D399', // Emerald Neon
    warning: '#FBBF24', // Amber Neon
    error: '#F87171', // Red Neon
    info: '#60A5FA',
    // Borders
    border: {
        default: '#2D2D44', // Dark border
        subtle: '#1E1E2E',
        highlight: 'rgba(255, 255, 255, 0.15)', // Glass border
    }
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    giant: 32,
    section: 48,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
};

export const fontSize = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    details: 32,
    display: 40,
};

export const fontWeight = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
};

// Cosmic Shadows & Glows
export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 10,
    },
    float: {
        shadowColor: '#4F46E5', // Indigo Glow
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    glow: {
        shadowColor: '#22D3EE', // Cyan Glow
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 5,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
    }
};

export const propertyStatus = {
    occupied: colors.success,
    vacancy: colors.error,
    turnover: colors.warning,
};
