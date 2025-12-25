import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius, shadows } from '@/lib/theme';
import * as Haptics from 'expo-haptics';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
    id: '0',
    text: "Merhaba! Ben Pasiflow AI Asistanı. ABD gayrimenkul yatırımları, ROI hesaplamaları veya piyasa analizi hakkında bana her şeyi sorabilirsin. Nasıl yardımcı olabilirim?",
    sender: 'ai',
    timestamp: new Date()
};

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setLoading(true);
        Keyboard.dismiss();

        // TODO: Backend integration
        // Simulate AI response for now
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateMockResponse(userMsg.text),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setLoading(false);
            if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 1500);
    };

    const generateMockResponse = (text: string): string => {
        const lower = text.toLowerCase();
        if (lower.includes('detroit') || lower.includes('bölge')) {
            return "Detroit şu anda yüksek nakit akışı (Cash Flow) sağlayan en popüler bölgelerden biri. Ortalama ROI %12-15 bandında. Cleveland ve Memphis de benzer fırsatlar sunuyor.";
        }
        if (lower.includes('bütçe') || lower.includes('50000') || lower.includes('50k')) {
            return "$50,000 bütçe ile Detroit veya Cleveland'da renovasyonlu, kiracılı bir Section 8 mülkü alabilirsiniz. Bu size aylık ortalama $650-750 net kira getirisi sağlar.";
        }
        return "Bu konuda detaylı bir piyasa analizi yapabilirim. Genel olarak ABD emlak piyasası 2025'te istikrarlı bir büyüme öngörüyor. Özellikle Midwest bölgesindeki 'Rental' mülkler Türk yatırımcılar için popüler.";
    };

    useEffect(() => {
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, [messages]);

    return (
        <LinearGradient
            colors={[colors.background.main, colors.primary[900]]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Stack.Screen options={{ headerShown: false }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Pasiflow AI</Text>
                        <View style={styles.onlineBadge}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>Çevrimiçi</Text>
                        </View>
                    </View>
                    <View style={{ width: 40 }} />
                </View>

                {/* Chat Area */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[
                                styles.messageBubble,
                                msg.sender === 'user' ? styles.userBubble : styles.aiBubble
                            ]}
                        >
                            {msg.sender === 'ai' && (
                                <View style={styles.aiAvatar}>
                                    <Ionicons name="sparkles" size={14} color="#FFF" />
                                </View>
                            )}
                            <Text style={[
                                styles.messageText,
                                msg.sender === 'user' ? styles.userText : styles.aiText
                            ]}>
                                {msg.text}
                            </Text>
                        </View>
                    ))}
                    {loading && (
                        <View style={styles.loadingContainer}>
                            <View style={styles.aiAvatar}>
                                <Ionicons name="sparkles" size={14} color="#FFF" />
                            </View>
                            <View style={styles.typingIndicator}>
                                <ActivityIndicator size="small" color={colors.text.tertiary} />
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Input Area */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                >
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Bir soru sorun..."
                            placeholderTextColor={colors.text.tertiary}
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            maxLength={500}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                            onPress={sendMessage}
                            disabled={!inputText.trim() || loading}
                        >
                            <Ionicons name="send" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    backButton: {
        width: 40,
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    onlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        gap: 4,
    },
    onlineDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.success,
    },
    onlineText: {
        fontSize: 10,
        color: colors.text.secondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.md,
        paddingBottom: 20,
    },
    messageBubble: {
        maxWidth: '85%',
        padding: spacing.md,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
        flexDirection: 'row',
        gap: spacing.sm,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: colors.accent.gradientStart,
        borderBottomRightRadius: 2,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: colors.background.card,
        borderBottomLeftRadius: 2,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    aiAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.accent.cyan,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    messageText: {
        fontSize: fontSize.base,
        lineHeight: 22,
        flex: 1,
    },
    userText: {
        color: '#FFF',
    },
    aiText: {
        color: colors.text.primary,
    },
    loadingContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        marginBottom: spacing.md,
        alignSelf: 'flex-start',
    },
    typingIndicator: {
        padding: spacing.sm,
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        borderBottomLeftRadius: 2,
    },
    inputContainer: {
        padding: spacing.md,
        backgroundColor: colors.background.card,
        borderTopWidth: 1,
        borderTopColor: colors.border.subtle,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    input: {
        flex: 1,
        backgroundColor: colors.background.subtle,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: 10,
        color: colors.text.primary,
        fontSize: fontSize.base,
        maxHeight: 100,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: colors.accent.gradientStart,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.glow,
    },
    sendButtonDisabled: {
        opacity: 0.5,
        backgroundColor: colors.text.tertiary,
    },
});
