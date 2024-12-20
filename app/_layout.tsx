import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const RootLayout = () => {

    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerBackVisible: false,
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold'
            },
            animation: 'slide_from_right',
            headerLeft: ({ canGoBack }) => (
                canGoBack && (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: 10 }}>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                )
            )
        }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerTitle: '' }} />
            <Stack.Screen name="login" options={{ headerTitle: '' }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootLayout;
