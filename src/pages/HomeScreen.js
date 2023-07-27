import { ScrollView } from "react-native";
import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { useEffect } from "react";

export const HomeScreen = ( ) => {

    useEffect(() => {

        // get all posts

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
