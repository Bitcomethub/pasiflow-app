import { Redirect } from 'expo-router';

export default function Index() {
    // For now, redirect to login
    // Later, this can check auth status and redirect accordingly
    return <Redirect href="/(auth)/login" />;
}
