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
            }}>

            {/*image & text*/}
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 20,
                }}>

                <Image
                    source={{uri: "https://cdn1.ntv.com.tr/gorsel/1eHc83UgkUWFddmDZb5Smw.jpg?width=1000&mode=crop&scale=both"}}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 99,
                        borderWidth: 2,
                        borderColor: AppColors.mainColor,
                    }}/>

                <Text
                    style={{
                        flex: 1,
                        padding: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                    }}>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

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
