import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@/lib/theme';
import { Card } from '@/components/ui';

interface DocumentCategory {
    id: string;
    name: string;
    icon: string;
    count: number;
    description: string;
}

interface PropertyDocs {
    id: string;
    address: string;
    city: string;
    categories: DocumentCategory[];
}

const propertyDocuments: PropertyDocs[] = [
    {
        id: '1',
        address: '1234 Maple Street',
        city: 'Detroit, MI',
        categories: [
            { id: 'closing', name: 'Closing / HUD', icon: 'document-text', count: 3, description: 'Satış dokümanları' },
            { id: 'lease', name: 'Lease', icon: 'clipboard', count: 1, description: 'Kira sözleşmesi' },
            { id: 'inspection', name: 'Inspection', icon: 'search', count: 2, description: 'Denetim raporları' },
            { id: 'insurance', name: 'Insurance', icon: 'shield-checkmark', count: 1, description: 'Sigorta poliçesi' },
        ],
    },
    {
        id: '2',
        address: '567 Oak Avenue',
        city: 'Cleveland, OH',
        categories: [
            { id: 'closing', name: 'Closing / HUD', icon: 'document-text', count: 3, description: 'Satış dokümanları' },
            { id: 'lease', name: 'Lease', icon: 'clipboard', count: 1, description: 'Kira sözleşmesi' },
            { id: 'inspection', name: 'Inspection', icon: 'search', count: 1, description: 'Denetim raporları' },
            { id: 'insurance', name: 'Insurance', icon: 'shield-checkmark', count: 1, description: 'Sigorta poliçesi' },
            { id: 'tax', name: 'Tax / HOA', icon: 'cash', count: 2, description: 'Vergi belgeleri' },
        ],
    },
];

export default function DocumentsScreen() {
    const handlePress = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const totalDocuments = propertyDocuments.reduce(
        (sum, prop) => sum + prop.categories.reduce((catSum, cat) => catSum + cat.count, 0),
        0
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Dokümanlar</Text>
                    <Text style={styles.subtitle}>{totalDocuments} dosya</Text>
                </View>

                {/* Search Bar with Blur Effect */}
                <TouchableOpacity style={styles.searchContainer} onPress={handlePress}>
                    {Platform.OS === 'ios' ? (
                        <BlurView intensity={20} tint="dark" style={styles.searchBlur}>
                            <Ionicons name="search" size={18} color={colors.text.muted} />
                            <Text style={styles.searchPlaceholder}>Doküman ara...</Text>
                        </BlurView>
                    ) : (
                        <View style={[styles.searchBlur, { backgroundColor: colors.primary[800] }]}>
                            <Ionicons name="search" size={18} color={colors.text.muted} />
                            <Text style={styles.searchPlaceholder}>Doküman ara...</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Properties with Documents */}
                {propertyDocuments.map((property) => (
                    <View key={property.id} style={styles.propertySection}>
                        {/* Property Header */}
                        <View style={styles.propertyHeader}>
                            <View style={styles.propertyIcon}>
                                <Ionicons name="home" size={18} color={colors.accent[500]} />
                            </View>
                            <View>
                                <Text style={styles.propertyAddress}>{property.address}</Text>
                                <Text style={styles.propertyCity}>{property.city}</Text>
                            </View>
                        </View>

                        {/* Document Categories */}
                        <View style={styles.categoriesGrid}>
                            {property.categories.map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    activeOpacity={0.7}
                                    onPress={handlePress}
                                    style={styles.categoryCardContainer}
                                >
                                    <Card style={styles.categoryCard}>
                                        <View style={styles.categoryIconContainer}>
                                            <Ionicons name={category.icon as any} size={22} color={colors.accent[500]} />
                                            <View style={styles.countBadge}>
                                                <Text style={styles.countText}>{category.count}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.categoryName}>{category.name}</Text>
                                        <Text style={styles.categoryDesc}>{category.description}</Text>
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Upload Button */}
                <TouchableOpacity style={styles.uploadButton} onPress={handlePress}>
                    <View style={styles.uploadIconContainer}>
                        <Ionicons name="cloud-upload-outline" size={24} color={colors.accent[500]} />
                    </View>
                    <View style={styles.uploadTextContainer}>
                        <Text style={styles.uploadTitle}>Doküman Yükle</Text>
                        <Text style={styles.uploadSubtitle}>PDF, JPG, PNG desteklenir</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary[900],
    },
    header: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    subtitle: {
        fontSize: fontSize.sm,
        color: colors.text.muted,
        marginTop: spacing.xs,
    },
    searchContainer: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xxl,
    },
    searchBlur: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
        overflow: 'hidden',
    },
    searchPlaceholder: {
        marginLeft: spacing.md,
        fontSize: fontSize.base,
        color: colors.text.muted,
    },
    propertySection: {
        marginBottom: spacing.xxl,
    },
    propertyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.lg,
    },
    propertyIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.accent[500]}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    propertyAddress: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
    },
    propertyCity: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: 2,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    categoryCardContainer: {
        width: '47%',
    },
    categoryCard: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    categoryIconContainer: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    countBadge: {
        position: 'absolute',
        top: -6,
        right: -10,
        backgroundColor: colors.accent[500],
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 10,
        fontWeight: fontWeight.bold,
        color: colors.white,
    },
    categoryName: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    categoryDesc: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        textAlign: 'center',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.xl,
        marginBottom: spacing.xxxl,
        padding: spacing.lg,
        borderWidth: 2,
        borderColor: colors.border.default,
        borderStyle: 'dashed',
        borderRadius: borderRadius.lg,
    },
    uploadIconContainer: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.accent[500]}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
    },
    uploadTextContainer: {
        flex: 1,
    },
    uploadTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
    },
    uploadSubtitle: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
        marginTop: 2,
    },
});
