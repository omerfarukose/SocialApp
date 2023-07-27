import { FlatList, ScrollView } from "react-native";
import React from "react";
import { MyUserItem } from "../components/MyUserItem";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";

export const FollowListScreen = (props) => {

    let { userList } = props;

    // TODO: use flatList instead of ScrollView

    return(
        <MyMainLayout
            showGoBack={true}>


            <ScrollView
                overScrollMode={"never"}
                style={{
                    flex: 1,
                }}>

                <MyUserItem/>
                <MyUserItem/>
                <MyUserItem/>
                <MyUserItem/>

            </ScrollView>

        </MyMainLayout>
    )
}
