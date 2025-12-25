import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card, StatBlock, Button } from '@/components/ui';

const { width } = Dimensions.get('window');

// Mock data lookup - synchronized with properties.tsx
const PROPERTIES_DATA: Record<string, any> = {
    // My Properties
    '1': {
        title: 'Solid Brick Colonial',
        location: 'Cleveland Heights, OH',
        price: '$115,000',
        rent: '$1,250',
        roi: '13.0%',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80'
        ],
        description: 'Cleveland Heights\'ın en güzel mahallesinde, klasik tuğla kolonyal tarzı müstakil ev. Yüksek kira getirisi ve değer artış potansiyeli sunan bu mülk, Section 8 kiracı garantisi kapsamındadır.',
        features: ['3 Yatak Odası', '2 Banyo', '145 m²', 'Yenilenmiş Mutfak', 'Merkezi Isıtma', 'Garaj'],
        status: 'occupied',
        yearBuilt: 1945,
        managementFee: '%10',
    },
    '2': {
        title: 'Historic Detroit Single Family',
        location: 'Detroit, MI',
        price: '$85,000',
        rent: '$1,100',
        roi: '15.5%',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80'
        ],
        description: 'Detroit\'in tarihi bölgesinde, karakterli verandalı eski Amerikan evi. Tamamen yenilenmiş ve uzun süreli kiracılı.',
        features: ['3 Yatak Odası', '1.5 Banyo', '120 m²', 'Veranda', 'Bodrum', 'Yeni Çatı'],
        status: 'occupied',
        yearBuilt: 1920,
        managementFee: '%10',
    },
    '3': {
        title: 'Renovated Craftsman',
        location: 'Memphis, TN',
        price: '$135,000',
        rent: '$1,400',
        roi: '12.4%',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop&q=80'
        ],
        description: 'Memphis\'in gelişen bölgesinde, craftsman tarzı tamamen yenilenmiş ev. Geniş bahçesi ve modern iç mekanıyla yatırımcılar için ideal.',
        features: ['4 Yatak Odası', '2 Banyo', '160 m²', 'Özel Bahçe', 'Garaj', 'Yenilenmiş'],
        status: 'vacancy',
        yearBuilt: 1940,
        managementFee: '%10',
    },
    // Hot Opportunities
    'hot-1': {
        title: '🔥 Detroit Investment Hub',
        location: 'Detroit, MI',
        price: '$55,000',
        rent: '$850',
        roi: '18.5%',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80'
        ],
        description: 'Detroit\'in yeniden yapılanan bölgesinde, yüksek nakit akışı sağlayan sıcak yatırım fırsatı. Düşük giriş maliyeti ile yüksek getiri. Section 8 uygunluğu mevcut.',
        features: ['2 Yatak Odası', '1 Banyo', '90 m²', 'Yeni Tesisat', 'Bodrum', 'Kiracılı'],
        status: 'occupied',
        yearBuilt: 1950,
        managementFee: '%8',
    },
    'hot-2': {
        title: 'Cleveland Cash Flow',
        location: 'Cleveland, OH',
        price: '$72,000',
        rent: '$1,050',
        roi: '17.5%',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop&q=80'
        ],
        description: 'Cleveland\'ın güvenli mahallesinde, stabil nakit akışı sağlayan müstakil ev. Uzun süreli kiracılı ve düşük bakım maliyetli.',
        features: ['3 Yatak Odası', '1 Banyo', '105 m²', 'Bahçe', 'Garaj', 'Kiracılı'],
        status: 'occupied',
        yearBuilt: 1960,
        managementFee: '%10',
    },
    'hot-3': {
        title: 'Memphis Turnaround',
        location: 'Memphis, TN',
        price: '$68,000',
        rent: '$950',
        roi: '16.8%',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&auto=format&fit=crop&q=80'
        ],
        description: 'Memphis\'in gelişen bölgesinde, yenileme potansiyeli yüksek fırsat. Hafif renovasyonla kira değeri artırılabilir.',
        features: ['3 Yatak Odası', '1 Banyo', '110 m²', 'Geniş Arsa', 'Veranda', 'Renovasyon Potansiyeli'],
        status: 'available',
        yearBuilt: 1955,
        managementFee: '%10',
    },
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
