import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const MyIconButton = ( props ) => {

    let { iconName, onPress, style, iconSize, iconColor }  = props;

    let { theme } = useContext(ThemeContext);

    return(
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...style
            }}>

            <Icon name={iconName ? iconName : "home"} size={iconSize ? iconSize : hp(2)} color={iconColor ? iconColor : theme.mainColor} />

        </TouchableOpacity>
    )
}
