import { Tabs } from "expo-router";

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShadowVisible: false,
            tabBarStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0
            }
        }}>
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    )
};

export default TabLayout;