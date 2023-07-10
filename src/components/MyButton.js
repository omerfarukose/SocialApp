import { Text, TouchableOpacity } from "react-native";
import { AppColors } from "../values/Colors";

export const MyButton = ( props )  => {

    let { color, title, onPress, textStyle, style } = props;

    return(
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: color ? color : AppColors.loginButtonColor,
                borderRadius: 10,
                padding: 10,
                paddingHorizontal: 30,
                ...style
            }}>

            <Text
                style={{
                    color: "white",
                    ...textStyle
                }}>

                { title }

            </Text>

        </TouchableOpacity>
    )
}
