import React, {useContext, useEffect, useState} from "react";
import {
    FlatList, Keyboard, KeyboardAvoidingView, View,
    Platform, Text, TouchableOpacity, TouchableWithoutFeedback,
} from "react-native";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { MyTextInput } from "../components/Input/MyTextInput";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { GetUserInfoByUsername } from "../helper/functions/firebase/Firestore";
import { MyUserItem } from "../components/MyUserItem";
import { ThemeContext } from "../contexts/ThemeContext";
import { MyActivityIndicator } from "../components/MyActivityIndicator";
import Icon from 'react-native-vector-icons/FontAwesome5';

export const SearchScreen = ({ navigation }) => {
    
    let { theme } = useContext(ThemeContext);
    
    const [searchValue, setSearchValue] = useState("");
    const [searchResultList, setSearchResultList] = useState([]);
    const [isReady, setIsReady] = useState(true);
    const [showUserNotFound, setShowUserNotFound] = useState(false);
    
    useEffect(() => {
        return(() => {
            setSearchResultList([]);
            setSearchValue("");
        })
    }, [navigation])
    
    // check is username exist in database
    const _handleSearch = ( ) => {
        setIsReady(false);
        setSearchResultList([]);
        setShowUserNotFound(false);
        
        GetUserInfoByUsername(searchValue)
            .then((userInfo) => {
                setSearchResultList(current => [...current, userInfo]);
            })
            .catch(() => setShowUserNotFound(true))
            .finally(() => setIsReady(true))
    }
    
    return(
        <MyMainLayout>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1}}>
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                    <View
                        style={{
                            flex: 1
                        }}>
                        
                        {/* search bar */}
                        <View
                            style={{
                                flexDirection: "row",
                                margin: hp(2),
                                alignItems: "center",
                                borderColor: "gray",
                                borderBottomWidth: 0.5,
                                borderRadius: 10
                            }}>
                            
                            <MyTextInput
                                placeholder={"Kullanıcı Ara"}
                                value={searchValue}
                                setValue={setSearchValue}/>
                            
                            {
                                searchValue ?
                                    
                                    <TouchableOpacity onPress={() => _handleSearch()}>
                                        
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: theme.secondColor
                                            }}>
                                            
                                            Ara
                                            
                                        </Text>
                                    
                                    </TouchableOpacity>
                                    
                                    :
                                    
                                    <Icon name={"search"} size={hp(2.4)} color={"gray"} />
                                    
                            }
                        
                        </View>
                        
                        {
                            showUserNotFound &&
                            
                            <View
                                style={{
                                    width: "100%",
                                    alignItems: "center",
                                }}>
                                
                                <Text
                                    style={{
                                        fontSize: hp(2)
                                    }}>
                                    
                                    Kullanıcı bulunamadı
                                
                                </Text>
                            
                            </View>
                            
                        }
                        
                        {
                            isReady ?
                                
                                <FlatList
                                    overScrollMode={"never"}
                                    data={searchResultList}
                                    keyExtractor={(item, index) => item}
                                    renderItem={({item}) => {
                                        return(
                                            <MyUserItem
                                                showDelete={true}
                                                userInfo={item}
                                                onDeletePress={() => {
                                                    setSearchResultList([]);
                                                }}/>
                                        )
                                    }}/>
                                
                                :
                                
                                <MyActivityIndicator/>
                                
                        }
                        
                    </View>
                
                </TouchableWithoutFeedback>
            
            </KeyboardAvoidingView>
            
        </MyMainLayout>
    )
}
