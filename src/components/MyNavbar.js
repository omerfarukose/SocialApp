import { Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../values/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { goBack } from "../pages/Router/RootNavigation";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


export const MyNavbar = ( props ) => {

    let { showGoBack } = props;

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

        </View>
    )
}
