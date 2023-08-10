import {MyMainLayout} from "../components/MainLayout/MyMainLayout";
import {Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View} from "react-native";
import {MyTextInput} from "../components/Input/MyTextInput";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from "react";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const SearchScreen = ( ) => {
    
    const [searchValue, setSearchValue] = useState("");
    
    return(
        <MyMainLayout>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1}}>
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                    <View
                        style={{
                            flexDirection: "row",
                            margin: hp(2),
                            alignItems: "center",
                            borderColor: "gray",
                            borderWidth: 1,
                            borderRadius: 10
                        }}>
                        
                        <MyTextInput
                            placeholder={"Kullanıcı Ara"}
                            value={searchValue}
                            setValue={setSearchValue}/>
                        
                        <Icon name={"search"} size={hp(2.4)} color={"gray"} />
                    
                    </View>
                
                </TouchableWithoutFeedback>
            
            </KeyboardAvoidingView>
            
        </MyMainLayout>
    )
}
