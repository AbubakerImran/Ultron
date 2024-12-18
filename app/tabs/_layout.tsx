import { Tabs } from "expo-router";

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    )
};

export default TabLayout;