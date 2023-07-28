import { Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../values/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { goBack, navigate } from "../pages/Router/RootNavigation";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import auth from '@react-native-firebase/auth';


export const MyNavbar = ( props ) => {

    let { showGoBack, showLogout } = props;

    const _handleSignOut = ( ) => {
        auth()
            .signOut()
            .then(() => {
                navigate("Login");
            });
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
                    onPress={() => goBack()}>

                    <Icon name={"arrow-left"} size={hp(2.4)} color={"white"} />

                </TouchableOpacity>
            }

            <Text
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: hp(3.5),
                    position: "absolute",
                    alignSelf: "center",
                }}>

                social

            </Text>

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
