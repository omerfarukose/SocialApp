import { Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const MyButton = ( props )  => {

    let { color, title, onPress, textStyle, style } = props;

    let { theme } = useContext(ThemeContext);

    return(
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: color ? color : theme.loginButtonColor,
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
