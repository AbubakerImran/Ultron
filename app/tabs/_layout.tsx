import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
            },
            headerStyle: {
                borderBottomWidth: 0.5,
            },
            tabBarStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0.5,
                height: 55,
            },
            tabBarLabelStyle: {
                marginBottom: 20,
                fontSize: 12,
                color: 'black'
            },
            tabBarButton: (props) => (
                <TouchableOpacity
                    {...props}
                    activeOpacity={1}
                >
                    {props.children}
                </TouchableOpacity>
            ),
        }}>
            <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ focused }) => (<Ionicons name={focused ? "home" : "home-outline"} size={24} color="black" />) }} />
            <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarIcon: ({ focused }) => (<Ionicons name={focused ? "cart" : "cart-outline"} size={24} color="black" />) }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ focused }) => (<Ionicons name={focused ? "man" : "man-outline"} size={24} color="black" />) }} />
        </Tabs>
    )
};

export default TabLayout;