// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   Image,
//   StatusBar,
//   Platform,
//   Alert,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
// import Header from "../../Components/HeaderComponent";
// import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
// import VehicleType from "../../Components/ProfileSvg/VehicleType";
// import StandardType from "../../Components/ProfileSvg/StandardType";
// import UploadSvgImage from "../../Components/ProfileSvg/UploadSvgImage";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import WholeButton from "../../Components/WholeButton";
// import RegistationSuccessPopUp from "../../Components/RegistationSuccessPopUp";
// import {
//   ValidateLicenceNO,
//   Validate_BookLet,
//   Validate_CarLicence,
//   Validate_DLLicenceNO,
//   Validate_Insurance,
//   Validate_MOT,
//   Validate_MSGBox,
//   Validate_Vhehical,
// } from "../../Components/Validations";
// import { IOS } from "../../Helpers/Platform";
// import ImagePicker from "react-native-image-crop-picker";
// import DatePicker from "react-native-date-picker";
// import moment from "moment";

// import {
//   saveBOOKLET,
//   saveBOOKLET_DOC,
//   saveCAR_LICENSE,
//   saveCAR_LICENSE_DOC,
//   saveDRIVER_LICENSE,
//   saveDRIVER_LICENSE_DOC,
//   saveFRONTAL_PATH,
//   saveINSURANCE,
//   saveINSURANCE_DOC,
//   saveMOT,
//   saveMOT_DOC,
//   saveOTHER,
//   savePCO_VEHICAL_LICENSE,
//   savePCO_VEHICAL_LICENSE_DOC,
//   saveVEHICAL_CLASS,
//   saveVEHICAL_LOGBOOK,
//   saveVEHICAL_LOGBOOK_DOC,
//   saveVEHICAL_OWNER,
//   saveVEHICAL_TYPE,
// } from "../../ReduxConfig/VehicleDetailsSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "../../ReduxConfig/Store";
// import axios from "axios";
// import {
//   UploadProfile,
//   driverRequestData,
// } from "../../Components/ApiConfig/EndPoints";
// import SpinningLoader from "../../assets/SpinningLoader";
// import { showMessage } from "react-native-flash-message";

// const EditDocumnets = (props: any) => {
//   const [Loader, setLoader] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const { token } = useSelector(
//     (state: RootState) => state?.TokenUserID_DETAILS?.userTokenAndId
//   );

//   const modalAndLoaderHandler = () => {
//     setLoader(false);
//     setIsModalVisible(true);
//     setTimeout(() => {
//       setIsModalVisible(false);
//       props.navigation.navigate("HomeOnline");
//     }, 2000);
//   };
//   const [documentData, setDocumentData] = useState([
//     { id: 1, name: "", details: "", imageUrl: "" },
//   ]);

//   const [errors, setErrors] = useState({
//     name: "",
//     details: "",
//     imageUrl: "",
//   });

//   const validateField = (field, value) => {
//     switch (field) {
//       case "name":
//         if (!value.trim()) {
//           return "Document name is required.";
//         }
//         return "";
//       case "details":
//         if (!value.trim()) {
//           return "Document details are required.";
//         }
//         return "";
//       default:
//         return "";
//     }
//   };

//   const handleTextChange = (text, id, key) => {
//     const updatedData = documentData?.map((item) =>
//       item.id === id ? { ...item, [key]: text } : item
//     );
//     setDocumentData(updatedData);

//     // Validate the field and update the errors state
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [key]: validateField(key, text),
//     }));
//   };

//   const openGallery = async (id) => {
//     try {
//       const image = await ImagePicker.openPicker({
//         height: HEIGHT * 0.2,
//         width: WIDTH * 0.4,
//         cropping: true,
//         mediaType: "photo",
//         includeBase64: true,
//       });

//       const imageUrl = await uploadFile(image);

//       const updatedData = documentData?.map((item) =>
//         item.id === id ? { ...item, imageUrl } : item
//       );
//       setDocumentData(updatedData);

//       // Reset the error message for imageUrl field
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         imageUrl: "",
//       }));
//     } catch (error) {
//       console.log("Error selecting image:", error);
//     }
//   };

//   const onCamera = async (id) => {
//     try {
//       const image = await ImagePicker.openCamera({
//         height: HEIGHT * 0.2,
//         width: WIDTH * 0.4,
//         cropping: true,
//         mediaType: "photo",
//         includeBase64: true,
//       });

//       const imageUrl = await uploadFile(image);

//       const updatedData = documentData.map((item) =>
//         item.id === id ? { ...item, imageUrl } : item
//       );
//       setDocumentData(updatedData);

//       // Reset the error message for imageUrl field
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         imageUrl: "",
//       }));
//     } catch (error) {
//       console.log("Error selecting image:", error);
//     }
//   };

//   const onSelectImage = (id) => {
//     if (Platform.OS === "ios" || Platform.OS === "android") {
//       Alert.alert("Upload Image", "Choose an option", [
//         {
//           text: "Camera",
//           onPress: () => {
//             onCamera(id);
//           },
//         },
//         {
//           text: "Photo",
//           onPress: () => {
//             openGallery(id);
//           },
//         },
//         { text: "Cancel", onPress: () => {} },
//       ]);
//     }
//   };

//   const handleRemoveDocument = (id) => {
//     const updatedData = documentData?.filter((item) => item.id !== id);
//     setDocumentData(updatedData);
//   };

//   const handleAddNewDocument = () => {
//     const newId = documentData?.length + 1;
//     setDocumentData([
//       ...documentData,
//       { id: newId, name: "", details: "", imageUrl: "" },
//     ]);
//   };

//   const uploadFile = async (_file) => {
//     setLoader(true);
//     const formData = new FormData();
//     formData.append("file", {
//       uri: _file?.path,
//       type: _file?.mime,
//       name: `image_${new Date().getTime()}`,
//     });

//     try {
//       const response = await axios({
//         url: UploadProfile,
//         method: "POST",
//         headers: {
//           token: token,
//           "Content-Type": "multipart/form-data",
//         },
//         data: formData,
//       });
//       if (response?.status === 200) {
//         setLoader(false);
//         console.log("uploadfile", response?.data);
//         return response?.data?.result;
//       }
//       setLoader(false);
//     } catch (error) {
//       console.log("Error uploading file:", error);
//       setLoader(false);
//     }
//   };

//   const submitToAdmin = async () => {
//     // Validate all fields before submission
//     let isValid = true;
//     const newErrors = { name: "", details: "", imageUrl: "" };

//     documentData.forEach((item) => {
//       const nameError = validateField("name", item.name);
//       const detailsError = validateField("details", item.details);

//       if (nameError || detailsError) {
//         isValid = false;
//         newErrors[item.id] = {
//           name: nameError,
//           details: detailsError,
//         };
//       }
//     });

//     // Validate imageUrl field
//     documentData?.forEach((item) => {
//       if (!item.imageUrl) {
//         isValid = false;
//         newErrors[item.id] = {
//           ...newErrors[item.id],
//           imageUrl: "Image is required.",
//         };
//       }
//     });

//     if (!isValid) {
//       // If any field is invalid, update the errors state and prevent submission
//       setErrors(newErrors);
//       return;
//     }
//     try {
//       setLoader(true);
//       const res = await axios({
//         method: "post",
//         url: driverRequestData,
//         headers: {
//           token: token,
//         },
//         data: {
//           details: documentData?.details,
//           name: documentData?.name,
//           imageUrl: documentData?.imageUrl,
//         },
//       });
//       if (res?.data?.responseCode === 200) {
//         modalAndLoaderHandler();
//         showMessage({
//           message: res?.data?.responseMessage,
//           type: "success",
//           icon: "success",
//         });
//         setLoader(false);
//       }
//       console.log("update driver request success---->>>", res?.data);
//     } catch (error) {
//       console.log("update driver request failed---->>>", error.response);
//       showMessage({
//         message: "Internal Server Error",
//         type: "danger",
//         icon: "danger",
//       });
//       setLoader(false);
//     }
//     // Proceed with the submission if all fields are valid
//     console.log("Submitting data to admin:", documentData);
//     // Add logic here to handle the submission of documentData to the server or Redux
//   };

//   useEffect(() => {
//     setDocumentData([{ id: 1, name: "", details: "", imageUrl: "" }]);
//     setErrors([{ name: "", details: "", imageUrl: "" }]);
//   }, []);

//   return (
//     <>
//       <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
//       <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
//       <SafeAreaView style={styles.MainContainer}>
//         <Header Heading="Edit Document" navigation={props?.navigation} />

