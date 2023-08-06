import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { goBack, navigate } from "../pages/Router/RootNavigation";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const MyNavbar = ( props ) => {

    let { theme } = useContext(ThemeContext);

    let { showGoBack, showLogout, showSettings } = props;

    return(
        <View
            style={{
                backgroundColor: theme.mainColor,
                width: "100%",
                height: 50,
                justifyContent: "center"
            }}>

            <Image
                source={require("../assets/images/logo.png")}
                style={{
                    height: "85%",
                    resizeMode: "contain",
                    position: "absolute",
                    alignSelf: "center",
                }}/>

            {
                showGoBack &&
                <TouchableOpacity
                    style={{
                        marginLeft: hp(2),
                    }}
                    onPress={() => {
                        goBack();
                    }}>

                    <Icon name={"arrow-left"} size={hp(2.4)} color={"white"} />

                </TouchableOpacity>
            }

{/*            {
                showLogout &&
                <TouchableOpacity
                    style={{
                        marginLeft: hp(2),
                    }}
                    onPress={() => _handleSignOut()}>

                    <Icon name={"sign-in-alt"} size={hp(2.4)} color={"white"} />

                </TouchableOpacity>
            }*/}

            {
                showLogout &&
                <TouchableOpacity
                    style={{
                        marginRight: hp(2),
                        alignSelf: "flex-end"
                    }}
                    onPress={() => navigate("Settings")}>

                    <Feather name={"settings"} size={hp(2.5)} color={"white"} />

                </TouchableOpacity>
            }

        </View>
    )
}
