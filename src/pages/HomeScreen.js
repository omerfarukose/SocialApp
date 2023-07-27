import { ScrollView } from "react-native";
import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { useEffect, useState } from "react";

export const HomeScreen = ( ) => {

    const [postList, setPostList] =  useState([]);

    useEffect(() => {
        // TODO: get all post, use flatlist instead of scroll view
    }, [])

    return(
        <MyMainLayout>

            <ScrollView
                overScrollMode={"never"}
                style={{
                    flex: 1,
                }}>

                <MyCardView/>
                <MyCardView/>
                <MyCardView/>
                <MyCardView/>
                <MyCardView/>
                <MyCardView/>

            </ScrollView>

        </MyMainLayout>
    )
}
