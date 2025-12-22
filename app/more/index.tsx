import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';

export default function MenuScreen() {
    const handlePress = (route?: string) => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        if (route) {
            router.push(route as any);
        }
    };

    const menuGroups = [
        {
            title: 'HESAP',
            items: [
                { icon: 'person-outline', label: 'Profilim', route: '/(tabs)/profile' }, // Just a placeholder route
                { icon: 'card-outline', label: 'Ödeme Yöntemleri', route: '' },
                { icon: 'notifications-outline', label: 'Bildirimler', route: '' },
            ]
        },
        {
            title: 'DESTEK & BİLGİ',
            items: [
                { icon: 'information-circle-outline', label: 'Hakkımızda', route: '/more/about' },
                { icon: 'help-circle-outline', label: 'Sıkça Sorulan Sorular', route: '/more/faq' },
                { icon: 'mail-outline', label: 'İletişime Geç', route: '/more/contact' },
            ]
        },
        {
            title: 'YASAL',
            items: [
                { icon: 'shield-checkmark-outline', label: 'Gizlilik Politikası', route: '/more/privacy' },
                { icon: 'document-text-outline', label: 'Kullanım Koşulları', route: '/more/terms' },
            ]
        }
    ];

    return (
        <LinearGradient
            colors={[colors.background.main, colors.primary[900]]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ayarlar</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                    {/* Groups */}
                    {menuGroups.map((group, groupIndex) => (
                        <View key={groupIndex} style={styles.groupContainer}>
                            <Text style={styles.groupTitle}>{group.title}</Text>
                            <Card style={styles.menuCard}>
                                {group.items.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.menuItem,
                                            index !== group.items.length - 1 && styles.menuItemBorder
                                        ]}
                                        onPress={() => handlePress(item.route)}
                                    >
                                        <View style={styles.menuIconContainer}>
                                            <Ionicons name={item.icon as any} size={20} color={colors.accent.cyan} />
                                        </View>
                                        <Text style={styles.menuLabel}>{item.label}</Text>
                                        <Ionicons name="chevron-forward" size={16} color={colors.text.tertiary} />
                                    </TouchableOpacity>
                                ))}
                            </Card>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/(auth)/login')}>
                        <Text style={styles.logoutText}>Çıkış Yap</Text>
                    </TouchableOpacity>

                    <Text style={styles.versionText}>v1.0.0 (Build 142)</Text>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    headerTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    content: {
        padding: spacing.xl,
        paddingBottom: spacing.section,
    },
    groupContainer: {
        marginBottom: spacing.xl,
    },
    groupTitle: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        fontWeight: fontWeight.bold as any,
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
        letterSpacing: 1,
    },
    menuCard: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        padding: 0,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border.subtle,
    },
    menuIconContainer: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.accent.cyan}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    menuLabel: {
        flex: 1,
        fontSize: fontSize.base,
        color: colors.text.primary,
    },
    logoutButton: {
        marginTop: spacing.lg,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${colors.accent[500]}15`,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: `${colors.accent[500]}30`,
    },
    logoutText: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
        color: colors.accent[500],
    },
    versionText: {
        textAlign: 'center',
        marginTop: spacing.xl,
        color: colors.text.tertiary,
        fontSize: fontSize.xs,
    }
});
