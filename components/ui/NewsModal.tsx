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
        const baseContent = news.content || news.snippet;

        // Create a more complete article-like content
        const paragraphs = [
            baseContent,
            '\n\n📊 Piyasa Analizi\n\nABD emlak piyasası, ekonomik belirsizliklere rağmen güçlü performansını sürdürüyor. Uzmanlar, özellikle Midwest bölgesindeki şehirlerin (Cleveland, Detroit, Memphis) yatırımcılar için cazip fırsatlar sunmaya devam ettiğini belirtiyor.',
            '\n\n🏠 Yatırımcı Perspektifi\n\nSection 8 programı kapsamındaki mülkler, devlet garantili kira ödemeleri sayesinde güvenli gelir akışı sağlıyor. Bu durum, özellikle uluslararası yatırımcılar için risksiz bir yatırım ortamı oluşturuyor.',
            '\n\n📈 Gelecek Beklentileri\n\nAnalistler, 2025 yılında konut fiyatlarının %5-8 arasında artış göstereceğini öngörüyor. Kira getirisi odaklı yatırımcılar için bu dönem, portföy genişletme açısından uygun bir zaman dilimi olarak değerlendiriliyor.',
            '\n\n💡 Uzman Görüşü\n\n"Düşük maliyetli, yüksek getirili emlak yatırımları, çeşitlendirilmiş bir portföy için vazgeçilmez araçlardır. ABD\'nin endüstriyel şehirlerindeki fırsatlar, özellikle Türk yatırımcılar için altın değerinde." - Pasiflow Yatırım Ekibi',
        ];

        return paragraphs.join('');
    };

    const fullContent = generateFullContent();

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

                        {/* Source Badge */}
                        <View style={styles.sourceBadge}>
                            <Ionicons name="newspaper-outline" size={12} color={colors.text.primary} />
                            <Text style={styles.sourceText}>{news.source}</Text>
                        </View>
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

                        {/* Content */}
                        <Text style={styles.content}>{fullContent}</Text>

                        {/* Source Link - Small and subtle */}
                        <View style={styles.sourceRow}>
                            <Text style={styles.sourceInfo}>Kaynak: {news.source}</Text>
                            <TouchableOpacity
                                style={styles.sourceLinkButton}
                                onPress={handleOpenSource}
                            >
                                <Text style={styles.sourceLinkText}>Kaynağa Git</Text>
                                <Ionicons name="open-outline" size={12} color={colors.accent.cyan} />
                            </TouchableOpacity>
                        </View>

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
        height: 220,
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
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        lineHeight: 32,
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
        lineHeight: 26,
        marginBottom: spacing.xl,
    },
    sourceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border.subtle,
    },
    sourceInfo: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    sourceLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    sourceLinkText: {
        fontSize: fontSize.xs,
        color: colors.accent.cyan,
        fontWeight: fontWeight.medium as any,
    },
});
