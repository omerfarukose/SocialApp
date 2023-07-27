import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../Authentication/LoginScreen";
import { SignUpScreen } from "../Authentication/SignUpScreen";
import { HomeScreen } from "../HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppColors } from "../../values/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProfileScreen } from "../ProfileScreen";
import { FollowListScreen } from "../FollowListScreen";
import { navigationRef } from "./RootNavigation";
import { AddPostScreen } from "../AddPostScreen";

export const Router = ( ) => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const getTabBarIcon = ( routeName ) => {
        let iconName;

        switch (routeName) {
            case 'Home':
                iconName = 'home';
                break;
            case 'AddPost':
                iconName = 'plus';
                break;
            case 'ProfileStack':
                iconName = 'user';
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
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle:{
                        backgroundColor: AppColors.mainColor,
                        height:50,
                    },
                    tabBarIcon: ({ color, size }) => <Icon name={getTabBarIcon(route.name)} size={size} color={color} />,
                })}>

                <Tab.Screen name="Home" component={HomeScreen} />

                <Tab.Screen name="AddPost" component={AddPostScreen} />

                <Tab.Screen name="ProfileStack" component={ProfileStack} />

            </Tab.Navigator>
        )
    }

    function ProfileStack(){
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name={"Profile"} component={ProfileScreen}/>
                <Stack.Screen name={"FollowList"} component={FollowListScreen}/>

            </Stack.Navigator>
        )
    }

    return(
        <NavigationContainer
            ref={navigationRef}>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name={"Login"} component={LoginScreen}/>
                <Stack.Screen name={"SignUp"} component={SignUpScreen}/>
                <Stack.Screen name={"HomeTabs"} component={HomeTabs}/>

            </Stack.Navigator>

        </NavigationContainer>
    )
}