//         <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
//           <Text allowFontScaling={false} style={styles.HeadingONE}>
//             Vehicle Details
//           </Text>

//           {documentData?.map((item) => (
//             <View key={item.id} style={styles.documentCardContainer}>
//               <View style={styles.documentTopLabelContainer}>
//                 <Text allowFontScaling={false} style={styles.Label}>
//                   Document Name
//                 </Text>
//                 {item.imageUrl != "" ? (
//                   <Text
//                     allowFontScaling={false}
//                     onPress={() => handleRemoveDocument(item.id)}
//                     style={{
//                       // ...styles.LabelTEXT,
//                       ...styles.Label,
//                       color: "red",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Remove
//                   </Text>
//                 ) : null}
//               </View>
//               <View style={styles.UploadViewSTYLE}>
//                 <TextInput
//                   allowFontScaling={false}
//                   placeholder="Document name"
//                   placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
//                   style={styles.PhoneTextInput}
//                   value={item.name}
//                   onChangeText={(text) =>
//                     handleTextChange(text, item.id, "name")
//                   }
//                 />
//                 {!item?.imageUrl ? (
//                   <TouchableOpacity
//                     onPress={() => onSelectImage(item.id)}
//                     style={styles.UploadButton}
//                   >
//                     <UploadSvgImage />
//                     <Text allowFontScaling={false} style={styles.uploadTEXT}>
//                       Upload
//                     </Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() => {}}
//                     activeOpacity={1}
//                     style={styles.UploadButton}
//                   >
//                     <VECTOR_ICONS.Feather
//                       name={"check-circle"}
//                       color={COLORS.BLUE2}
//                       size={18}
//                     />
//                     <Text allowFontScaling={false} style={styles.uploadTEXT}>
//                       Done
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   width: WIDTH * 0.9,
//                   alignSelf: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {errors[item.id]?.name && (
//                   <Text allowFontScaling={false} style={styles.Errorstyle}>
//                     {errors[item.id]?.name}
//                   </Text>
//                 )}
//                 {errors[item.id]?.imageUrl && (
//                   <Text allowFontScaling={false} style={styles.Errorstyle}>
//                     {errors[item.id]?.imageUrl}
//                   </Text>
//                 )}
//               </View>

//               <Text allowFontScaling={false} style={styles.LabelTEXT}>
//                 Document Details (Document number or document expire date)
//               </Text>
//               <View style={styles.MessageBOX}>
//                 <TextInput
//                   allowFontScaling={false}
//                   placeholder="Please describe the details that to be updated..."
//                   placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
//                   style={styles.MessageBOXINPUT}
//                   multiline
//                   value={item.details}
//                   onChangeText={(text) =>
//                     handleTextChange(text, item.id, "details")
//                   }
//                 />
//               </View>
//               {errors[item.id]?.details && (
//                 <Text
//                   allowFontScaling={false}
//                   style={{ ...styles.Errorstyle, width: WIDTH * 0.9 }}
//                 >
//                   {errors[item.id]?.details}
//                 </Text>
//               )}
//             </View>
//           ))}

//           <WholeButton
//             styles={{
//               alignSelf: "center",
//               marginTop: "5%",
//             }}
//             Label={"Add more"}
//             Action={handleAddNewDocument}
//           />
//           <WholeButton
//             styles={{
//               alignSelf: "center",
//               marginTop: "5%",
//               marginBottom: "5%",
//               backgroundColor: "#3087D7",
//             }}
//             buttonText={{
//               textAlign: "center",
//             }}
//             Label="Send Request To Admin For Documents Update"
//             Action={() => submitToAdmin()}
//           />
//         </KeyboardAwareScrollView>
//         <RegistationSuccessPopUp
//           modalVisible={isModalVisible}
//           Message={"Dcoument submitted successfully"}
//           Congratulation={`We're almost there, your paperwork has been received, and we will reach out to you as soon as your details have been verified.`}
//         />
//       </SafeAreaView>
//       <SpinningLoader loader={Loader} />
//       <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
//     </>
//   );
// };

// export default EditDocumnets;

// const styles = StyleSheet.create({
//   documentCardContainer: {
//     borderTopColor: "gray",
//     borderTopWidth: 1,
//     marginTop: 10,
//     paddingTop: 10,
//   },
//   documentTopLabelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginHorizontal: "5%",
//     width: WIDTH * 0.9,
//   },
//   MainContainer: {
//     flex: 1,
//     backgroundColor: COLORS.WHITE,
//   },
//   HeadingONE: {
//     fontSize: 18,
//     fontFamily: FONTS.bold,
//     fontWeight: "700",
//     color: COLORS.BLACK3,
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//     paddingTop: "5%",
//   },
//   RequiredTEXT: {
//     fontSize: 12,
//     fontFamily: FONTS.medium,
//     color: COLORS.BLACK3,
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//   },
//   RequiredTEXT2: {
//     fontSize: 12,
//     fontFamily: FONTS.bold,
//     color: COLORS.BLACK3,
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//     paddingTop: "4%",
//   },
//   RadioButtonView: {
//     flexDirection: "row",
//     width: WIDTH * 0.6,
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   RedioEntireView: {
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//     marginTop: "3%",
//   },
//   Label: {
//     fontSize: 15,
//     fontFamily: FONTS.medium,
//     color: COLORS.BLACK3,
//     paddingVertical: "2.5%",
//   },
//   LabelTEXT: {
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//     fontSize: 15,
//     fontFamily: FONTS.medium,
//     color: COLORS.BLACK3,
//     paddingVertical: "2.5%",
//   },
//   PlaceHolderTEXT: {
//     fontSize: 14,
//     fontFamily: FONTS.light,
//     color: COLORS.PLACEHOLDERCOLOR2,
//     lineHeight: 17,
//     paddingLeft: "3%",
//   },
//   uploadTEXT: {
//     color: COLORS.BLUE2,
//     fontSize: 11,
//     fontFamily: FONTS.light,
//   },
//   UploadViewSTYLE: {
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: COLORS.UPLOADBorderCOLOR,
//     borderRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   UploadButton: {
//     backgroundColor: COLORS.UPLOADBorderCOLOR,
//     width: WIDTH * 0.2,
//     paddingVertical: "3%",
//     alignItems: "center",
//     justifyContent: "center",
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   UploadView: {
//     height: HEIGHT * 0.15,
//     width: WIDTH * 0.28,
//     borderWidth: 1,
//     borderColor: COLORS.UPLOADBorderCOLOR,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "space-around",
//     margin: 5,
//   },
//   FlatListUploadButton: {
//     backgroundColor: COLORS.UPLOADBorderCOLOR,
//     width: WIDTH * 0.14,
//     paddingVertical: "6%",
//     alignItems: "center",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.UPLOADBorderCOLOR,
//   },
//   GETText: {
//     color: COLORS.PLACEHOLDERCOLOR2,
//     fontSize: 13,
//     fontFamily: FONTS.medium,
//   },

//   RetakeTEXT: {
//     color: COLORS.BLUE2,
//     fontSize: 11,
//     fontFamily: FONTS.medium,
//   },
//   RETAKE_BUTTON: {
//     backgroundColor: "rgba(43, 56, 61, 1)",
//     paddingVertical: "6%",
//     paddingHorizontal: "11%",
//     borderRadius: 16,
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//     bottom: 5,
//   },
//   MessageBOX: {
//     width: WIDTH * 0.9,
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: COLORS.UPLOADBorderCOLOR,
//     borderRadius: 10,
//     height: HEIGHT * 0.18,
//   },
//   MessageBOXINPUT: {
//     borderRadius: 10,
//     height: HEIGHT * 0.18,
//     textAlignVertical: "top",
//     paddingLeft: "2%",
//     color: COLORS.BLACK3,
//   },
//   Errorstyle: {
//     color: COLORS.ERRORCOLORRED,
//     fontSize: 13,
//     fontFamily: FONTS.regular,
//     // width: WIDTH * 0.9,
//     alignSelf: "center",
//     marginTop: "1%",
//   },
//   PhoneTextInput: {
//     backgroundColor: COLORS.WHITE,
//     width: WIDTH * 0.5,
//     borderRadius: 8,
//     paddingLeft: "2%",
//     color: COLORS.BLACK,
//     fontSize: 14,
//     fontFamily: FONTS.semibold,
//   },
//   WithoutDateInput: {
//     backgroundColor: COLORS.WHITE,
//     width: WIDTH * 0.65,
//     borderRadius: 8,
//     paddingLeft: "2%",
//     color: COLORS.BLACK,
//     fontSize: 17,
//     fontFamily: FONTS.semibold,
//   },
//   DateButton: {
//     width: WIDTH * 0.12,
//     paddingVertical: "3%",
//     alignItems: "center",
//     justifyContent: "center",
//     borderLeftWidth: 1,
//     borderLeftColor: COLORS.UPLOADBorderCOLOR,
//   },
//   Radio_Headings: {
//     color: COLORS.BLACK3,
//     fontSize: 13,
//     fontFamily: FONTS.semibold,
//   },
// });
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  StatusBar,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import Header from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import VehicleType from "../../Components/ProfileSvg/VehicleType";
import StandardType from "../../Components/ProfileSvg/StandardType";
import UploadSvgImage from "../../Components/ProfileSvg/UploadSvgImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WholeButton from "../../Components/WholeButton";
import {
  ValidateLicenceNO,
  Validate_BookLet,
  Validate_CarLicence,
  Validate_DLLicenceNO,
  Validate_Insurance,
  Validate_MOT,
  Validate_MSGBox,
  Validate_VehicleName,
  Validate_VehicleNumber,
  Validate_Vhehical,
  validateImageOtherImgaes,
} from "../../Components/Validations";
import ImagePicker from "react-native-image-crop-picker";
import DatePicker from "react-native-date-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  saveBACK_PATH,
  saveBOOKLET,
  saveBOOKLET_DOC,
  saveCAR_LICENSE,
  saveCAR_LICENSE_DOC,
  saveDRIVER_LICENSE,
  saveDRIVER_LICENSE_DOC,
  saveFRONTAL_PATH,
  saveINSURANCE,
  saveINSURANCE_DOC,
  saveLEFT_PATH,
  saveMOT,
  saveMOT_DOC,
  saveOTHER,
  savePCO_VEHICAL_LICENSE,
  savePCO_VEHICAL_LICENSE_DOC,
  saveRIGHT_PATH,
  saveVEHICAL_CLASS,
  saveVEHICAL_LOGBOOK,
  saveVEHICAL_LOGBOOK_DOC,
  saveVEHICAL_NAME,
  saveVEHICAL_NUMBER,
  saveVEHICAL_OWNER,
  saveVEHICAL_TYPE,
  setClearVehicle,
} from "../../ReduxConfig/VehicleDetailsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  UPDATE_Driver,
  UploadProfile,
  allVehicleTypes,
  driverRequestData,
  getVehicleTypeAndStandard,
} from "../../Components/ApiConfig/EndPoints";
import { RootState } from "../../ReduxConfig/Store";
import SpinningLoader from "../../assets/SpinningLoader";
import { ErrorMessages } from "../../Components/ErrorMessages";
import { useIsFocused } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import instance from "../../Components/ApiConfig/ApiIntercept";
import RegistationSuccessPopUp from "../../Components/RegistationSuccessPopUp";
import { useTranslation } from "react-i18next";

