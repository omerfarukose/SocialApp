import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppColors } from "../values/Colors";

export const MyIconButton = ( props ) => {

    let { iconName, onPress, style, iconSize, iconColor }  = props;

    return(
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...style
            }}>

            <Icon name={iconName ? iconName : "home"} size={iconSize ? iconSize : 20} color={iconColor ? iconColor : AppColors.mainColor} />

        </TouchableOpacity>
    )
}
