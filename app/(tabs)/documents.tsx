import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui';

export default function DocumentsScreen() {
    const documents = [
        {
            title: 'Kira Kontratları',
            items: [
                { id: '1', name: 'Miami Apt #4B - 2025', date: '21 Ara 2024', size: '2.4 MB' },
                { id: '2', name: 'Austin Loft - 2025', date: '15 Oca 2025', size: '1.8 MB' },
            ]
        },
        {
            title: 'Vergi Dokümanları',
            items: [
                { id: '3', name: 'Annual Tax Report 2024', date: '31 Mar 2024', size: '4.1 MB' },
            ]
        }
    ];

    return (
        <LinearGradient
            colors={[colors.background.main, '#0F172A']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Dokümanlar</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={20} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {documents.map((section, index) => (
                        <View key={index} style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Card style={styles.sectionCard}>
                                {section.items.map((doc, docIndex) => (
                                    <View key={doc.id}>
                                        <TouchableOpacity style={styles.docItem}>
                                            <View style={styles.docIconContainer}>
                                                <Ionicons name="document-text" size={24} color={colors.accent.cyan} />
                                            </View>
                                            <View style={styles.docInfo}>
                                                <Text style={styles.docName}>{doc.name}</Text>
                                                <View style={styles.docMeta}>
                                                    <Text style={styles.docDate}>{doc.date}</Text>
                                                    <Text style={styles.docSize}>• {doc.size}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={styles.downloadButton}>
                                                <Ionicons name="download-outline" size={20} color={colors.text.secondary} />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        {docIndex !== section.items.length - 1 && <View style={styles.separator} />}
                                    </View>
                                ))}
                            </Card>
                        </View>
                    ))}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    title: {
        fontSize: fontSize.display,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -1,
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.subtle,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    scrollContent: {
        paddingBottom: spacing.section,
    },
    sectionContainer: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginLeft: spacing.xl,
        marginBottom: spacing.md,
    },
    sectionCard: {
        marginHorizontal: spacing.xl,
        padding: 0,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        ...shadows.card,
    },
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    docIconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.accent.cyan}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    docInfo: {
        flex: 1,
    },
    docName: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    docMeta: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    docDate: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
    },
    docSize: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    downloadButton: {
        padding: spacing.sm,
    },
    separator: {
        height: 1,
        backgroundColor: colors.border.subtle,
        marginLeft: spacing.xl + 48, // Indent past icon
    },
});
