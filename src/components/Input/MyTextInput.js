import { TextInput } from "react-native";

export const MyTextInput = ( props ) => {

    let { value, setValue, placeholder } = props;
    
    return(
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={{
                backgroundColor: "white",
                width: "80%",
                borderRadius: 10,
                paddingLeft: 10
            }}/>
    )
}
