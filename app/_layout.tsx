import { Stack } from "expo-router";

const RootLayout = () => {

    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: 'white',
            },
            animation: 'slide_from_right',
        }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerTitle: '' }} />
            <Stack.Screen name="login" options={{ headerTitle: '' }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootLayout;
