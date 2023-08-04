import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { MyButton } from "../components/MyButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Switch, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const SettingsScreen = ( ) => {

    const [isDark, setIsDark] = useState(false);

    let { setIsDarkTheme } = useContext(ThemeContext);

    const toggleSwitch = () => {
        setIsDarkTheme(!isDark);

        setIsDark(!isDark);
    };

    return(
        <MyMainLayout
            layoutStyle={{
                padding: hp(3)
            }}>

            <View
                style={{
                    flexDirection: "row",
                    width: wp(85),
                    height: hp(5),
                    backgroundColor: "#eceff1",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: wp(5),
                    marginBottom: hp(2),
                }}>

                <Text>
                    Dark Theme
                </Text>

                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDark}/>

            </View>



            <MyButton
                title={"Tema"}
                textStyle={{
                    fontWeight: "bold",
                    fontSize: hp(2.4)
                }}
                style={{
                    width: wp(85),
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    marginBottom: hp(2)
                }}/>

            <MyButton
                title={"Çıkış Yap"}
                textStyle={{
                    fontWeight: "bold",
                    fontSize: hp(2.4)
                }}
                style={{
                    width: wp(85),
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                }}/>

        </MyMainLayout>
    )
}
