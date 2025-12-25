import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated, Easing, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '@/lib/theme';
import { Card, PortfolioComparison } from '@/components/ui';
import { NewsModal } from '@/components/ui/NewsModal';
import { fetchNews, NewsItem } from '@/lib/api';

// Fallback mock news for when API is unavailable
const FALLBACK_NEWS = [
    {
        id: '1',
        title: 'ABD Konut Fiyatları 2025\'te Artmaya Devam Edecek',
        source: 'Redfin Blog',
        pubDate: new Date().toISOString(),
        snippet: 'Uzmanlar 2025 yılında konut fiyatlarının artış trendini sürdüreceğini öngörüyor.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        link: 'https://www.redfin.com/blog/'
    },
    {
        id: '2',
        title: 'Kira Getirisi En Yüksek 10 ABD Şehri',
        source: 'HousingWire',
        pubDate: new Date(Date.now() - 3600000).toISOString(),
        snippet: 'Yatırımcılar için en karlı bölgelerin listesi yayınlandı.',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
        link: 'https://www.housingwire.com/'
    },
    {
        id: '3',
        title: 'Yatırımcılar İçin En İyi Bölgeler: 2025 Rehberi',
        source: 'Realtor.com',
        pubDate: new Date(Date.now() - 86400000).toISOString(),
        snippet: 'Bu yıl yatırım yapılabilecek en iyi bölgelerin kapsamlı analizi.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        link: 'https://www.realtor.com/news/'
    },
];

