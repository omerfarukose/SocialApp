import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../values/Colors";
import { MyButton } from "../components/MyButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MyNavbar } from "../components/MyNavbar";

export const ProfileScreen = ( ) => {

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}>

            <MyNavbar/>

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

                        <View
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

                        </View>

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

                        <View
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

                        </View>

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

            </View>

        </SafeAreaView>
    )
}
