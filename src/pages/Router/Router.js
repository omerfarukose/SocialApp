import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../Authentication/LoginScreen";
import { SignUpScreen } from "../Authentication/SignUpScreen";
import { HomeScreen } from "../HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProfileScreen } from "../ProfileScreen";
import { FollowListScreen } from "../FollowListScreen";
import {navigate, navigationRef} from "./RootNavigation";
import { AddPostScreen } from "../AddPostScreen";
import auth from '@react-native-firebase/auth';
import { UserProfileScreen } from "../UserProfileScreen";
import { SettingsScreen } from "../SettingsScreen";
import {useContext, useEffect} from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import {Platform} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import SyncStorage from "sync-storage";
import {GetUserInfoByEmail} from "../../helper/functions/firebase/Firestore";
import {UserContext} from "../../contexts/UserContext";

export const Router = ( ) => {

    let { theme } = useContext(ThemeContext);
    let { setUserAvatar, setUserLikes, setUserPosts } = useContext(UserContext);
    
    let currentUser = auth().currentUser;
    console.log("current user : ", currentUser)
    
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    
    useEffect(() => {
        _initStorage();
        
        _checkUser();
    }, []);
    
    const _checkUser = ( ) => {
        if (currentUser) {
            GetUserInfoByEmail(currentUser.email)
                .then((userInfo) => {
                    SyncStorage.set('userId', userInfo.id);
                    SyncStorage.set('username', userInfo.username);
                    console.log("login user info : ", userInfo)
                    setUserAvatar(userInfo.avatar);
                    setUserLikes(userInfo.likes);
                    setUserPosts(userInfo.posts);
                })
        }

    }
    
    const _initStorage = async ( ) => {
        const data = await SyncStorage.init();
        console.log('AsyncStorage is ready!', data);
    }

    const getTabBarIcon = ( routeName ) => {
        let iconName;

        switch (routeName) {
            case 'HomeStack':
                iconName = 'home';
                break;
            case 'AddPost':
                iconName = 'plus';
                break;
            case 'ProfileStack':
                iconName = 'user-alt';
                break;
        }

        return iconName;
    }
    
    function onTabPress(route) {
        navigate(route)
    }

    function HomeTabs() {
        return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#086767",
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle:{
                        backgroundColor: theme.mainColor,
                        height: Platform.OS === "ios" ? hp(10) : hp(6.3),
                    },
                    tabBarIcon: ({ color, size }) => <Icon name={getTabBarIcon(route.name)} size={size} color={color} />,
                })}>

                <Tab.Screen
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            onTabPress("Home")
                        },
                    })}
                    name="HomeStack"
                    component={HomeStack}/>
                
                <Tab.Screen name="AddPost" component={AddPostScreen} />
                
                <Tab.Screen
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            onTabPress("Profile")
                        },
                    })}
                    name="ProfileStack" component={ProfileStack} />

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
                <Stack.Screen name={"UserProfile"} component={UserProfileScreen}/>
                <Stack.Screen name={"Settings"} component={SettingsScreen}/>

            </Stack.Navigator>
        )
    }

    function HomeStack(){
        return(
            <Stack.Navigator
                initialRouteName={"Home"}
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name={"Home"} component={HomeScreen}/>
                <Stack.Screen name={"UserProfile"} component={UserProfileScreen}/>
                <Stack.Screen name={"FollowList"} component={FollowListScreen}/>

            </Stack.Navigator>
        )
    }

    return(
        <NavigationContainer
            ref={navigationRef}>

            <Stack.Navigator
                initialRouteName={currentUser ? "HomeTabs" : "Login"}
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
