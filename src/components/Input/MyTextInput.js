import {TextInput, View} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const MyTextInput = ( props ) => {

    let { value, setValue, placeholder, inputStyle, secureText, multiline, autoFocus } = props;

    return(
        <View
            style={{
                backgroundColor: "white",
                borderRadius: 10,
                paddingLeft: 10,
                width: wp(80),
                height: hp(5),
                justifyContent: "center",
                ...inputStyle,
            }}>

            <TextInput
                autoFocus={autoFocus}
                value={value}
                autoCorrect={false}
                autoCapitalize={"none"}
                onChangeText={setValue}
                multiline={multiline}
                placeholder={placeholder}
                secureTextEntry={secureText}/>

        </View>

    )
}
