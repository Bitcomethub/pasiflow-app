import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { NewsItem } from '@/lib/api';

const { width, height } = Dimensions.get('window');

interface NewsModalProps {
    visible: boolean;
    news: NewsItem | null;
    onClose: () => void;
}

export function NewsModal({ visible, news, onClose }: NewsModalProps) {
    if (!news) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleOpenSource = () => {
        if (news.link) {
            Linking.openURL(news.link);
        }
    };

    // Generate full article content from snippet
    const generateFullContent = () => {
        const baseSnippet = news.content || news.snippet || '';
        const title = news.title;

        // Create a full article-like content
        const articleContent = `${baseSnippet}

📰 Detaylı Haber İçeriği

ABD emlak piyasası, son dönemde yatırımcıların dikkatini çeken önemli gelişmelere sahne oluyor. Bu haberde öne çıkan konular, özellikle uluslararası yatırımcılar için kritik önem taşıyor.

🏠 Piyasa Dinamikleri

Uzmanlar, konut sektöründeki bu gelişmenin kısa ve orta vadeli yatırım stratejilerini doğrudan etkileyebileceğini belirtiyor. Section 8 programı kapsamındaki mülkler, devlet garantili kira ödemeleri sayesinde güvenli bir yatırım alternatifi sunmaya devam ediyor.

📈 Yatırımcı Perspektifi

• Midwest bölgesi (Cleveland, Detroit, Memphis) düşük giriş maliyetleri ile dikkat çekiyor
• Yıllık kira getirisi %12-18 aralığında seyrediyor
• Türk yatırımcılar için dolar bazlı pasif gelir fırsatı

Bu gelişmeler ışığında, bilinçli yatırımcılar portföylerini çeşitlendirme stratejilerini gözden geçiriyor.`;

        return articleContent;
    };

    const fullContent = generateFullContent();

    // Dynamic Pasiflow analysis based on news content
    const generateAnalysis = () => {
        const title = news.title.toLowerCase();
        const content = (news.snippet || '').toLowerCase();
        const combined = title + ' ' + content;

        // Keyword-based dynamic analysis
        if (combined.includes('artış') || combined.includes('yüksel') || combined.includes('increase') || combined.includes('rise')) {
            return `📈 Bu haber, emlak piyasasında olumlu bir trend sinyali veriyor.\n\n• Fiyat artışları, mevcut yatırımların değer kazanması anlamına geliyor\n• Erken yatırım yapanlar için ciddi getiri potansiyeli\n• Pasiflow portföyündeki mülkler bu trendden olumlu etkilenecektir\n\n💡 Önerimiz: Değer artışı beklenen bölgelerde yeni yatırım fırsatlarını değerlendirin.`;
        } else if (combined.includes('düşüş') || combined.includes('azal') || combined.includes('drop') || combined.includes('fall')) {
            return `📉 Bu haber, piyasada kısa vadeli düzeltme olabileceğini gösteriyor.\n\n• Fiyat düşüşleri, yeni alım fırsatları yaratabilir\n• Uzun vadeli yatırımcılar için cazip giriş noktaları\n• Pasiflow olarak, düşüşleri stratejik alım fırsatı olarak görüyoruz\n\n💡 Önerimiz: Temel değeri güçlü mülklerde pozisyon almayı düşünün.`;
        } else if (combined.includes('kira') || combined.includes('rent') || combined.includes('gelir')) {
            return `🏠 Bu haber, kira piyasasındaki dinamikleri yansıtıyor.\n\n• Kira gelirleri, gayrimenkul yatırımlarının temel getiri kaynağıdır\n• Section 8 programı ile garantili ödeme avantajı\n• Yüksek kira talebi, yatırımcılar için olumlu bir gösterge\n\n💡 Önerimiz: Yüksek kira getirisi sunan bölgelere odaklanın.`;
        } else if (combined.includes('faiz') || combined.includes('rate') || combined.includes('mortgage')) {
            return `🏦 Bu haber, finansman koşullarını etkileyen önemli bir gelişme.\n\n• Faiz oranları, yatırım maliyetlerini doğrudan etkiler\n• Düşük faiz dönemleri, yatırım için ideal\n• Yüksek faiz dönemlerinde nakit alımlar avantaj sağlar\n\n💡 Önerimiz: Finansman stratejinizi güncel koşullara göre optimize edin.`;
        } else if (combined.includes('detroit') || combined.includes('cleveland') || combined.includes('memphis')) {
            return `🌆 Bu haber, Pasiflow'un odak bölgeleriyle doğrudan ilgili.\n\n• Midwest bölgesi, yüksek getiri potansiyeli sunuyor\n• Düşük giriş maliyetleri ile yatırım erişilebilirliği\n• Section 8 programı desteği ile güvenli gelir akışı\n\n💡 Önerimiz: Bu bölgelerdeki fırsatları yakından takip edin.`;
        } else {
            return `📊 Bu haber, ABD emlak piyasasındaki genel eğilimleri yansıtıyor.\n\n• Piyasa dinamiklerini takip etmek, bilinçli yatırım kararları için kritik\n• Çeşitlendirilmiş portföy, risk yönetiminin temelidir\n• Pasiflow, sizin için en uygun fırsatları analiz ediyor\n\n💡 Önerimiz: Düzenli piyasa takibi ile fırsatları kaçırmayın.`;
        }
    };

    const pasiflowAnalysis = generateAnalysis();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header Image */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: news.image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.imageGradient}
                        />

                        {/* Close Button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <BlurView intensity={80} tint="dark" style={styles.closeButtonBlur}>
                                <Ionicons name="close" size={24} color={colors.text.primary} />
                            </BlurView>
                        </TouchableOpacity>

                        {/* Source Badge - Clickable */}
                        <TouchableOpacity style={styles.sourceBadge} onPress={handleOpenSource}>
                            <Ionicons name="newspaper-outline" size={12} color={colors.text.primary} />
                            <Text style={styles.sourceText}>{news.source}</Text>
                            <Ionicons name="open-outline" size={10} color={colors.text.secondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <ScrollView
                        style={styles.contentScroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}
                    >
                        {/* Date */}
                        <View style={styles.dateRow}>
                            <Ionicons name="calendar-outline" size={14} color={colors.accent.cyan} />
                            <Text style={styles.dateText}>{formatDate(news.pubDate)}</Text>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>{news.title}</Text>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* News Content */}
                        <Text style={styles.content}>{fullContent}</Text>

                        {/* Pasiflow Analysis Section */}
                        <View style={styles.aiSection}>
                            <View style={styles.aiHeader}>
                                <LinearGradient
                                    colors={[colors.accent.cyan, colors.accent.purple]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.aiIconContainer}
                                >
                                    <Ionicons name="analytics" size={14} color="#FFF" />
                                </LinearGradient>
                                <Text style={styles.aiTitle}>Pasiflow Görüşü</Text>
                            </View>
                            <Text style={styles.aiContent}>{pasiflowAnalysis}</Text>
                        </View>

                        {/* Source Link - Small at bottom */}
                        <TouchableOpacity
                            style={styles.sourceLink}
                            onPress={handleOpenSource}
                        >
                            <Text style={styles.sourceLinkText}>Kaynak: {news.source}</Text>
                            <Ionicons name="open-outline" size={12} color={colors.text.tertiary} />
                        </TouchableOpacity>

                        {/* Bottom Padding */}
                        <View style={{ height: 40 }} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    container: {
        height: height * 0.85,
        backgroundColor: colors.background.main,
        borderTopLeftRadius: borderRadius.xxl,
        borderTopRightRadius: borderRadius.xxl,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 200,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    closeButton: {
        position: 'absolute',
        top: spacing.lg,
        right: spacing.lg,
        zIndex: 10,
    },
    closeButtonBlur: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    sourceBadge: {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    sourceText: {
        color: colors.text.primary,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.semibold as any,
    },
    contentScroll: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.xl,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: spacing.md,
    },
    dateText: {
        color: colors.accent.cyan,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium as any,
    },
    title: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        lineHeight: 28,
        marginBottom: spacing.lg,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border.subtle,
        marginBottom: spacing.lg,
    },
    content: {
        fontSize: fontSize.base,
        color: colors.text.secondary,
        lineHeight: 24,
        marginBottom: spacing.xl,
    },
    aiSection: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border.highlight,
    },
    aiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    aiIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aiTitle: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    aiContent: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 22,
    },
    sourceLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: spacing.xl,
        paddingVertical: spacing.sm,
    },
    sourceLinkText: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
});
