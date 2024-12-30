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
import Modal from "react-native-modal";
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
  UploadProfile,
  allVehicleTypes,
  getVehicleTypeAndStandard,
} from "../../Components/ApiConfig/EndPoints";
import PhotoFlatlis from "../../Components/PhotoFlatlist/PhotoFlatlis";
import { RootState } from "../../ReduxConfig/Store";
import SpinningLoader from "../../assets/SpinningLoader";
import { ErrorMessages } from "../../Components/ErrorMessages";
import { useIsFocused } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import instance from "../../Components/ApiConfig/ApiIntercept";
import { useTranslation } from "react-i18next";

const VehicleDetails = (props: any) => {
  const { t } = useTranslation();
  const [allVehicles, setAllVehicles] = useState("");

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
    VEHICAL_DETAILS_?.VEHICAL_TYPE || null
  );

  // Vehicle Name

  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNameError, setVehicleNameError] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleNumberError, setVehicleNumberError] = useState("");
  const [showImage, setShowImage] = useState("");
  // console.log("showImageshowImage11111", showImage);
  // console.log("Vehicleeeeeesss", Gender);
  // console.log("VEHICAL_DETAILS_?.VEHICAL_TYPE", VEHICAL_DETAILS_?.VEHICAL_TYPE);
  const [GenderError, setGenderError] = useState("");

  //Vehicle Standard
  const [StandardTYPE, setStandardTYPE] = useState<string | null>(
    VEHICAL_DETAILS_?.VEHICAL_CLASS || null
  );
  const [StandardTYPEError, setStandardTYPEError] = useState("");

  //PCO Vehicle
  const [Licensenumber, setLicensenumber] = useState(
    VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE || ""
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
  const [LICENCE, setLICENCE] = useState(
    VEHICAL_DETAILS_?.DRIVER_LICENSE || ""
  );
  const [LICENCEERROR, setLICENCEERROR] = useState("");
  const [LICENCEERRORDOC, setLICENCEERRORDOC] = useState(false);
  const [DriverLicenseView2, setDriverLicenseView2] = useState(
    VEHICAL_DETAILS_?.DRIVER_LICENSE || VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC
      ? true
      : false
  );
  //End DRIVER LICENSE Vehicle

  //Insurance Vehicle
  const [Insurance, setInsurance] = useState(VEHICAL_DETAILS_?.INSURANCE || "");
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
    VEHICAL_DETAILS_?.VEHICAL_LOGBOOK || ""
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
  const [MOT, setMOT] = useState(VEHICAL_DETAILS_?.MOT || "");
  const [MOTError, setMOTError] = useState("");
  const [MOTErrorDOC, setMOTErrorDOC] = useState(false);
  const [MOTView, setMOTView] = useState(
    VEHICAL_DETAILS_?.MOT || VEHICAL_DETAILS_?.MOT_DOC ? true : false
  );
  //End MOT_DOC Vehicle

  //CAR_LICENSE_DOC Vehicle
  // const [CarLicense, setCarLicense] = useState(
  //   VEHICAL_DETAILS_?.CAR_LICENSE || ""
  // );
  // const [CarLicenseError, setCarLicenseError] = useState("");
  // const [CarLicenseErrorDOC, setCarLicenseErrorDOC] = useState(false);
  // const [C_LICENCEView, setC_LICENCEView] = useState(
  //   VEHICAL_DETAILS_?.CAR_LICENSE || VEHICAL_DETAILS_?.CAR_LICENSE_DOC
  //     ? true
  //     : false
  // );
  //End CAR_LICENSE_DOC Vehicle

  // BOOKLET_DOC Vehicle
  const [Booklet, setBooklet] = useState(VEHICAL_DETAILS_?.BOOKLET || "");
  const [BookletError, setBookletError] = useState("");
  const [BookletErrorDOC, setBookletErrorDOC] = useState(false);
  const [BOOKLETView, setBOOKLETView] = useState(
    VEHICAL_DETAILS_?.BOOKLET || VEHICAL_DETAILS_?.BOOKLET_DOC ? true : false
  );
  //End BOOKLET_DOC Vehicle

  const [msgBOX, setmsgBOX] = useState(VEHICAL_DETAILS_?.OTHER || "");
  const [msgBOXError, setmsgBOXError] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDAte, setopenDAte] = useState(false);
  const [Vhehicaldate, setVhehicaldate] = useState(new Date());
  const [openVhehicalDate, setopenVhehicalDate] = useState(false);
  const [MOTdate, setMOTdate] = useState(new Date());
  const [openMOTdate, setopenMOTdate] = useState(false);
  const [TextSecure, setTextSecure] = useState(true);
  const [DriverLicenseTextSecure2, setDriverLicenseTextSecure2] =
    useState(true);
  const [INSURANCESecure, setINSURANCESecure] = useState(true);
  const [VLOGBOOKSecure, setVLOGBOOKSecure] = useState(true);
  const [MOTSecure, setMOTSecure] = useState(true);
  const [C_LICENCESecure, setC_LICENCESecure] = useState(true);
  const [BOOKLETSecure, setBOOKLETSecure] = useState(true);
  const [vehicleImages, setVehicleImages] = useState(false);
  const [standardTypeOptions, setStandardTypeOptions] = useState([]);
  console.log("vehicleImages", vehicleImages);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleSelectedValue = (value: string) => {
    // dispatch(saveVEHICAL_TYPE(value));
    setGender(value);
    setSelectedVehicle(value);
  };

  type ImageData = {
    path: string;
  };

  const [FlatListImageError, setFlatListImageError] = useState<
    string | undefined
  >(undefined);

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
    // axios({
    //   method: "post",
    //   url: UploadProfile,
    //   headers: {
    //     token: token,
    //   },
    //   data: formData,
    // })
    //   .then((response) => {
    //     const responseData = response.data;
    //     setLoader(false);
    //     if (responseData.responseCode === 200) {
    //       if (title == "Lateral Left") {
    //         dispatch(saveLEFT_PATH(responseData?.result));
    //       } else if (title == "Frontal") {
    //         dispatch(saveFRONTAL_PATH(responseData?.result));
    //       } else if (title == "Lateral Right") {
    //         dispatch(saveRIGHT_PATH(responseData?.result));
    //       } else {
    //         dispatch(saveBACK_PATH(responseData?.result));
    //       }
    //       setVehicleImages(false);
    //       const updateds = DATA.map((item) => {
    //         if (title == item?.title) {
    //           return { ...item, ["image"]: responseData?.result };
    //         } else {
    //           return item;
    //         }
    //       });
    //       setDATA(updateds);
    //     } else {
    //       setLoader(false);
    //     }
    //   })
    //   .catch(async (err) => {
    //     if (retries < maxRetries) {
    //       retries++;
    //       // Retry the request after a delay
    //       await UploadImageFLATLIST(Image, title); // Retry after 3 seconds (adjust as needed)
    //     } else {
    //       showMessage({
    //         message: "Something went wrong pleas try again.",
    //         duration: 1000,
    //         type: "danger",
    //       });
    //       // Handle max retries reached
    //     }
    //     setLoader(false);
    //     console.log("Errorerrorerror:", err);
    //   });
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
          props.navigation.navigate("AccountDetails");
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

  // const getVehicleTypes = async () => {
  //   try {
  //     const res = await axios({
  //       method: "get",
  //       url: allVehicleTypes,
  //     });
  //     console.log(
  //       "resssssssssssddddd getVehicleTypes",
  //       res?.data?.result?.docs
  //     );
  //     setAllVehicles(res?.data?.result?.docs);
  //   } catch (error) {
  //     console.log("error getVehicleTypes", error?.response);
  //   }
  // };

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

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header
          Heading={t("Complete Your Profile")}
          navigation={props?.navigation}
        />
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
            {"Vehicle Name"}
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
            {t("Vehicle Number")}
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
              maxLength={9}
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
            <View style={{ flexDirection: "row" }}>
              {/* baad me */}

              {/* <TouchableOpacity
                onPress={() => setPCOopenDAte(true)}
                style={styles.DateButton}
              >
                <VECTOR_ICONS.Ionicons
                  name={"calendar-clear-sharp"}
                  size={25}
                  color={COLORS.GRAY3}
                />
              </TouchableOpacity> */}

              {ShoeView == true ? (
                <>
                  <TouchableOpacity
                    // onPress={() => setTextSecure(!TextSecure)}
                    onPress={() =>
                      setShowImage(VEHICAL_DETAILS_?.PCO_VEHICAL_LICENSE_DOC)
                    }
                    style={styles.UploadButton}
                  >
                    <VECTOR_ICONS.Feather
                      name={"eye"}
                      color={COLORS.BLUE2}
                      size={18}
                    />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      {t("View")}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => onSelectImage("PCO_VEHICAL_LICENSE_DOC")}
                    style={styles.UploadButton}
                  >
                    <UploadSvgImage />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      {t("Upload")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          {LicensenumberError ? (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {LicensenumberError}
            </Text>
          ) : (
            LicensenumberDOCError && (
              <Text
                allowFontScaling={false}
                style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
              >
                {t("Please attach PCO Vehicle Licence.")}
              </Text>
            )
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

            {DriverLicenseView2 == true ? (
              <>
                <TouchableOpacity
                  // onPress={() =>
                  //   setDriverLicenseTextSecure2(!DriverLicenseTextSecure2)
                  // }
                  onPress={() =>
                    setShowImage(VEHICAL_DETAILS_?.DRIVER_LICENSE_DOC)
                  }
                  style={styles.UploadButton}
                >
                  <VECTOR_ICONS.Feather
                    name={"eye"}
                    color={COLORS.BLUE2}
                    size={18}
                  />
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    {t("View")}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    setTimeout(() => {
                      onSelectImage("DRIVER_LICENSE_DOC");
                    }, 300)
                  }
                  style={styles.UploadButton}
                >
                  <UploadSvgImage />
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    {t("Upload")}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* <TouchableOpacity
           onPress={() => openGallery1()}
          style={styles.UploadButton}>
            <UploadSvgImage />
            <Text allowFontScaling={false} style={styles.uploadTEXT}>Upload</Text>
          </TouchableOpacity> */}
          </View>
          {LICENCEERROR ? (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {LICENCEERROR}
            </Text>
          ) : (
            LICENCEERRORDOC && (
              <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
                {t("Please attach Driver Licence.")}
              </Text>
            )
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
              // secureTextEntry={INSURANCESecure}
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

              {DriverLicenseView3 == true ? (
                <>
                  <TouchableOpacity
                    // onPress={() => setINSURANCESecure(!INSURANCESecure)}
                    onPress={() =>
                      setShowImage(VEHICAL_DETAILS_?.INSURANCE_DOC)
                    }
                    style={styles.UploadButton}
                  >
                    <VECTOR_ICONS.Feather
                      name={"eye"}
                      color={COLORS.BLUE2}
                      size={18}
                    />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      {t("View")}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        onSelectImage("INSURANCE_DOC");
                      }, 300);
                    }}
                    style={styles.UploadButton}
                  >
                    <UploadSvgImage />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      {t("Upload")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
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
          {InsuranceError ? (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {InsuranceError}
            </Text>
          ) : (
            InsuranceErrorDOC && (
              <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
                {t("Please attach insurance.")}
              </Text>
            )
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
              // secureTextEntry={VLOGBOOKSecure}
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

              {VLOGBOOKView == true ? (
                <>
                  <TouchableOpacity
                    // onPress={() => setVLOGBOOKSecure(!VLOGBOOKSecure)}
                    onPress={() =>
                      setShowImage(VEHICAL_DETAILS_?.VEHICAL_LOGBOOK_DOC)
                    }
                    style={styles.UploadButton}
                  >
                    <VECTOR_ICONS.Feather
                      name={"eye"}
                      color={COLORS.BLUE2}
                      size={18}
                    />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      {t("View")}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        onSelectImage("VEHICAL_LOGBOOK_DOC");
                      }, 300);
                    }}
                    style={styles.UploadButton}
                  >
                    <UploadSvgImage />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      {t("Upload")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
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
          {VehicleLogbookError ? (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {VehicleLogbookError}
            </Text>
          ) : (
            VehicleLogbookErrorDOC && (
              <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
                {t("Please attach logbook.")}
              </Text>
            )
          )}

          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("MOT (Ministry of Transport)")}
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              editable={false}
              value={MOT}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              // secureTextEntry={MOTSecure}
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
              {MOTView == true ? (
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
                      {t("View")}
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
                      {t("Upload")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
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
          {MOTError ? (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {MOTError}
            </Text>
          ) : (
            MOTErrorDOC && (
              <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
                {t("Please attach MOT (Ministry of Transport).")}
              </Text>
            )
          )}

          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Upload Vehicle Images")}
          </Text>
          <View
            style={{
              width: WIDTH * 0.91,
              alignSelf: "center",
            }}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DATA}
              // renderItem={renderButton}
              renderItem={({ item, index }) => {
                return (
                  <PhotoFlatlis
                    item={item}
                    openGallery_={(title) => onSelectImage1(title)}
                    setItem={setSaveImage}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
          {vehicleImages && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {t("Please attach vehicle Images.")}
            </Text>
          )}

          {/* ****************************************     CAR LICENCE  ************************************************** */}
          {/* <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Car Licence
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={CarLicense}
              placeholder="Licence Number"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              // secureTextEntry={C_LICENCESecure}
              maxLength={16}
              onChangeText={(text: string) => {
                setCarLicense(text);
                if (CarLicenseError) {
                  setCarLicenseError(Validate_CarLicence(text));
                }
              }}
              onBlur={() => {
                setCarLicenseError(Validate_CarLicence(CarLicense));
              }}
              style={styles.WithoutDateInput}
            />

            {C_LICENCEView == true ? (
              <>
                <TouchableOpacity
                  // onPress={() => setC_LICENCESecure(!C_LICENCESecure)}
                  onPress={() =>
                    setShowImage(VEHICAL_DETAILS_?.CAR_LICENSE_DOC)
                  }
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
                      onSelectImage("CAR_LICENSE_DOC");
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
            )}
          </View>
          {CarLicenseError ? (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {CarLicenseError}
            </Text>
          ) : (
            CarLicenseErrorDOC && (
              <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
                Please attach car license.
              </Text>
            )
          )} */}
          {/* ****************************************************************************************** */}
          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            Booklet
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              value={Booklet}
              placeholder={t('"Attach booklet"')}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              // secureTextEntry={BOOKLETSecure}
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

            {BOOKLETView == true ? (
              <>
                <TouchableOpacity
                  // onPress={() => setBOOKLETSecure(!BOOKLETSecure)}
                  onPress={() => setShowImage(VEHICAL_DETAILS_?.BOOKLET_DOC)}
                  style={styles.UploadButton}
                >
                  <VECTOR_ICONS.Feather
                    name={"eye"}
                    color={COLORS.BLUE2}
                    size={18}
                  />
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    {t("View")}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => {
                      onSelectImage("BOOKLET_DOC");
                    }, 300);
                  }}
                  style={styles.UploadButton}
                >
                  <UploadSvgImage />
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    {t("Upload")}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {BookletError ? (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {BookletError}
            </Text>
          ) : (
            BookletErrorDOC && (
              <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
                {t("Please attach Booklet.")}
              </Text>
            )
          )}

          <Text allowFontScaling={false} style={styles.LabelTEXT}>
            {t("Other")}
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
            Label={t("CONTINUE")}
            Action={() => onContinuePress()}
          />
          <SpinningLoader loader={Loader} />
          {/* <RegistationSuccessPopUp
          modalVisible={isModalVisible}
          Message={"Registration Confirmation"}
          Congratulation={`Thank you for choosing to join us. We're almost there—your paperwork has been received, and we will reach out to you as soon as your details have been verified.`}
          // OK_Action={onOKAction()}        
        /> */}

          {/* <RideFinished
         modalVisible={isModalVisible}
         Message={"Ride Finished"}
         Pay_Status={'Cash Paid - $24.89'}
        /> */}
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <Modal
        isVisible={showImage ? true : false}
        onSwipeComplete={() => setShowImage("")}
        coverScreen={false}
        backdropColor="rgba(0,0,0,0.4)"
        onBackdropPress={() => setShowImage("")}
        onBackButtonPress={() => setShowImage("")}
        style={{
          flex: 1,
          margin: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <TouchableOpacity
          onPress={() => setShowImage("")}
          style={{
            height: HEIGHT * 0.5,
            width: WIDTH * 0.9,
            alignSelf: "center",
          }}
        >
          {showImage ? (
            <Image
              source={{ uri: showImage }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          ) : (
            <Text allowFontScaling={false} style={styles.textStyle}>
              {t("No document.")}
            </Text>
          )}
        </TouchableOpacity>
      </Modal>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default VehicleDetails;

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
