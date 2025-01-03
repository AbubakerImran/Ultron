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
                color: 'white'
            },
            headerStyle: {
                borderBottomWidth: 0.5,
                backgroundColor: 'blue'
            },
            tabBarStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0.5,
                height: 55,
                backgroundColor: 'blue'
            },
            tabBarLabelStyle: {
                marginBottom: 20,
                fontSize: 12,
                color: 'white'
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
            <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ focused }) => (<Ionicons name={focused ? "home" : "home-outline"} size={24} color="white" />) }} />
            <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarIcon: ({ focused }) => (<Ionicons name={focused ? "cart" : "cart-outline"} size={24} color="white" />) }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ focused }) => (<Ionicons name={focused ? "man" : "man-outline"} size={24} color="white" />) }} />
        </Tabs>
    )
};

export default TabLayout;