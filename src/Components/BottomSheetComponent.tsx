import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import WholeButton from "./WholeButton";
import Modal from "react-native-modal";
import BottomSheet from "@gorhom/bottom-sheet";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetComponent: React.FC<{
  children: any;
}> = ({ children }) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    //   <Modal
    //     isVisible={openModal}
    //     onSwipeComplete={() => setOpenModal(false)}
    //     swipeDirection="down"
    //     backdropColor="rgba(0,0,0,0.4)"
    //     onBackdropPress={() => setOpenModal(false)}
    //     onBackButtonPress={() => setOpenModal(false)}
    //     style={[Style.container]}
    //   >
    //     <View style={Style.innercontainer}>
    //       <View style={Style.CancelrideView}>
    //         <Text
    //           style={[
    //             Style.textStyle,
    //             { fontWeight: Platform.OS === "ios" ? "600" : "bold" },
    //           ]}
    //         >
    //           Cancel Your Rider Request
    //         </Text>
    //         <TouchableOpacity
    //           onPress={() => {
    //             setOpenModal(false);
    //           }}
    //           style={{
    //             alignSelf: "center",
    //             marginTop: "2.9%",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Image source={IMAGEPATH.Cross} style={Style.CrossImage} />
    //           {/* <VECTOR_ICONS.Entypo name="cross" size={30} color={"#4A4A4A"} /> */}
    //         </TouchableOpacity>
    //       </View>

    //       <View style={Style.CancelrideLineView}></View>

    //       <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
    //         <Text
    //           style={[
    //             Style.textStyle1,
    //             { fontWeight: Platform.OS === "ios" ? "500" : "400" },
    //           ]}
    //         >
    //           Select the reason for canceling.
    //         </Text>
    //         <View style={[Style.CheckView, { marginTop: "5%" }]}>
    //           <View style={{ paddingRight: "5%" }}>
    //             {change == true ? (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   // setchange(1);
    //                   setchange1(false);
    //                   setchange2(false);
    //                 }}
    //               >
    //                 <VECTOR_ICONS.Fontisto
    //                   name="radio-btn-active"
    //                   size={18}
    //                   color={COLORS.ORANGE}
    //                 />
    //               </TouchableOpacity>
    //             ) : (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   setchange(true);
    //                   setchange1(false);
    //                   setchange2(false);
    //                 }}
    //               >
    //                 <VECTOR_ICONS.Fontisto
    //                   name="radio-btn-passive"
    //                   size={20}
    //                   color={"#CDCDCD"}
    //                 />
    //               </TouchableOpacity>
    //             )}
    //           </View>
    //           <Text style={Style.textStyle1}>Change in Plans</Text>
    //         </View>
    //         <View style={[Style.CheckView]}>
    //           <View style={{ paddingRight: "5%" }}>
    //             {change1 == true ? (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   // setchange1(0);
    //                   setchange(false);
    //                   setchange2(false);
    //                 }}
    //               >
    //                 <VECTOR_ICONS.Fontisto
    //                   name="radio-btn-active"
    //                   size={18}
    //                   color={COLORS.ORANGE}
    //                 />
    //               </TouchableOpacity>
    //             ) : (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   setchange(false);
    //                   setchange1(true);
    //                   setchange2(false);
    //                 }}
    //               >
    //                 <VECTOR_ICONS.Fontisto
    //                   name="radio-btn-passive"
    //                   size={20}
    //                   color={"#CDCDCD"}
    //                 />
    //               </TouchableOpacity>
    //             )}
    //           </View>
    //           <Text style={Style.textStyle1}>Emergent Circumstances</Text>
    //         </View>
    //         <View style={[Style.CheckView]}>
    //           <View style={{ paddingRight: "5%" }}>
    //             {change2 == true ? (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   setchange1(false);
    //                   setchange(false);
    //                   // setchange2(1);
    //                 }}
    //               >
    //                 <VECTOR_ICONS.Fontisto
    //                   name="radio-btn-active"
    //                   size={18}
    //                   color={COLORS.ORANGE}
    //                 />
    //               </TouchableOpacity>
    //             ) : (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   setchange(false);
    //                   setchange1(false);
    //                   setchange2(true);
    //                 }}
    //               >
    //                 <VECTOR_ICONS.Fontisto
    //                   name="radio-btn-passive"
    //                   size={20}
    //                   color={"#CDCDCD"}
    //                 />
    //               </TouchableOpacity>
    //             )}
    //           </View>
    //           <Text style={Style.textStyle1}>Other</Text>
    //         </View>

    //         <WholeButton
    //           Label="Cancel"
    //           styles={{
    //             alignSelf: "center",
    //             marginTop: "5.5%",
    //             backgroundColor: COLORS.BuleText,
    //           }}
    //           //   Action={() => {}}
    //         />
    //       </View>
    //     </View>
    //   </Modal>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>{children}</View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    // alignItems: "center",
  },
});
