import { Stack } from "expo-router";

const RootLayout = () => {

    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold'
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
