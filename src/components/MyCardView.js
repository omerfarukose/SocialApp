import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColors } from "../values/Colors";
import { MyIconButton } from "./MyIconButton";

export const MyCardView = ( props ) => {

    let { cardData } = props;

    return(
        <View
            style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#d7d5d5"
            }}>

            {/*image & text*/}
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    alignItems: "flex-start",
                }}>

                <Image
                    source={{uri: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"}}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 99,
                        borderWidth: 2,
                        borderColor: AppColors.mainColor,
                    }}/>

                <Text
                    style={{
                        flex: 1,
                        padding: 10,
                        fontWeight: "bold",
                        fontSize: 15,
                    }}>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

                </Text>

            </View>

            {/*button group*/}
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}>

                <MyIconButton
                    iconName={"retweet"}/>

                <MyIconButton
                    iconName={"heart"}/>

            </View>

        </View>
    )
}