const EditDocumnets = (props: any) => {
  const [allVehicles, setAllVehicles] = useState("");
  const UserData = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS.userData
  );
  console.log("UserDatatatattatat", UserData);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const VEHICAL_DETAILS_ = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_
  );
  // console.log("VEHICAL_DETAILS_-->1111", VEHICAL_DETAILS_);

  //Vehicle Owner
  const [Selected, setSelected] = useState(
    VEHICAL_DETAILS_?.VEHICAL_OWNER
      ? VEHICAL_DETAILS_?.VEHICAL_OWNER === "Private"
        ? 1
        : 0
      : 1
  );

  //Vehicle Type
  const [Gender, setGender] = useState<string | null>(
    UserData?.vehicleType || null
  );

  // Vehicle Name

  const [vehicleName, setVehicleName] = useState(UserData?.vehicleName);
  const [vehicleNameError, setVehicleNameError] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState(UserData?.vehicleNumber);
  const [vehicleNumberError, setVehicleNumberError] = useState("");
  const [GenderError, setGenderError] = useState("");

  //Vehicle Standard
  const [StandardTYPE, setStandardTYPE] = useState<string | null>(
    UserData?.vehicleClass || null
  );
  const [StandardTYPEError, setStandardTYPEError] = useState("");
  const [Licensenumber, setLicensenumber] = useState(
    UserData?.pcoVehiclelicenceExpiration || ""
  );
  const [LicensenumberError, setLicensenumberError] = useState("");
  const [LicensenumberDOCError, setLicensenumberDOCError] = useState(false);
  const [ShoeView, setShoeView] = useState(
    VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE ||
      VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
      ? true
      : false
  );
  //End PCO Vehicle

  //DRIVER LICENSE Vehicle
  const [LICENCE, setLICENCE] = useState(UserData?.licenceExpiration || "");
  const [LICENCEERROR, setLICENCEERROR] = useState("");
  const [LICENCEERRORDOC, setLICENCEERRORDOC] = useState(false);
  const [DriverLicenseView2, setDriverLicenseView2] = useState(
    VEHICAL_DETAILS_?.DRIVER_LICENSE || VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
      ? true
      : false
  );
  //End DRIVER LICENSE Vehicle

  //Insurance Vehicle
  const [Insurance, setInsurance] = useState(
    UserData?.insuranceExpiration || ""
  );
  const [InsuranceError, setInsuranceError] = useState("");
  const [InsuranceErrorDOC, setInsuranceErrorDOC] = useState(false);
  const [DriverLicenseView3, setDriverLicenseView3] = useState(
    VEHICAL_DETAILS_?.INSURANCE || VEHICAL_DETAILS_?.INSURANCE_DOC
      ? true
      : false
  );
  //End Insurance Vehicle

  //VEHICAL_LOGBOOK_DOC Vehicle
  const [VehicleLogbook, srtVehicleLogbook] = useState(
    UserData?.logbookExpiration || ""
  );
  const [VehicleLogbookError, setVehicleLogbookError] = useState("");
  const [VehicleLogbookErrorDOC, setVehicleLogbookErrorDOC] = useState(false);
  const [VLOGBOOKView, setVLOGBOOKView] = useState(
    VEHICAL_DETAILS_?.VEHICAL_LOGBOOK || VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
      ? true
      : false
  );
  //End VEHICAL_LOGBOOK_DOC Vehicle

  //MOT_DOC Vehicle
  const [MOT, setMOT] = useState(UserData?.motExpiration || "");

  console.log("MOtttttt", MOT);
  const [MOTError, setMOTError] = useState("");
  const [MOTErrorDOC, setMOTErrorDOC] = useState(false);
  const [MOTView, setMOTView] = useState(
    VEHICAL_DETAILS_?.MOT || VEHICAL_DETAILS_?.MOT_DOC ? true : false
  );

  // BOOKLET_DOC Vehicle
  const [Booklet, setBooklet] = useState(UserData?.bookletNumber || "");
  const [BookletError, setBookletError] = useState("");
  const [BookletErrorDOC, setBookletErrorDOC] = useState(false);
  const [BOOKLETView, setBOOKLETView] = useState(
    VEHICAL_DETAILS_?.BOOKLET || VEHICAL_DETAILS_?.BOOKLET_DOC ? true : false
  );
  //End BOOKLET_DOC Vehicle

  const [msgBOX, setmsgBOX] = useState(UserData.others || "");
  const [msgBOXError, setmsgBOXError] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDAte, setopenDAte] = useState(false);
  const [Vhehicaldate, setVhehicaldate] = useState(new Date());

  console.log("Vhehicaldate :::", Vhehicaldate);
  const [openVhehicalDate, setopenVhehicalDate] = useState(false);
  const [MOTdate, setMOTdate] = useState(new Date());

  console.log("MOTdate :::", MOTdate);
  const [openMOTdate, setopenMOTdate] = useState(false);
  const [vehicleImages, setVehicleImages] = useState(false);
  const [standardTypeOptions, setStandardTypeOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // console.log("VEHICAL_DETAILS", VEHICAL_DETAILS_);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleSelectedValue = (value: string) => {
    // dispatch(saveVEHICAL_TYPE(value));
    setGender(value);
    setSelectedVehicle(value);
  };

  type ImageData = {
    path: string;
  };

  const [ShowError, setShowError] = useState({
    LicensenumberError: false,
    LICENCEERROR: false,
    InsuranceError: true,
    VehicleLogbookError: false,
    CarLicenseError: false,
    BookletError: false,
    msgBOXError: false,
    MOTError: false,
  });

  const [saveImage, setSaveImage] = useState("");
  const [Loader, setLoader] = useState(false);
  const [DATA, setDATA] = useState([
    {
      id: "1",
      title: "Frontal",
      image: VEHICAL_DETAILS_?.FRONTAL_PATH || null,
    },
    {
      id: "2",
      title: "Lateral Left",
      image: VEHICAL_DETAILS_?.LEFT_PATH || null,
    },
    {
      id: "3",
      title: "Lateral Right",
      image: VEHICAL_DETAILS_?.RIGHT_PATH || null,
    },
    {
      id: "4",
      title: "Back",
      image: VEHICAL_DETAILS_?.BACK_PATH || null,
    },
  ]);

  let retries = 0;
  const maxRetries = 1;

  const onSelectImage1 = (type: String) => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Upload Image", "Choose an option", [
        {
          text: "Camera",
          onPress: () => {
            onCamera1(type);
          },
        },
        {
          text: "Photo",
          onPress: () => {
            openGallery_(type);
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]);
    }
  };

  const onCamera1 = (type: String) => {
    ImagePicker.openCamera({
      height: HEIGHT * 0.2,
      width: WIDTH * 0.4,
      cropping: true,
      mediaType: "photo",
      quality: "high",
    })
      .then((image) => {
        // setSelectedImage(image.path);
        UploadImageFLATLIST(image, type);
      })
      .catch((error) => {
        console.log("onCamera---->", error);
      });
  };

  const openGallery_ = (title: any) => {
    setSaveImage(title);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
      quality: "high",
    })
      .then((image: ImageData) => {
        setFlatListImageError(undefined);
        UploadImageFLATLIST(image, title);
      })
      .catch((error) => {
        console.log("Error selecting image:", error);
        setFlatListImageError("Error selecting image");
      });
  };

  const UploadImageFLATLIST = async (
    Image: { path: any; mime?: any },
    title: any
  ) => {
    setLoader(true);
    console.log("Item-->", saveImage);
    const formData = new FormData();
    formData.append("file", {
      uri: Image.path,
      name: "image.jpg",
      type: Image.mime,
    });

    try {
      const response = await instance.post(UploadProfile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data;
      if (responseData.responseCode === 200) {
        if (title == "Lateral Left") {
          dispatch(saveLEFT_PATH(responseData?.result));
        } else if (title == "Frontal") {
          dispatch(saveFRONTAL_PATH(responseData?.result));
        } else if (title == "Lateral Right") {
          dispatch(saveRIGHT_PATH(responseData?.result));
        } else if (title == "Back") {
          dispatch(saveBACK_PATH(responseData?.result));
        }
        setVehicleImages(false);
        const updateds = DATA.map((item) => {
          if (title == item?.title) {
            return { ...item, ["image"]: responseData?.result };
          } else {
            return item;
          }
        });
        setDATA(updateds);
      }
      setLoader(false);
    } catch (error) {
      if (retries < maxRetries) {
        retries++;
        // Retry the request after a delay
        await UploadImageFLATLIST(Image, title); // Retry after 3 seconds (adjust as needed)
      } else {
        showMessage({
          message: "Something went wrong pleas try again.",
          duration: 1000,
          type: "danger",
        });
        // Handle max retries reached
      }
      setLoader(false);
      console.log("Errorerrorerror:", err?.response);
    }
  };

  const onSelectImage = (type: String) => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Upload Image", "Choose an option", [
        {
          text: "Camera",
          onPress: () => {
            onCamera(type);
          },
        },
        {
          text: "Photo",
          onPress: () => {
            openGallery1(type);
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]);
    }
  };

  const onCamera = (type: String) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
      quality: "high",
    })
      .then((image) => {
        // setSelectedImage(image.path);
        UploadImagePCOLicens(image, type);
      })
      .catch((error) => {
        console.log("onCamera---->", error);
      });
  };

  const openGallery1 = async (type: String) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
      quality: "high",
    }).then(async (image) => {
      await UploadImagePCOLicens(image, type);
    });
  };

  const UploadImagePCOLicens = async (
    Image: { path: any; mime?: any },
    typeImage: String
  ) => {
    setLoader(true);
    const token = await AsyncStorage.getItem("TOKEN");
    const formData = new FormData();
    formData.append("file", {
      uri: Image.path,
      name: "image.jpg",
      type: Image.mime,
    });
    try {
      const response = await instance.post(UploadProfile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response?.data;
      console.log(response, "jasdajsdklasjd");
      if (responseData.responseCode === 200) {
        switch (typeImage) {
          case "PCO_VEHICAL_LICENSE_DOC":
            dispatch(savePCO_VEHICAL_LICENSE_DOC(responseData.result));
            setLicensenumberDOCError(false);
            setShoeView(true);
            setLoader(false);
            break;
          case "DRIVER_LICENSE_DOC":
            dispatch(saveDRIVER_LICENSE_DOC(responseData.result));
            setLICENCEERRORDOC(false);
            setDriverLicenseView2(true);
            setLoader(false);
            break;
          case "INSURANCE_DOC":
            setInsuranceErrorDOC(false);
            dispatch(saveINSURANCE_DOC(responseData.result));
            setDriverLicenseView3(true);
            setLoader(false);
            break;
          case "VEHICAL_LOGBOOK_DOC":
            setVehicleLogbookErrorDOC(false);
            dispatch(saveVEHICAL_LOGBOOK_DOC(responseData.result));
            setVLOGBOOKView(true);
            setLoader(false);
            break;
          case "MOT_DOC":
            setMOTErrorDOC(false);
            dispatch(saveMOT_DOC(responseData.result));
            setMOTView(true);
            setLoader(false);
            break;
          // case "CAR_LICENSE_DOC":
          //   setCarLicenseErrorDOC(false);
          //   dispatch(saveCAR_LICENSE_DOC(responseData.result));
          //   setC_LICENCEView(true);
          //   setLoader(false);
          //   break;
          case "BOOKLET_DOC":
            setBookletErrorDOC(false);
            dispatch(saveBOOKLET_DOC(responseData.result));
            setBOOKLETView(true);
            setLoader(false);
            break;
          default:
            setLoader(false);
            break;
        }
      } else {
        setLoader(false);
        console.log("Error:", responseData.responseMessage);
      }
    } catch (error) {
      setLoader(false);
      if (retries < maxRetries) {
        retries++;
        // Retry the request after a delay
        await UploadImagePCOLicens(Image, typeImage); // Retry after 3 seconds (adjust as needed)
      } else {
        showMessage({
          message: "Something went wrong pleas try again.",
          duration: 1000,
          type: "danger",
        });
        setLoader(false);
        // Handle max retries reached
      }

      console.log("Errorerrorerror:", error?.response);
    }
  };

  const onContinuePress = () => {
    let LicensenumberError = ValidateLicenceNO(Licensenumber);
    let VehicleNameError = Validate_VehicleName(vehicleName);
    let VehicleNumberError = Validate_VehicleNumber(vehicleNumber);
    let LICENCEERROR = Validate_DLLicenceNO(LICENCE);
    let InsuranceError = Validate_Insurance(Insurance);
    let VehicleLogbookError = Validate_Vhehical(VehicleLogbook);
    let MOTError = Validate_MOT(MOT);
    // let CarLicenseError = Validate_CarLicence(CarLicense);
    let BookletError = Validate_BookLet(Booklet);
    let msgBOXError = Validate_MSGBox(msgBOX);

    ///Images Validations
    let pcoImage = validateImageOtherImgaes(
      VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
    );
    let DRIVER_LICENSE_DOC = validateImageOtherImgaes(
      VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
    );
    let INSURANCE_DOC = validateImageOtherImgaes(
      VEHICAL_DETAILS_?.INSURANCE_DOC
    );
    let VEHICAL_LOGBOOK_DOC = validateImageOtherImgaes(
      VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
    );
    let MOT_DOC = validateImageOtherImgaes(VEHICAL_DETAILS_?.MOT_DOC);
    let FRONTAL_PATH = validateImageOtherImgaes(VEHICAL_DETAILS_?.FRONTAL_PATH);

    // console.log("FRONTAL_PATHFRONTAL_PATH", FRONTAL_PATH);
    let LEFT_PATH = validateImageOtherImgaes(VEHICAL_DETAILS_?.LEFT_PATH);

    // console.log("LEFT_PATHLEFT_PATH", LEFT_PATH);
    let RIGHT_PATH = validateImageOtherImgaes(VEHICAL_DETAILS_?.RIGHT_PATH);
    let BACK_PATH = validateImageOtherImgaes(VEHICAL_DETAILS_?.BACK_PATH);
    // let CAR_LICENSE_DOC = validateImageOtherImgaes(
    //   VEHICAL_DETAILS_?.CAR_LICENSE_DOC
    // );
    let BOOKLET_DOC = validateImageOtherImgaes(VEHICAL_DETAILS_?.BOOKLET_DOC);
    if (
      LicensenumberError == "" &&
      LICENCEERROR == "" &&
      InsuranceError == "" &&
      VehicleLogbookError == "" &&
      MOTError == "" &&
      // CarLicenseError == "" &&
      BookletError == "" &&
      msgBOXError == "" &&
      pcoImage &&
      DRIVER_LICENSE_DOC &&
      INSURANCE_DOC &&
      VEHICAL_LOGBOOK_DOC &&
      MOT_DOC &&
      // CAR_LICENSE_DOC &&
      BOOKLET_DOC &&
      (FRONTAL_PATH || LEFT_PATH || RIGHT_PATH || BACK_PATH)
    ) {
      if (
        ShoeView == false &&
        DriverLicenseView2 == false &&
        DriverLicenseView3 == false &&
        VLOGBOOKView == false &&
        MOTView == false &&
        // C_LICENCEView == false &&
        BOOKLETView == false &&
        vehicleImages == false
      ) {
        setLicensenumberDOCError(true);
        setLICENCEERRORDOC(true);
        setInsuranceErrorDOC(true);
        setVehicleLogbookErrorDOC(true);
        setMOTErrorDOC(true);
        // setCarLicenseErrorDOC(true);
        setBookletErrorDOC(true);
      } else {
        if (
          LicensenumberDOCError == false &&
          LICENCEERRORDOC == false &&
          InsuranceErrorDOC == false &&
          VehicleLogbookErrorDOC == false &&
          MOTErrorDOC == false &&
          // CarLicenseErrorDOC == false &&
          BookletErrorDOC == false &&
          vehicleImages == false
        ) {
          const OWNER = Selected == 1 ? "Private" : "Corporate";

          dispatch(saveVEHICAL_OWNER(OWNER));
          dispatch(saveVEHICAL_TYPE(Gender));
          dispatch(saveVEHICAL_NAME(vehicleName));
          dispatch(saveVEHICAL_NUMBER(vehicleNumber));
          dispatch(saveVEHICAL_CLASS(StandardTYPE));
          dispatch(savePCO_VEHICAL_LICENSE(Licensenumber));
          dispatch(saveDRIVER_LICENSE(LICENCE));
          dispatch(saveINSURANCE(Insurance));
          dispatch(saveVEHICAL_LOGBOOK(VehicleLogbook));
          dispatch(saveMOT(MOT));
          // dispatch(saveCAR_LICENSE(CarLicense));
          dispatch(saveBOOKLET(Booklet));
          dispatch(saveOTHER(msgBOX));
          updateDriverVehicleDetails();
        }
      }
    } else {
      setLicensenumberError(LicensenumberError);
      setVehicleNameError(VehicleNameError);
      setVehicleNumberError(VehicleNumberError);
      setInsuranceError(InsuranceError);
      setVehicleLogbookError(VehicleLogbookError);
      setMOTError(MOTError);
      // setCarLicenseError(CarLicenseError);
      setBookletError(BookletError);
      setmsgBOXError(msgBOXError);
      //vhehical
      setGenderError("Please select vehicle type.");
      setStandardTYPEError("Please select vehicle standard.");
      setLicensenumberDOCError(!pcoImage);
      setBookletErrorDOC(!BOOKLET_DOC);
      // setCarLicenseErrorDOC(!CAR_LICENSE_DOC);
      setMOTErrorDOC(!MOT_DOC);
      setVehicleLogbookErrorDOC(!VEHICAL_LOGBOOK_DOC);
      setInsuranceErrorDOC(!INSURANCE_DOC);
      setLICENCEERRORDOC(!DRIVER_LICENSE_DOC);
      setLicensenumberDOCError(!pcoImage);
      setVehicleImages(
        !LEFT_PATH || !RIGHT_PATH || !BACK_PATH || !FRONTAL_PATH
      );

      setShowError({
        LicensenumberError: true,
        LICENCEERROR: true,
        InsuranceError: true,
        VehicleLogbookError: true,
        // CarLicenseError: true,
        BookletError: true,
        msgBOXError: true,
        MOTError: true,
      });
    }
  };

  const getVehicleTypeDetails = async () => {
    try {
      const res = await axios({
        method: "get",
        url: getVehicleTypeAndStandard,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
      });
      if (res?.data?.responseCode === 200) {
        setAllVehicles(res?.data?.result);
        console.log("getVehicleTypeDetails success", res?.data);
      }
    } catch (error) {
      console.log("error getVehicleTypeDetails", error?.response);
    }
  };
  const getVehicleTypeAndVehicleStandardDetails = async (vehicleType) => {
    try {
      const res = await axios({
        method: "get",
        url: getVehicleTypeAndStandard,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
        params: {
          vehicleType: vehicleType,
        },
      });
      if (res?.data?.responseCode === 200) {
        setStandardTypeOptions(res?.data?.result);
        // console.log(
        //   "getVehicleTypeAndVehicleStandardDetails success",
        //   res?.data
        // );
      }
    } catch (error) {
      console.log(
        "error getVehicleTypeAndVehicleStandardDetails",
        error?.response
      );
    }
  };
  const getToken = useSelector((state: RootState) => state.TOKEN_);
  const updateDriverVehicleDetails = async () => {
    const fcmToken = await AsyncStorage.getItem("fcm");
    try {
      setLoader(true);
      const formData = {
        vehicleType: Gender?.toLowerCase(),
        vehicleOwner: Selected == 1 ? "private" : "corporate",
        vehicleClass: StandardTYPE,
        licenceExpiration: LICENCE,
        licenceExpirationDoc: VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
          ? VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
          : UserData?.licenceExpirationDoc,
        insuranceExpiration: Insurance,
        insuranceExpirationDoc: VEHICAL_DETAILS_?.INSURANCE_DOC
          ? VEHICAL_DETAILS_?.INSURANCE_DOC
          : UserData?.insuranceExpirationDoc,
        logbookExpiration: VehicleLogbook,
        logbookExpirationDoc: VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
          ? VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
          : UserData?.logbookExpirationDoc,
        pcoVehiclelicenceExpiration: Licensenumber,
        pcoVehiclelicenceExpirationDoc:
          VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
            ? VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
            : UserData?.pcoVehiclelicenceExpirationDoc,
        motExpiration: MOT,
        motExpirationDocs: VEHICAL_DETAILS_?.MOT_DOC
          ? VEHICAL_DETAILS_?.MOT_DOC
          : UserData?.motExpirationDocs,
        // "carlicenceNumber": CAR_LICENSE,
        // "carlicenceNumberDocs": CAR_LICENSE_DOC,
        bookletNumber: Booklet,
        bookletNumberDocs: VEHICAL_DETAILS_?.BOOKLET_DOC
          ? VEHICAL_DETAILS_?.BOOKLET_DOC
          : UserData?.bookletNumberDocs,
        others: msgBOX,
        vehicleName: vehicleName,
        vehicleNumber: vehicleNumber,
        frontVehicle: VEHICAL_DETAILS_?.FRONTAL_PATH
          ? VEHICAL_DETAILS_?.FRONTAL_PATH
          : UserData?.frontVehicle,
        backVehicle: VEHICAL_DETAILS_?.BACK_PATH
          ? VEHICAL_DETAILS_?.BACK_PATH
          : UserData?.backVehicle,
        leftVehicle: VEHICAL_DETAILS_?.LEFT_PATH
          ? VEHICAL_DETAILS_?.LEFT_PATH
          : UserData?.leftVehicle,
        rightVehicle: VEHICAL_DETAILS_?.RIGHT_PATH
          ? VEHICAL_DETAILS_?.RIGHT_PATH
          : UserData?.rightVehicle,
      };
      // formData.append("userId", Data?.userId);
      // formData.append("deviceType", Platform?.OS);

      const res = await axios({
        method: "post",
        // url: UPDATE_Driver,
        url: driverRequestData,
        data: formData,
        headers: {
          token: getToken?.Token,
          // "Content-Type": "multipart/form-data",
        },
      });

      console.log("formData driver formData", formData);
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        console.log("Details response--->>>", res?.data);
        // dispatch(setIsProfile(res?.isProfileUpdated));
        // setIsModalVisible(true);
        showMessage({
          message: res?.data?.responseMessage,
          type: "success",
          icon: "success",
        });
        props?.navigation?.navigate("Account");
      }
    } catch (error) {
      setLoader(false);
      console.log("docs error--->>>", error?.response);
      showMessage({
        message: error?.message,
        type: "danger",
        icon: "danger",
      });
    }
  };
  // useEffect(() => {
  //   // console.log("getVehicleTypesgetVehicleTypesgetVehicleTypes");
  //   getVehicleTypes();
  // }, [isFocused]);
  useEffect(() => {
    getVehicleTypeDetails();
  }, [isFocused]);

  useEffect(() => {
    getVehicleTypeAndVehicleStandardDetails(Gender);
  }, [isFocused, Gender]);

  const { t } = useTranslation();
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header Heading={t("Edit Documents")} navigation={props?.navigation} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text allowFontScaling={false} style={styles.HeadingONE}>
            {t("Vehicle Details")}
          </Text>
          <Text allowFontScaling={false} style={styles.RequiredTEXT}>
            {t("Documents Required*")}
          </Text>
          <Text allowFontScaling={false} style={styles.RequiredTEXT2}>
            {t("Vehicle Owner")}
          </Text>
          <View style={styles.RedioEntireView}>
            <View style={styles.RadioButtonView}>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected(1);
                  }}
                  style={{}}
                >
                  {Selected == 1 ? (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-active"
                        size={20}
                        color={Selected == 1 ? COLORS.ORANGE : COLORS.GRAY}
                      />
                    </>
                  ) : (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-passive"
                        size={20}
                        color={COLORS.GRAY}
                      />
                    </>
                  )}
                </TouchableOpacity>
                <Text allowFontScaling={false} style={styles.Radio_Headings}>
                  {t("PRIVATE")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected(2);
                  }}
                >
                  {Selected == 2 ? (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-active"
                        size={20}
                        color={Selected == 2 ? COLORS.ORANGE : COLORS.GRAY}
                      />
                    </>
                  ) : (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-passive"
                        size={20}
                        color={COLORS.GRAY}
                      />
                    </>
                  )}
                </TouchableOpacity>
                <Text allowFontScaling={false} style={styles.Radio_Headings}>
                  {t("CORPORATE")}
                </Text>
              </View>
            </View>
          </View>

          <VehicleType
            setGender={setGender}
            Gender={Gender}
            vehicleTypes={allVehicles}
            setGenderError={setGenderError}
          />
          {GenderError && Gender === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {GenderError}
            </Text>
          )}
          <StandardType
            setStandardTYPE={setStandardTYPE}
            StandardTYPE={StandardTYPE}
            setStandardTYPEError={setStandardTYPEError}
            standardTypeOptions={standardTypeOptions}
          />
          {StandardTYPEError && StandardTYPE === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {StandardTYPEError}
            </Text>
          )}

          {/* Vehicle Name */}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Vehicle Name")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={vehicleName}
              placeholder={t("Vehicle Name")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={60}
              onChangeText={(text: string) => {
                setVehicleName(text);
                if (vehicleNameError) {
                  setVehicleNameError(Validate_VehicleName(text));
                }
              }}
              onBlur={() => {
                setVehicleNameError(Validate_VehicleName(vehicleName));
              }}
              style={{
                ...styles.PhoneTextInput,
                paddingVertical: "4%",
                flex: 1,
              }}
            />
          </View>
          {vehicleNameError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {vehicleNameError}
            </Text>
          )}

          {/* Vehicle Number */}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t(" Vehicle Number")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={vehicleNumber}
              placeholder={t("Vehicle Number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={60}
              onChangeText={(text: string) => {
                setVehicleNumber(text);
                if (vehicleNumberError) {
                  setVehicleNumberError(Validate_VehicleNumber(text));
                }
              }}
              onBlur={() => {
                setVehicleNumberError(Validate_VehicleNumber(vehicleNumber));
              }}
              style={{
                ...styles.PhoneTextInput,
                paddingVertical: "4%",
                flex: 1,
              }}
            />
          </View>
          {vehicleNumberError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {vehicleNumberError}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("PCO Vehicle Licence")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={Licensenumber}
              placeholder={t("PCO Licence number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={10}
              // secureTextEntry={TextSecure}
              onChangeText={(text: string) => {
                setLicensenumber(text);
                if (LicensenumberError) {
                  setLicensenumberError(ValidateLicenceNO(text));
                }
              }}
              onBlur={() => {
                setLicensenumberError(ValidateLicenceNO(Licensenumber));
              }}
              style={styles.PhoneTextInput}
            />
          </View>
          {LicensenumberError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {LicensenumberError}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5%",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
                    ? VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
                    : UserData?.pcoVehiclelicenceExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
              <TouchableOpacity
                onPress={() => onSelectImage("PCO_VEHICAL_LICENSE_DOC")}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginLeft: "30%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {LicensenumberDOCError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {t("Please attach PCO Vehicle Licence.")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Driver Licence")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={LICENCE}
              placeholder={t("Licence Number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={16}
              // secureTextEntry={DriverLicenseTextSecure2}
              onChangeText={(text: string) => {
                setLICENCE(text);
                if (LICENCEERROR) {
                  setLICENCEERROR(Validate_DLLicenceNO(text));
                }
              }}
              onBlur={() => {
                setLICENCEERROR(Validate_DLLicenceNO(LICENCE));
              }}
              style={styles.WithoutDateInput}
            />
          </View>
          {LICENCEERROR && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {LICENCEERROR}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
                    ? VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
                    : UserData?.licenceExpiration,
                }}
                style={styles.uploadImgView}
              />
            </View>

            <TouchableOpacity
              onPress={() => onSelectImage("DRIVER_LICENSE_DOC")}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15%",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                {t("Upload")}
              </Text>
            </TouchableOpacity>
          </View>
          {LICENCEERRORDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach Driver Licence.")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Insurance")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={Insurance}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setInsurance(text);
                if (InsuranceError) {
                  setInsuranceError(Validate_Insurance(text));
                }
              }}
              onBlur={() => {
                setInsuranceError(Validate_Insurance(Insurance));
              }}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setopenDAte(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity>
            </View>
            {openDAte && (
              <DatePicker
                modal
                open={openDAte}
                date={date}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date) => {
                  setopenDAte(false);
                  setDate(date);
                  setInsuranceError("");
                  const formattedDate = `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                  setInsurance(formattedDate);
                  // setInsurance(date.toDateString());
                }}
                onCancel={() => {
                  setopenDAte(false);
                }}
              />
            )}
          </View>
          {InsuranceError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {InsuranceError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              // onPress={() => setShowImage(VEHICAL_DETAILS_?.INSURANCE_DOC)}
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.INSURANCE_DOC
                    ? VEHICAL_DETAILS_?.INSURANCE_DOC
                    : UserData?.insuranceExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
            </View>
            <TouchableOpacity
              onPress={() => onSelectImage("INSURANCE_DOC")}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                marginRight: "15%",
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                {t("Upload")}
              </Text>
            </TouchableOpacity>
          </View>
          {InsuranceErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach insurance.")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Vehicle Logbook")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={VehicleLogbook}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                srtVehicleLogbook(text);
                if (VehicleLogbookError) {
                  setVehicleLogbookError(Validate_Vhehical(text));
                }
              }}
              onBlur={() => {
                setVehicleLogbookError(Validate_Vhehical(VehicleLogbook));
              }}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setopenVhehicalDate(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity>
            </View>
            {openVhehicalDate && (
              <DatePicker
                modal
                open={openVhehicalDate}
                date={Vhehicaldate}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date_V) => {
                  setopenVhehicalDate(false);
                  setVhehicaldate(date);
                  setVehicleLogbookError("");
                  const formattedDate = `${date_V.getDate()}/${
                    date_V.getMonth() + 1
                  }/${date_V.getFullYear()}`;
                  srtVehicleLogbook(formattedDate);
                }}
                onCancel={() => {
                  setopenVhehicalDate(false);
                  setopenDAte(false);
                }}
              />
            )}
          </View>
          {VehicleLogbookError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {VehicleLogbookError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
                    ? VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
                    : UserData?.logbookExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
            </View>
            <TouchableOpacity
              onPress={() => onSelectImage("VEHICAL_LOGBOOK_DOC")}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                marginRight: "15%",
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                {t("Upload")}
              </Text>
            </TouchableOpacity>
          </View>
          {VehicleLogbookErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach logbook.")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            MOT (Ministry of Transport)
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={MOT}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setMOT(text);
                if (MOTError) {
                  setMOTError(Validate_MOT(text));
                }
              }}
              onBlur={() => {
                setMOTError(Validate_MOT(MOT));
              }}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setopenMOTdate(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity>
              {/* {MOTView == true ? (
                <>
                  <TouchableOpacity
                    // onPress={() => setMOTSecure(!MOTSecure)}
                    onPress={() => setShowImage(VEHICAL_DETAILS_?.MOT_DOC)}
                    style={styles.UploadButton}
                  >
                    <VECTOR_ICONS.Feather
                      name={"eye"}
                      color={COLORS.BLUE2}
                      size={18}
                    />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      View
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        onSelectImage("MOT_DOC");
                      }, 300);
                    }}
                    style={styles.UploadButton}
                  >
                    <UploadSvgImage />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </>
              )} */}
            </View>

            {openMOTdate && (
              <DatePicker
                modal
                open={openMOTdate}
                date={MOTdate}
                mode="date"
                minimumDate={MOTdate}
                onConfirm={(date_V) => {
                  setopenMOTdate(false);
                  setMOTdate(date);
                  setMOTError("");
                  const formattedDate = `${date_V.getDate()}/${
                    date_V.getMonth() + 1
                  }/${date_V.getFullYear()}`;
                  setMOT(formattedDate);
                }}
                onCancel={() => {
                  setopenDAte(false);
                  setopenMOTdate(false);
                }}
              />
            )}
          </View>
          {MOTError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {MOTError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              // onPress={() =>
              //   setShowImage(VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC)
              // }
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: UserData?.motExpirationDocs }}
                style={styles.uploadImgView}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  onSelectImage("MOT_DOC");
                }, 300);
              }}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                marginRight: "15%",
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                {t("Upload")}
              </Text>
            </TouchableOpacity>
          </View>
          {MOTErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach MOT (Ministry of Transport).")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Upload Vehicle Images")}
          </Text>
          <View
            style={{
              width: WIDTH * 0.9,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ ...styles.LabelTEXT, marginLeft: "10%" }}
            >
              Frontal
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...styles.uploadView,
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected(1);
                  }}
                  style={{}}
                >
                  {Selected == 1 ? (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-active"
                        size={20}
                        color={Selected == 1 ? COLORS.ORANGE : COLORS.GRAY}
                      />
                    </>
                  ) : (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-passive"
                        size={20}
                        color={COLORS.GRAY}
                      />
                    </>
                  )}
                </TouchableOpacity>
                <Text allowFontScaling={false} style={styles.Radio_Headings}>
                  PRIVATE
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelected(2);
                  }}
                >
                  {Selected == 2 ? (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-active"
                        size={20}
                        color={Selected == 2 ? COLORS.ORANGE : COLORS.GRAY}
                      />
                    </>
                  ) : (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-passive"
                        size={20}
                        color={COLORS.GRAY}
                      />
                    </>
                  )}
                </TouchableOpacity>
                <Text allowFontScaling={false} style={styles.Radio_Headings}>
                  CORPORATE
                </Text>
              </View>
            </View>
          </View>

          <VehicleType
            setGender={setGender}
            Gender={Gender}
            vehicleTypes={allVehicles}
            setGenderError={setGenderError}
          />
          {GenderError && Gender === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {GenderError}
            </Text>
          )}
          <StandardType
            setStandardTYPE={setStandardTYPE}
            StandardTYPE={StandardTYPE}
            setStandardTYPEError={setStandardTYPEError}
            standardTypeOptions={standardTypeOptions}
          />
          {StandardTYPEError && StandardTYPE === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {StandardTYPEError}
            </Text>
          )}

          {/* Vehicle Name */}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Vehicle Name
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={vehicleName}
              placeholder="Vehicle Name"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={60}
              onChangeText={(text: string) => {
                setVehicleName(text);
                if (vehicleNameError) {
                  setVehicleNameError(Validate_VehicleName(text));
                }
              }}
              onBlur={() => {
                setVehicleNameError(Validate_VehicleName(vehicleName));
              }}
              style={{
                ...styles.PhoneTextInput,
                paddingVertical: "4%",
                flex: 1,
              }}
            />
          </View>
          {vehicleNameError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {vehicleNameError}
            </Text>
          )}

          {/* Vehicle Number */}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Vehicle Number
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={vehicleNumber}
              placeholder="Vehicle Number"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={60}
              onChangeText={(text: string) => {
                setVehicleNumber(text);
                if (vehicleNumberError) {
                  setVehicleNumberError(Validate_VehicleNumber(text));
                }
              }}
              onBlur={() => {
                setVehicleNumberError(Validate_VehicleNumber(vehicleNumber));
              }}
              style={{
                ...styles.PhoneTextInput,
                paddingVertical: "4%",
                flex: 1,
              }}
            />
          </View>
          {vehicleNumberError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {vehicleNumberError}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            PCO Vehicle Licence
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={Licensenumber}
              placeholder="PCO Licence number"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={10}
              // secureTextEntry={TextSecure}
              onChangeText={(text: string) => {
                setLicensenumber(text);
                if (LicensenumberError) {
                  setLicensenumberError(ValidateLicenceNO(text));
                }
              }}
              onBlur={() => {
                setLicensenumberError(ValidateLicenceNO(Licensenumber));
              }}
              style={styles.PhoneTextInput}
            />
          </View>
          {LicensenumberError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {LicensenumberError}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5%",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
                    ? VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC
                    : UserData?.pcoVehiclelicenceExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
              <TouchableOpacity
                onPress={() => onSelectImage("PCO_VEHICAL_LICENSE_DOC")}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginLeft: "30%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {LicensenumberDOCError && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              Please attach PCO Vehicle Licence.
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Driver Licence
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={LICENCE}
              placeholder="Licence Number"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="default"
              maxLength={16}
              // secureTextEntry={DriverLicenseTextSecure2}
              onChangeText={(text: string) => {
                setLICENCE(text);
                if (LICENCEERROR) {
                  setLICENCEERROR(Validate_DLLicenceNO(text));
                }
              }}
              onBlur={() => {
                setLICENCEERROR(Validate_DLLicenceNO(LICENCE));
              }}
              style={styles.WithoutDateInput}
            />
          </View>
          {LICENCEERROR && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {LICENCEERROR}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
                    ? VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
                    : UserData?.licenceExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
            </View>

            <TouchableOpacity
              onPress={() => onSelectImage("DRIVER_LICENSE_DOC")}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15%",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          {LICENCEERRORDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              Please attach Driver Licence.
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Insurance
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={Insurance}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setInsurance(text);
                if (InsuranceError) {
                  setInsuranceError(Validate_Insurance(text));
                }
              }}
              onBlur={() => {
                setInsuranceError(Validate_Insurance(Insurance));
              }}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setopenDAte(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity>
            </View>
            {openDAte && (
              <DatePicker
                modal
                open={openDAte}
                date={date}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date) => {
                  setopenDAte(false);
                  setDate(date);
                  setInsuranceError("");
                  const formattedDate = `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                  setInsurance(formattedDate);
                  // setInsurance(date.toDateString());
                }}
                onCancel={() => {
                  setopenDAte(false);
                }}
              />
            )}
          </View>
          {InsuranceError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {InsuranceError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              // onPress={() => setShowImage(VEHICAL_DETAILS_?.INSURANCE_DOC)}
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.INSURANCE_DOC
                    ? VEHICAL_DETAILS_?.INSURANCE_DOC
                    : UserData?.insuranceExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
            </View>
            <TouchableOpacity
              onPress={() => onSelectImage("INSURANCE_DOC")}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                marginRight: "15%",
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          {InsuranceErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              Please attach insurance.
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Vehicle Logbook
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={VehicleLogbook}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                srtVehicleLogbook(text);
                if (VehicleLogbookError) {
                  setVehicleLogbookError(Validate_Vhehical(text));
                }
              }}
              onBlur={() => {
                setVehicleLogbookError(Validate_Vhehical(VehicleLogbook));
              }}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setopenVhehicalDate(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity>
            </View>
            {openVhehicalDate && (
              <DatePicker
                modal
                open={openVhehicalDate}
                date={Vhehicaldate}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date_V) => {
                  setopenVhehicalDate(false);
                  setVhehicaldate(date);
                  setVehicleLogbookError("");
                  const formattedDate = `${date_V.getDate()}/${
                    date_V.getMonth() + 1
                  }/${date_V.getFullYear()}`;
                  srtVehicleLogbook(formattedDate);
                }}
                onCancel={() => {
                  setopenVhehicalDate(false);
                  setopenDAte(false);
                }}
              />
            )}
          </View>
          {VehicleLogbookError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {VehicleLogbookError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
                    ? VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC
                    : UserData?.logbookExpirationDoc,
                }}
                style={styles.uploadImgView}
              />
            </View>
            <TouchableOpacity
              onPress={() => onSelectImage("VEHICAL_LOGBOOK_DOC")}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                marginRight: "15%",
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          {VehicleLogbookErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              Please attach logbook.
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            MOT (Ministry of Transport)
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={MOT}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setMOT(text);
                if (MOTError) {
                  setMOTError(Validate_MOT(text));
                }
              }}
              onBlur={() => {
                setMOTError(Validate_MOT(MOT));
              }}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setopenMOTdate(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity>
            </View>

            {openMOTdate && (
              <DatePicker
                modal
                open={openMOTdate}
                date={MOTdate}
                mode="date"
                minimumDate={MOTdate}
                onConfirm={(date_V) => {
                  setopenMOTdate(false);
                  setMOTdate(date);
                  setMOTError("");
                  const formattedDate = `${date_V.getDate()}/${
                    date_V.getMonth() + 1
                  }/${date_V.getFullYear()}`;
                  setMOT(formattedDate);
                }}
                onCancel={() => {
                  setopenDAte(false);
                  setopenMOTdate(false);
                }}
              />
            )}
          </View>
          {MOTError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {MOTError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              // onPress={() =>
              //   setShowImage(VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC)
              // }
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.MOT_DOC
                    ? VEHICAL_DETAILS_?.MOT_DOC
                    : UserData?.motExpirationDocs,
                }}
                style={styles.uploadImgView}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  onSelectImage("MOT_DOC");
                }, 300);
              }}
              style={{
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.UPLOADBorderCOLOR,
                marginRight: "15%",
                height: HEIGHT * 0.05,
                width: WIDTH * 0.15,
              }}
            >
              <UploadSvgImage />
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          {MOTErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              Please attach MOT (Ministry of Transport).
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Upload Vehicle Images
          </Text>
          <View
            style={{
              width: WIDTH * 0.9,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ ...styles.LabelTEXT, marginLeft: "10%" }}
            >
              Frontal
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...styles.uploadView,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri: VEHICAL_DETAILS_?.FRONTAL_PATH
                      ? VEHICAL_DETAILS_?.FRONTAL_PATH
                      : UserData?.frontVehicle,
                  }}
                  style={styles.uploadImgView}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onSelectImage1("Frontal");
                  }, 300);
                }}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginRight: "5%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: WIDTH * 0.9,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ ...styles.LabelTEXT, marginLeft: "10%" }}
            >
              {t("Lateral Left")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...styles.uploadView,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri: VEHICAL_DETAILS_?.LEFT_PATH
                      ? VEHICAL_DETAILS_?.LEFT_PATH
                      : UserData?.leftVehicle,
                  }}
                  style={styles.uploadImgView}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onSelectImage1("Lateral Left");
                  }, 300);
                }}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginRight: "5%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: WIDTH * 0.9,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ ...styles.LabelTEXT, marginLeft: "10%" }}
            >
              Lateral Right
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...styles.uploadView,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri: VEHICAL_DETAILS_?.RIGHT_PATH
                      ? VEHICAL_DETAILS_?.RIGHT_PATH
                      : UserData?.rightVehicle,
                  }}
                  style={styles.uploadImgView}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onSelectImage1("Lateral Right");
                  }, 300);
                }}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginRight: "5%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: WIDTH * 0.9,
              // alignSelf: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ ...styles.LabelTEXT, marginLeft: "10%" }}
            >
              {t("Back")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...styles.uploadView,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri: VEHICAL_DETAILS_?.BACK_PATH
                      ? VEHICAL_DETAILS_?.BACK_PATH
                      : UserData?.backVehicle,
                  }}
                  style={styles.uploadImgView}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onSelectImage1("Back");
                  }, 300);
                }}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginRight: "5%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {vehicleImages && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach vehicle Images.")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Booklet
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={Booklet}
              placeholder="Attach booklet"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setBooklet(text);
                if (BookletError) {
                  setBookletError(Validate_BookLet(text));
                }
              }}
              onBlur={() => {
                setBookletError(Validate_BookLet(Booklet));
              }}
              style={styles.WithoutDateInput}
            />
          </View>
          {BookletError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {BookletError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.uploadView,
                flexDirection: "row",
                marginTop: "5%",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: VEHICAL_DETAILS_?.BOOKLET_DOC
                    ? VEHICAL_DETAILS_?.BOOKLET_DOC
                    : UserData?.bookletNumberDocs,
                }}
                style={styles.uploadImgView}
              />

              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onSelectImage("BOOKLET_DOC");
                  }, 300);
                }}
                style={{
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.UPLOADBorderCOLOR,
                  marginLeft: "30%",
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.15,
                }}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {BookletErrorDOC && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach Booklet.")}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Other
          </Text>
          <View style={styles.MessageBOX}>
            <TextInput
              allowFontScaling={false}
              value={msgBOX}
              placeholder={t("Describe here...")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              maxLength={256}
              multiline
              onChangeText={(text: string) => {
                setmsgBOX(text);
                if (msgBOXError) {
                  setmsgBOXError(Validate_MSGBox(text));
                }
              }}
              onBlur={() => {
                setmsgBOXError(Validate_MSGBox(msgBOX));
              }}
              style={styles.MessageBOXINPUT}
            />
          </View>
          {msgBOXError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {msgBOXError}
            </Text>
          )}

          <WholeButton
            styles={{
              alignSelf: "center",
              marginTop: "5%",
              marginBottom: "5%",
            }}
            Label={t("UPDATE")}
            Action={() => updateDriverVehicleDetails()}
          />
          <SpinningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default EditDocumnets;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  HeadingONE: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingTop: "5%",
    fontWeight: Platform.OS === "ios" ? "500" : "400",
  },
  RequiredTEXT: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  RequiredTEXT2: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingTop: "4%",
  },
  RadioButtonView: {
    flexDirection: "row",
    width: WIDTH * 0.6,
    columnGap: 20,
    // alignItems: "center",
    // justifyContent: 'space-between',
    // backgroundColor:'red'
  },
  RedioEntireView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginTop: "3%",
  },
  LabelTEXT: {
    width: WIDTH * 0.89,
    alignSelf: "center",
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    // paddingVertical: "2.5%",
    paddingTop: 20,
    paddingBottom: 10,
  },
  PlaceHolderTEXT: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.PLACEHOLDERCOLOR2,
    lineHeight: 17,
    paddingLeft: "3%",
  },
  uploadTEXT: {
    color: COLORS.BLUE2,
    fontSize: 11,
    fontFamily: FONTS.light,
  },
  UploadViewSTYLE: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  UploadButton: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.2,
    paddingVertical: "3%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  UploadView: {
    height: HEIGHT * 0.15,
    width: WIDTH * 0.28,
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
  },
  uploadView: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.15,
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    paddingVertical: "3%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: "5%",
    position: "relative",
  },
  cancelView: {
    backgroundColor: COLORS.ERRORCOLORRED,
    borderRadius: 999,
    position: "absolute",
    top: -10,
    right: -10,
  },
  uploadImgView: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.15,
    borderRadius: 10,
  },
  FlatListUploadButton: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.14,
    paddingVertical: "6%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
  },
  GETText: {
    color: COLORS.PLACEHOLDERCOLOR2,
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
  MessageBOX: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
    borderRadius: 10,
    height: HEIGHT * 0.18,
  },
  MessageBOXINPUT: {
    borderRadius: 10,
    height: HEIGHT * 0.18,
    textAlignVertical: "top",
    paddingLeft: "2%",
    color: COLORS.BLACK3,
    fontFamily: FONTS.light,
    fontSize: 16,
  },
  PHONEErrorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 12,
    fontFamily: FONTS.regular,
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginTop: "1%",
    fontWeight: "400",
  },
  PhoneTextInput: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.5,
    borderRadius: 8,
    paddingLeft: "2%",
    color: COLORS.BLACK,
    fontSize: 17,
    fontFamily: FONTS.semibold,
  },
  WithoutDateInput: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.65,
    borderRadius: 8,
    paddingLeft: "2%",
    color: COLORS.BLACK,
    fontSize: 16,
    fontFamily: FONTS.semibold,
  },
  DateButton: {
    width: WIDTH * 0.12,
    paddingVertical: "3%",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: COLORS.UPLOADBorderCOLOR,
  },
  Radio_Headings: {
    color: COLORS.BLACK3,
    fontSize: 13,
    fontFamily: FONTS.semibold,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BuleText,
    paddingTop: 10,
  },
});
