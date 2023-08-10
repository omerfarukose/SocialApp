import {MyMainLayout} from "../components/MainLayout/MyMainLayout";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {MyTextInput} from "../components/Input/MyTextInput";
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from "react";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MyCardView} from "../components/MyCardView";
import {GetUserInfoByUsername} from "../helper/functions/firebase/Firestore";
import {MyUserItem} from "../components/MyUserItem";

export const SearchScreen = ( ) => {
    
    const [searchValue, setSearchValue] = useState("");
    const [searchResultList, setSearchResultList] = useState([]);
    
    const _handleSearch = ( ) => {
        setSearchResultList([]);
        
        GetUserInfoByUsername(searchValue)
            .then((userInfo) => {
                setSearchResultList(current => [...current, userInfo])
            })
    }
    
    return(
        <MyMainLayout>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1}}>
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                    <View>
                        
                        {/* search bar */}
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
                            
                            <TouchableOpacity
                                onPress={() => _handleSearch()}>
                                
                                <Icon name={"search"} size={hp(2.4)} color={"gray"} />
                            
                            </TouchableOpacity>
                        
                        </View>
                        
                        <FlatList
                            overScrollMode={"never"}
                            data={searchResultList}
                            renderItem={({item}) => <MyUserItem userInfo={item}/>}
                            keyExtractor={(item, index) => item}/>
                        
                    </View>
                
                </TouchableWithoutFeedback>
            
            </KeyboardAvoidingView>
            
        </MyMainLayout>
    )
}
