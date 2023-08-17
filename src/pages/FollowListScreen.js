import { FlatList } from "react-native";
import React from "react";
import { MyUserItem } from "../components/MyUserItem";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";

export const FollowListScreen = ({ route }) => {

    let { userList } = route.params;
    
    return(
        <MyMainLayout showGoBack={true}>

            <FlatList
                overScrollMode={"never"}
                data={userList}
                renderItem={({item}) => <MyUserItem userId={item}/>}
                keyExtractor={(item, index) => item}/>

        </MyMainLayout>
    )
}
