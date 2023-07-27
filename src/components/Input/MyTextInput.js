import { TextInput } from "react-native";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const MyTextInput = ( props ) => {

    let { value, setValue, placeholder, inputStyle } = props;

    return(
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            multiline={true}
            style={{
                backgroundColor: "white",
                width: wp(80),
                borderRadius: 10,
                paddingLeft: 10,
                alignItems: "flex-start",
                ...inputStyle,
            }}/>
    )
}
