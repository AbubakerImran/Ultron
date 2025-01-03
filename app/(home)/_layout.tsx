import { Stack } from "expo-router";

const RootLayout = () => {

    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: 'blue',
            },
            headerTintColor: 'white',
            animation: 'slide_from_right',
        }}>
            <Stack.Screen name="product" options={{ title: '' }} />
        </Stack>
    );
};

export default RootLayout;