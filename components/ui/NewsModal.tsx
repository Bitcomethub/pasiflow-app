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

    // Dynamic Pasiflow analysis based on actual news content
    const generateAnalysis = () => {
        const title = news.title;
        const snippet = news.snippet || '';
        const combinedLower = (title + ' ' + snippet).toLowerCase();

        // Extract key terms from the news
        const extractKeyPoints = () => {
            const points: string[] = [];

            // Location analysis
            if (combinedLower.includes('detroit')) points.push('Detroit bölgesi yatırım potansiyeli artıyor');
            if (combinedLower.includes('cleveland')) points.push('Cleveland pazarı güçlü kalmaya devam ediyor');
            if (combinedLower.includes('memphis')) points.push('Memphis kira getirileri çekici seviyede');
            if (combinedLower.includes('ohio') || combinedLower.includes('michigan') || combinedLower.includes('tennessee'))
                points.push('Midwest bölgesi yatırımcılar için cazip');

            // Market trends
            if (combinedLower.includes('artış') || combinedLower.includes('increase') || combinedLower.includes('rise') || combinedLower.includes('growth'))
                points.push('Fiyat artış trendi mevcut pozisyonları güçlendiriyor');
            if (combinedLower.includes('düşüş') || combinedLower.includes('drop') || combinedLower.includes('decline'))
                points.push('Düşüş, yeni alım fırsatları yaratabilir');

            // Investment factors
            if (combinedLower.includes('kira') || combinedLower.includes('rent'))
                points.push('Kira dinamikleri nakit akışını etkiliyor');
            if (combinedLower.includes('faiz') || combinedLower.includes('rate') || combinedLower.includes('mortgage'))
                points.push('Faiz oranları finansman maliyetlerini belirliyor');
            if (combinedLower.includes('section 8') || combinedLower.includes('hud'))
                points.push('Section 8 garantisi ile güvenli gelir');

            // Default points if none match
            if (points.length === 0) {
                points.push('Piyasa gelişmeleri yakından takip edilmeli');
                points.push('Çeşitlendirilmiş portföy riski azaltır');
            }

            return points.slice(0, 3); // Max 3 points
        };

        const keyPoints = extractKeyPoints();
        const pointsList = keyPoints.map(p => `• ${p}`).join('\n');

        // Determine sentiment
        let sentiment = '📊';
        let recommendation = '';

        if (combinedLower.includes('artış') || combinedLower.includes('increase') || combinedLower.includes('positive') || combinedLower.includes('growth')) {
            sentiment = '📈';
            recommendation = 'Bu olumlu gelişme, mevcut yatırımları değerlendirebilir.';
        } else if (combinedLower.includes('düşüş') || combinedLower.includes('risk') || combinedLower.includes('concern')) {
            sentiment = '📉';
            recommendation = 'Dikkatli yaklaşım öneriyoruz, fırsatları değerlendirin.';
        } else if (combinedLower.includes('kira') || combinedLower.includes('rent')) {
            sentiment = '🏠';
            recommendation = 'Kira odaklı yatırımlar için uygun bir dönem.';
        } else {
            recommendation = 'Gelişmeleri izleyip stratejik adımlar atın.';
        }

        return `${sentiment} "${title}" başlıklı bu haber hakkında değerlendirmemiz:

${pointsList}

💡 ${recommendation}

Pasiflow ekibi olarak, bu tür piyasa gelişmelerini müşterilerimiz adına sürekli analiz ediyoruz.`;
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
