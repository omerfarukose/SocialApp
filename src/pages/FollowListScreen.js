import { FlatList, ScrollView, View } from "react-native";
import React from "react";
import { MyUserItem } from "../components/MyUserItem";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { MyCardView } from "../components/MyCardView";

export const FollowListScreen = ({ route }) => {

    let { userList } = route.params;

    console.log("userlist : ", userList);

    // TODO: use flatList instead of ScrollView

    return(
        <MyMainLayout
            showGoBack={true}>

            <FlatList
                overScrollMode={"never"}
                data={userList}
                renderItem={({item}) => <MyUserItem userId={item}/>}
                keyExtractor={(item, index) => item}/>

        </MyMainLayout>
    )
}
