import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card, StatBlock, Button } from '@/components/ui';

const { width } = Dimensions.get('window');

// Mock data lookup (normally this would come from an API or store)
const PROPERTIES_DATA: Record<string, any> = {
    '1': {
        title: 'Modern Apartment in Cleveland',
        location: 'Cleveland, OH',
        price: '$125,000',
        rent: '$1,150',
        roi: '11.0%',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60',
        gallery: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1484154218962-a1c00207099b?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'
        ],
        description: 'Cleveland şehir merkezine yakın, tamamen yenilenmiş modern daire. Yüksek kira getirisi ve değer artış potansiyeli sunan bu mülk, Section 8 kiracı garantisi kapsamındadır.',
        features: ['2 Yatak Odası', '1 Banyo', '95 m²', 'Yenilenmiş Mutfak', 'Merkezi Isıtma'],
        status: 'occupied',
        yearBuilt: 1995,
        managementFee: '%10',
    },
    '2': {
        title: 'Single Family Home in Memphis',
        location: 'Memphis, TN',
        price: '$145,000',
        rent: '$1,350',
        roi: '11.2%',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=60',
        description: 'Memphis\'in gelişen bölgesinde, geniş bahçeli müstakil ev. Aileler için ideal, uzun dönemli kiracı profiline uygun.',
        features: ['3 Yatak Odası', '2 Banyo', '150 m²', 'Özel Bahçe', 'Garaj'],
        status: 'available',
        yearBuilt: 2005,
        managementFee: '%10',
    },
    '3': {
        title: 'Detroit Investment Hub',
        location: 'Detroit, MI',
        price: '$95,000',
        rent: '$950',
        roi: '12.0%',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=800&auto=format&fit=crop&q=60',
        description: 'Detroit\'in yeniden yapılanan bölgesinde, yüksek nakit akışı sağlayan yatırım fırsatı. Tamamen restore edilmiş.',
        features: ['3 Yatak Odası', '1 Banyo', '110 m²', 'Bodrum', 'Yeni Çatı'],
        status: 'turnover',
        yearBuilt: 1950,
        managementFee: '%10',
    }
};

export default function PropertyDetailScreen() {
    const { id } = useLocalSearchParams();
    const property = PROPERTIES_DATA[id as string] || PROPERTIES_DATA['1'];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Image Header */}
                <View style={styles.imageHeader}>
                    <Image source={{ uri: property.image }} style={styles.mainImage} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.imageOverlay}
                    />
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.headerInfo}>
                        <View style={styles.badgeContainer}>
                            <View style={[styles.badge, { backgroundColor: property.status === 'occupied' ? colors.success : colors.warning }]}>
                                <Text style={styles.badgeText}>
                                    {property.status === 'occupied' ? 'KİRACILI' : 'SATIŞTA'}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.title}>{property.title}</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location" size={16} color={colors.accent.cyan} />
                            <Text style={styles.locationText}>{property.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Main Content */}
                <View style={[styles.contentContainer, { backgroundColor: colors.background.main }]}>

                    {/* Financial Stats */}
                    <View style={styles.statsGrid}>
                        <StatBlock label="Fiyat" value={property.price} />
                        <StatBlock label="Kira" value={property.rent} highlight />
                        <StatBlock label="Getiri (ROI)" value={property.roi} />
                    </View>

                    <Text style={styles.sectionTitle}>Açıklama</Text>
                    <Text style={styles.descriptionText}>{property.description}</Text>

                    <Text style={styles.sectionTitle}>Özellikler</Text>
                    <View style={styles.featuresGrid}>
                        {property.features?.map((feature: string, index: number) => (
                            <View key={index} style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={16} color={colors.accent.cyan} />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Investment Details Card */}
                    <Card style={styles.detailsCard}>
                        <Text style={styles.cardTitle}>Yatırım Detayları</Text>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Yapım Yılı</Text>
                            <Text style={styles.detailValue}>{property.yearBuilt}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Yönetim Ücreti</Text>
                            <Text style={styles.detailValue}>{property.managementFee}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Vergi Avantajı</Text>
                            <Text style={[styles.detailValue, { color: colors.success }]}>Mevcut</Text>
                        </View>
                    </Card>

                    {/* Action Button */}
                    <Button
                        title="Yatırım Yap / Bilgi Al"
                        onPress={() => alert('Yatırım talebiniz alındı! Müşteri temsilcimiz sizinle iletişime geçecek.')}
                        style={styles.actionButton}
                    />

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.main,
    },
    scrollContent: {
        paddingBottom: 0,
    },
    imageHeader: {
        height: 350,
        width: '100%',
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerInfo: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        color: '#E0E7FF',
        fontSize: 14,
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        backgroundColor: colors.background.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border.subtle,
        ...shadows.sm,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 12,
        marginTop: 8,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.text.secondary,
        lineHeight: 22,
        marginBottom: 24,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.subtle,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
    },
    featureText: {
        color: colors.text.primary,
        fontSize: 12,
    },
    detailsCard: {
        padding: 16,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        color: colors.text.tertiary,
        fontSize: 14,
    },
    detailValue: {
        color: colors.text.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: colors.border.subtle,
        marginVertical: 8,
    },
    actionButton: {
        marginBottom: 24,
    }
});
