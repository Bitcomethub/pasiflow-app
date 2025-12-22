import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';
import { colors, shadows, borderRadius } from '@/lib/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.primary[600],
                tabBarInactiveTintColor: colors.text.tertiary,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: colors.background.glass, // Use new glass token
                    borderRadius: borderRadius.xxl,
                    height: 70,
                    borderTopWidth: 0,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.1)', // Glass border
                    ...shadows.float,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: Platform.OS === 'ios' ? 10 : 0
                        }}>
                            <Ionicons name={focused ? "grid" : "grid-outline"} size={28} color={color} />
                            {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="properties"
                options={{
                    title: 'Evlerim',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: Platform.OS === 'ios' ? 10 : 0
                        }}>
                            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
                            {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="rent"
                options={{
                    title: 'Kira',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: Platform.OS === 'ios' ? 10 : 0
                        }}>
                            <Ionicons name={focused ? "wallet" : "wallet-outline"} size={28} color={color} />
                            {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="simulator"
                options={{
                    title: 'Simülasyon',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: Platform.OS === 'ios' ? 10 : 0
                        }}>
                            <Ionicons name={focused ? "calculator" : "calculator-outline"} size={28} color={color} />
                            {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="documents"
                options={{
                    title: 'Dokümanlar',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: Platform.OS === 'ios' ? 10 : 0
                        }}>
                            <Ionicons name={focused ? "folder" : "folder-outline"} size={28} color={color} />
                            {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
