import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../Authentication/LoginScreen";
import { SignUpScreen } from "../Authentication/SignUpScreen";
import { HomeScreen } from "../HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppColors } from "../../values/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Router = ( ) => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    let screenOptions = {
        tabBarStyle:{
            backgroundColor:'white',
            height:50,
        },
        tabBarItemStyle:{
            margin:5,
            width: 30,
            borderRadius:10,
        },
        tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15
        },
        tabBarLabelPosition: "beside-icon",
        tabBarIconStyle: { display: "none" },
        tabBarInactiveTintColor: "#aeb8b9",
        tabBarActiveTintColor: "#0164FF",
        headerShown: false
    }

    const getTabBarIcon = ( routeName ) => {
        let iconName;

        switch (routeName) {
            case 'Home':
                iconName = 'home';
                break;
            case 'ProfileStack':
                iconName = 'user';
                break;
            case 'CreateProjectScreen':
                iconName = 'plus-circle';
                break;
            case 'NotificationsScreen':
                iconName = 'bell';
                break;
            case 'SearchScreen':
                iconName = 'search';
                break;
            case 'LoginScreen':
                iconName = 'log-in';
                break;
        }

        return iconName;
    }

    function HomeTabs() {
        return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: AppColors.loginButtonColor,
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle:{
                        backgroundColor: AppColors.mainColor,
                        height:50,
                    },
                    tabBarIcon: ({ color, size }) => <Icon name={getTabBarIcon(route.name)} size={size} color={color} />,
                })}>

                <Tab.Screen name="Home" component={HomeScreen} />

            </Tab.Navigator>
        )
    }

    return(
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name={"HomeTabs"} component={HomeTabs}/>

                <Stack.Screen name={"Login"} component={LoginScreen}/>
                <Stack.Screen name={"SignUp"} component={SignUpScreen}/>

            </Stack.Navigator>

        </NavigationContainer>
    )
}