export default function Dashboard() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const actionPulseAnim = useRef(new Animated.Value(1)).current;
    const actionGlowAnim = useRef(new Animated.Value(0)).current;
    const [news, setNews] = useState<NewsItem[]>([]);
    const [newsLoading, setNewsLoading] = useState(true);

    // Animated counter states for engaging number reveal
    const [displayPortfolio, setDisplayPortfolio] = useState(0);
    const [displayRent, setDisplayRent] = useState(0);
    const [displayROI, setDisplayROI] = useState(0);
    const [displayTrend, setDisplayTrend] = useState(0);

    // News modal state
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Target values
    const TARGET_PORTFOLIO = 345000;
    const TARGET_RENT = 2850;
    const TARGET_ROI = 8.4;
    const TARGET_TREND = 12.5;


    // Fetch news only once on mount
    useEffect(() => {
        const loadNews = async () => {
            try {
                const fetchedNews = await fetchNews();
                if (fetchedNews.length > 0) {
                    setNews(fetchedNews);
                } else {
                    setNews(FALLBACK_NEWS as NewsItem[]);
                }
            } catch (error) {
                console.log('Using fallback news');
                setNews(FALLBACK_NEWS as NewsItem[]);
            } finally {
                setNewsLoading(false);
            }
        };
        loadNews();
    }, []);

    // Run animations every time this tab is focused
    useFocusEffect(
        useCallback(() => {
            // Reset animation values
            fadeAnim.setValue(0);
            slideAnim.setValue(50);
            setDisplayPortfolio(0);
            setDisplayRent(0);
            setDisplayROI(0);
            setDisplayTrend(0);

            // Start fade/slide animations
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.exp),
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.back(1.5)),
                }),
            ]).start();

            // Count-up animation for numbers
            const ANIMATION_DURATION = 1500;
            const FRAME_RATE = 60;
            const totalFrames = (ANIMATION_DURATION / 1000) * FRAME_RATE;
            let currentFrame = 0;

            const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

            const animateNumbers = () => {
                currentFrame++;
                const progress = easeOutQuart(currentFrame / totalFrames);

                setDisplayPortfolio(Math.floor(TARGET_PORTFOLIO * progress));
                setDisplayRent(Math.floor(TARGET_RENT * progress));
                setDisplayROI(parseFloat((TARGET_ROI * progress).toFixed(1)));
                setDisplayTrend(parseFloat((TARGET_TREND * progress).toFixed(1)));

                if (currentFrame < totalFrames) {
                    requestAnimationFrame(animateNumbers);
                } else {
                    setDisplayPortfolio(TARGET_PORTFOLIO);
                    setDisplayRent(TARGET_RENT);
                    setDisplayROI(TARGET_ROI);
                    setDisplayTrend(TARGET_TREND);
                }
            };

            const timer = setTimeout(() => {
                requestAnimationFrame(animateNumbers);
            }, 400);

            // Quick Actions pulse animation
            actionPulseAnim.setValue(1);
            actionGlowAnim.setValue(0);

            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(actionPulseAnim, {
                        toValue: 1.03,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(actionPulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulseAnimation.start();

            const glowAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(actionGlowAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(actionGlowAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            );
            glowAnimation.start();

            return () => {
                clearTimeout(timer);
                pulseAnimation.stop();
                glowAnimation.stop();
            };
        }, [])
    );

    const handlePress = () => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    // Format news date relative to now
    const formatNewsDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return 'Az önce';
        if (diffHours < 24) return `${diffHours} saat önce`;
        if (diffDays === 1) return 'Dün';
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR');
    };

    return (
        <LinearGradient
            colors={[colors.background.main, '#1F2937']} // Lighter Deep Cosmos Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Header Section */}
                    <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        <View style={{ alignItems: 'flex-start', marginLeft: -20 }}>
                            <View style={{ width: 200, height: 60, overflow: 'hidden' }}>
                                <Image
                                    source={require('../../assets/images/pasiflow-logo.png')}
                                    style={{
                                        width: 200,
                                        height: 200, // Square aspect (1:1) - same as source
                                        resizeMode: 'contain',
                                        marginTop: -70, // Shift image up to show center portion
                                        alignSelf: 'flex-start',
                                        marginLeft: 0
                                    }}
                                />
                            </View>
                            <Text style={[styles.greeting, { marginLeft: 20 }]}>Tekrar Hoş Geldiniz</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => {
                                console.log('Navigating to /more');
                                handlePress(); // Add haptic
                                router.push('/more');
                            }}
                        >
                            <Ionicons name="settings-outline" size={24} color={colors.text.primary} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Portfolio Summary Card - Cosmic Glass */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 20) }] }}>
                        <LinearGradient
                            colors={[colors.primary[800], colors.primary[900]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.portfolioCardGradient}
                        >
                            <View style={styles.portfolioHeader}>
                                <Text style={styles.portfolioLabel}>TOPLAM PORTFÖY</Text>
                                <View style={styles.trendContainer}>
                                    <Ionicons name="trending-up" size={16} color={colors.text.primary} />
                                    <Text style={styles.trendText}>+{displayTrend}%</Text>
                                </View>
                            </View>
                            <Text style={styles.portfolioValue}>${displayPortfolio.toLocaleString()}</Text>

                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Aylık Kira</Text>
                                    <Text style={styles.statValue}>${displayRent.toLocaleString()}</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Net ROI</Text>
                                    <Text style={styles.statValue}>{displayROI}%</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>Mülkler</Text>
                                    <Text style={styles.statValue}>3</Text>
                                </View>
                            </View>

                            {/* Decorative Glow Orb */}
                            <View style={styles.glowOrb} />
                        </LinearGradient>
                    </Animated.View>

                    {/* Portfolio Comparison Chart */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 30) }] }}>
                        {/* @ts-ignore */}
                        <PortfolioComparison roi={displayROI} />
                    </Animated.View>

                    {/* Quick Actions */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 40) }] }}>
                        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsScroll}>
                            {[
                                { icon: 'flame', label: 'Aktif Fırsatlar', color: colors.warning, route: '/properties', highlight: true },
                                { icon: 'add-circle', label: 'Yatırım Yap', color: colors.accent.cyan, route: '/properties', highlight: true },
                                { icon: 'calculator', label: 'Hesapla', color: colors.accent.purple, route: '/simulator' },
                                { icon: 'document-text', label: 'Raporlar', color: colors.primary[400], route: '/documents' },
                                { icon: 'chatbubble-ellipses', label: 'AI Asistan', color: colors.accent.gradientStart, route: '/chat' },
                            ].map((action, index) => (
                                <Animated.View
                                    key={index}
                                    style={action.highlight ? {
                                        transform: [{ scale: actionPulseAnim }],
                                        opacity: Animated.add(0.9, Animated.multiply(actionGlowAnim, 0.1)),
                                    } : {}}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.actionCard,
                                            action.highlight && {
                                                shadowColor: action.color,
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.4,
                                                shadowRadius: 8,
                                                elevation: 6,
                                            }
                                        ]}
                                        onPress={() => {
                                            handlePress();
                                            if (action.route) {
                                                router.push(action.route as any);
                                            }
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.actionIcon,
                                            {
                                                borderColor: `${action.color}40`,
                                                backgroundColor: `${action.color}15`,
                                            },
                                            action.highlight && {
                                                borderColor: action.color,
                                                borderWidth: 2,
                                            }
                                        ]}>
                                            <Ionicons name={action.icon as any} size={24} color={action.color} />
                                        </View>
                                        <Text style={[
                                            styles.actionLabel,
                                            action.highlight && { color: action.color, fontWeight: '700' as any }
                                        ]}>{action.label}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {/* Status Overview */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 60) }] }}>
                        <Text style={styles.sectionTitle}>Kira Durumu</Text>
                        <View style={styles.statusGrid}>
                            <Card style={styles.statusCard}>
                                <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
                                <Text style={styles.statusValue}>2</Text>
                                <Text style={styles.statusLabel}>Ödendi</Text>
                            </Card>
                            <Card style={styles.statusCard}>
                                <View style={[styles.statusDot, { backgroundColor: colors.warning }]} />
                                <Text style={styles.statusValue}>1</Text>
                                <Text style={styles.statusLabel}>Bekleniyor</Text>
                            </Card>
                            <Card style={styles.statusCard}>
                                <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
                                <Text style={styles.statusValue}>0</Text>
                                <Text style={styles.statusLabel}>Gecikmiş</Text>
                            </Card>
                        </View>
                    </Animated.View>

                    {/* Real Estate News Section */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 70) }] }}>
                        <View style={styles.newsHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Ionicons name="newspaper" size={20} color={colors.accent.cyan} />
                                <Text style={styles.sectionTitle}>Piyasa Haberleri</Text>
                            </View>
                            <Text style={styles.newsViewAll}>Güncel</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.newsScroll}>
                            {newsLoading ? (
                                <View style={styles.newsLoadingContainer}>
                                    <ActivityIndicator size="small" color={colors.accent.cyan} />
                                    <Text style={styles.newsLoadingText}>Haberler yükleniyor...</Text>
                                </View>
                            ) : news.map((item, index) => (
                                <TouchableOpacity
                                    key={`news-${index}-${item.id}`}
                                    style={styles.newsCard}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handlePress();
                                        setSelectedNews(item);
                                        setModalVisible(true);
                                    }}
                                >
                                    <Image source={{ uri: item.image }} style={styles.newsImage} />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.9)']}
                                        style={styles.newsGradient}
                                    >
                                        <View style={styles.newsSourceBadge}>
                                            <Text style={styles.newsSourceText}>{item.source}</Text>
                                        </View>
                                        <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                                        <Text style={styles.newsDate}>{formatNewsDate(item.pubDate)}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {/* Recent Activity */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: Animated.add(slideAnim, 80) }] }}>
                        <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
                        <Card style={styles.activityCard}>
                            {[
                                { title: 'Kira Ödemesi Alındı', date: 'Bugün, 09:41', amount: '+$1,250', type: 'income' },
                                { title: 'Bakım Onarımı', date: 'Dün, 14:30', amount: '-$150', type: 'expense' },
                                { title: 'Yeni Doküman', date: '21 Arl, 10:00', amount: '', type: 'info' },
                            ].map((item, index) => (
                                <View key={index} style={[
                                    styles.activityItem,
                                    index !== 2 && styles.activityBorder
                                ]}>
                                    <View style={[styles.activityIcon, {
                                        backgroundColor: item.type === 'income' ? `${colors.success}15` :
                                            item.type === 'expense' ? `${colors.error}15` :
                                                `${colors.primary[500]}15`
                                    }]}>
                                        <Ionicons
                                            name={item.type === 'income' ? 'arrow-down' : item.type === 'expense' ? 'arrow-up' : 'document'}
                                            size={18}
                                            color={item.type === 'income' ? colors.success : item.type === 'expense' ? colors.error : colors.primary[500]}
                                        />
                                    </View>
                                    <View style={styles.activityInfo}>
                                        <Text style={styles.activityTitle}>{item.title}</Text>
                                        <Text style={styles.activityDate}>{item.date}</Text>
                                    </View>
                                    <Text style={[
                                        styles.activityAmount,
                                        { color: item.type === 'income' ? colors.success : item.type === 'expense' ? colors.text.primary : colors.text.secondary }
                                    ]}>{item.amount}</Text>
                                </View>
                            ))}
                        </Card>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>

            {/* News Modal */}
            <NewsModal
                visible={modalVisible}
                news={selectedNews}
                onClose={() => {
                    setModalVisible(false);
                    setSelectedNews(null);
                }}
            />
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
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingBottom: 100, // Space for tab bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    greeting: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: 4,
    },
    username: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        letterSpacing: -0.5,
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border.subtle,
        ...shadows.glow,
    },
    portfolioCardGradient: {
        borderRadius: borderRadius.xxl,
        padding: spacing.xl,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        ...shadows.float,
        overflow: 'hidden',
        position: 'relative',
    },
    glowOrb: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.accent.cyan,
        opacity: 0.15,
        transform: [{ scale: 1.5 }],
    },
    portfolioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    portfolioLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        letterSpacing: 1,
        fontWeight: fontWeight.bold as any,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(52, 211, 153, 0.2)', // Green tint
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    trendText: {
        fontSize: fontSize.xs,
        color: colors.text.primary,
        fontWeight: fontWeight.bold as any,
    },
    portfolioValue: {
        fontSize: 42,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.xl,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: colors.text.tertiary,
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    statValue: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: spacing.md,
        marginTop: spacing.md,
    },
    actionsScroll: {
        marginHorizontal: -spacing.xl, // Negative margin to scroll edge-to-edge
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.md,
    },
    actionCard: {
        alignItems: 'center',
        marginRight: spacing.lg,
        gap: spacing.sm,
    },
    actionIcon: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        ...shadows.glow,
    },
    actionLabel: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        fontWeight: fontWeight.medium as any,
    },
    statusGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    statusCard: {
        flex: 1,
        padding: spacing.md,
        alignItems: 'center',
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: spacing.sm,
    },
    statusValue: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    statusLabel: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    activityCard: {
        padding: 0,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    activityBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border.subtle,
    },
    activityIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        marginBottom: 2,
    },
    activityDate: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
    activityAmount: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
    },
    // News Section Styles
    newsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    newsViewAll: {
        fontSize: fontSize.sm,
        color: colors.accent.cyan,
        fontWeight: fontWeight.semibold as any,
    },
    newsScroll: {
        paddingRight: spacing.xl,
        marginBottom: spacing.xl,
    },
    newsCard: {
        width: 220,
        height: 160,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        marginRight: spacing.md,
        position: 'relative',
    },
    newsImage: {
        width: '100%',
        height: '100%',
    },
    newsGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
    },
    newsSourceBadge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.accent.cyan,
        paddingHorizontal: spacing.sm,
        paddingVertical: 3,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.xs,
    },
    newsSourceText: {
        fontSize: 10,
        fontWeight: fontWeight.bold as any,
        color: colors.background.main,
    },
    newsTitle: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold as any,
        color: colors.text.primary,
        lineHeight: 18,
    },
    newsDate: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        marginTop: 4,
    },
    newsLoadingContainer: {
        width: 220,
        height: 160,
        borderRadius: borderRadius.xl,
        backgroundColor: colors.background.card,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    newsLoadingText: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
    },
});
