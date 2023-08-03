import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../values/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { goBack, navigate } from "../pages/Router/RootNavigation";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Logout } from "../helper/functions/firebase/Auth";

export const MyNavbar = ( props ) => {

    let { showGoBack, showLogout } = props;

    const _handleSignOut = ( ) => {
        Logout()
            .then(() => {
                navigate("Login");
            })
    }

    return(
        <View
            style={{
                backgroundColor: AppColors.mainColor,
                width: "100%",
                height: 50,
                alignItems: "flex-start",
                justifyContent: "center"
            }}>

            {
                showGoBack &&
                <TouchableOpacity
                    style={{
                        marginLeft: hp(2),
                    }}
                    onPress={() => {
                        console.log("Go Back !!!");
                        goBack();
                    }}>

                    <Icon name={"arrow-left"} size={hp(2.4)} color={"white"} />

                </TouchableOpacity>
            }

            <Image
                source={require("../assets/images/logo.png")}
                style={{
                    height: "85%",
                    resizeMode: "contain",
                    position: "absolute",
                    alignSelf: "center",
                }}/>

            {
                showLogout &&
                <TouchableOpacity
                    style={{
                        marginLeft: hp(2),
                    }}
                    onPress={() => _handleSignOut()}>

                    <Icon name={"sign-in-alt"} size={hp(2.4)} color={"white"} />

                </TouchableOpacity>
            }

        </View>
    )
}
