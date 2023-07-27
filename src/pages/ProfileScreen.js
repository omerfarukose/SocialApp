import { Image, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { AppColors } from "../values/Colors";
import { MyButton } from "../components/MyButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MyNavbar } from "../components/MyNavbar";
import { TabView, SceneMap } from 'react-native-tab-view';
import React from "react";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";



export const ProfileScreen = ( ) => {
    const layout = useWindowDimensions();

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return(
        <MyMainLayout>

            <View
                style={{
                    width: "100%",
                }}>

                {/*banner*/}
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "orange"
                    }}>

                    <Image
                        source={require("../assets/images/banner.jpg")}
                        style={{
                            width: "100%",
                            height: 150,
                        }}/>

                </View>

                {/*info view*/}
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}>

                    <View
                        style={{
                            flexDirection: "row",
                        }}>

                        <TouchableOpacity
                            onPress={() => navigate("FollowList")}
                            style={{
                                alignItems: "center",
                                marginTop: 20,
                            }}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: AppColors.mainColor,
                                }}>

                                100

                            </Text>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: AppColors.mainColor,
                                }}>

                                Following

                            </Text>

                        </TouchableOpacity>

                        <Image
                            source={{uri: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"}}
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 99,
                                borderWidth: 2,
                                borderColor: AppColors.mainColor,
                                marginTop: -65,
                            }}/>

                        <TouchableOpacity
                            onPress={() => navigate("FollowList")}
                            style={{
                                alignItems: "center",
                                marginTop: 20,
                            }}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: AppColors.mainColor,
                                }}>

                                100

                            </Text>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: AppColors.mainColor,
                                }}>

                                Follower

                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            marginTop: 20,
                        }}>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: hp(4),
                                color: AppColors.mainColor,
                            }}>

                            Ömer Faruk

                        </Text>

                        <MyButton
                            style={{
                                backgroundColor: "white",
                                borderColor: AppColors.mainColor,
                                borderWidth: 2,
                                borderRadius: 20,
                                alignItems: "center",
                                marginTop: 20,
                            }}
                            textStyle={{
                                color: AppColors.mainColor,
                                fontWeight: "bold",
                            }}
                            title={"Follow"}/>

                    </View>

                </View>


                {/*post & likes*/}
                {/*                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />*/}

            </View>

        </MyMainLayout>
    )
}
