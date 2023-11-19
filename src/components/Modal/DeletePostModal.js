import { useContext } from "react";
import { CommonContext } from "../../contexts/CommonContext";
import Modal from "react-native-modal";
import { View, Text } from "react-native";
import { MyButton } from "../MyButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";


export const DeletePostModal = ( props ) => {

    let {isDeleteModalVisible, setIsDeleteModalVisible} = useContext(CommonContext);

    return(
        <Modal
            isVisible={isDeleteModalVisible}
            onBackdropPress={() => setIsDeleteModalVisible(false)}
            swipeDirection="down"
            onSwipeComplete={() => setIsDeleteModalVisible(false)}
            propagateSwipe
            swipeThreshold={100}
            backdropOpacity={0.2}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}>
                
                {/*modal view*/}
                <View
                    style={{
                        width: wp(100),
                        height: hp(35),
                        alignItems: "center",
                        borderRadius: 20,
                        backgroundColor: "white",
                        borderColor: "#eceff1",
                        borderWidth: 1
                    }}>

                    {/* header */}
                    <View
                        style={{
                            height: hp(9),
                            width: wp(100),
                            backgroundColor: "#FEDADC",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }}>

                        {/* line */}
                        <View
                            style={{
                                width: "30%",
                                height: 5,
                                backgroundColor: "white",
                                position: "absolute",
                                top: 10,
                                borderRadius: 100
                            }}/>

                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#FC485B",
                                height: hp(9),
                                width: hp(9),
                                borderRadius: 100,
                                marginBottom: -hp(4.5)
                            }}>

                            <Icon name={"warning"} size={hp(4)} color={"white"} />

                        </View>

                    </View>
                
                    {/* content */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "space-evenly",
                            paddingTop: hp(3),
                        }}>

                        {/* title */}
                        <Text
                            numberOfLines={2}
                            style={{
                                width: "100%",
                                textAlign: "center",
                                alignSelf: "center",
                                color: "#514f59",
                                fontSize: hp(2),
                                fontWeight: "500"
                            }}>
                            
                            Postu silmek istediğinden emin misin ?
                            
                        </Text> 

                        {/* button group */}
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}>

                            <MyButton
                                title={"İptal"}
                                color={"#2C2C30"}
                                onPress={() => setIsDeleteModalVisible(false)}
                                textStyle={{
                                    fontSize: hp(1.7),
                                    fontWeight: "700",
                                    color: "white",
                                }}
                                style={{
                                    width: wp(30),
                                    alignItems: "center",
                                    borderRadius: 100,
                                    borderColor: "#2C2C30",
                                    borderWidth: 1,
                                }}/>

                            <MyButton
                                title={"Sil"}
                                color={"#FC485B"}
                                textStyle={{
                                    fontSize: hp(1.7),
                                    fontWeight: "700"
                                }}
                                style={{
                                    width: wp(30),
                                    alignItems: "center",
                                    borderRadius: 100
                                }}/>
                            
                        </View>

                    </View>

                </View>
            
        </Modal>
    )
}