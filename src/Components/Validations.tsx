import { ErrorMessages } from "../Components/ErrorMessages";

/************************************* Regex ***************************************************/
export const EMAILREGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
// export const EMAILREGEX =
//   /^[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
export const PASSWORDREGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const DIGITREGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;

// export const FIRSTNAME_REGEX = /^[a-zA-Z]+$/;
export const FIRSTNAME_REGEX = /^[A-Z][a-zA-Z]*$/;

export const VEHICLE_NAME_REGEX = /^[a-zA-Z0-9 ]{2,50}$/;
// export const VEHICLE_NUMBER_REGEX = /^[A-Z0-9 ]{6,12}$/;
const VEHICLE_NUMBER_REGEX = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,3}\s?\d{1,4}$/;
// export const LASTREGEX_REGEX = /^[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/;
export const LASTREGEX_REGEX = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*){0,2}$/;
export const FULLNAME_REGEX =
  /^([a-zA-Z]*\s?[A-Za-z][a-zA-Z]]*)|([A-Za-z][a-zA-Z]*)$/;
export let DECIMAL_REGEX = /^\d*\.?\d*$/;
// export let NUMBER_REGEX = /^\d*$/;
export let NUMBER_REGEX = /^[A-Z0-9]*$/;
export let ACC_NUMBER = /^[0-9]{6,}$/;
export let ALPHABET_SPACE_REGEX = /^[a-zA-Z ]*$/;
export let WEBSITE_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export let USERNAME_REGEX = /^[a-z0-9_]*$/;
export let USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
export let alphabetic = /[a-zA-Z]/g;
// export let PhoneRegex = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
export let PhoneRegex = /^([0-9]){7,13}$/;

// Phone number regex for India (10 digits)
const indiaPhoneNumberRegex = /^(\+91-|\+91|0)?[6789]\d{10,15}$/;

// Phone number regex for International (Assuming any country code and 10 digits)
const internationalPhoneNumberRegex = /^\+\d{1,4}\d{10,15}$/;

// export let BANKNAME_REGEX = /^[A-Za-z0-9\s\-]+$/;
export let BANKNAME_REGEX = /^[a-zA-Z\s]+$/;
export let BRANCHNAME_REGEX = /^[a-zA-Z\s]+$/;

export let IFCS_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export let LICENCE_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
// export let DL_LICENSE_REGEX = /^[A-Z0-9-]{7,20}$/;
export let DL_LICENSE_REGEX = /^[A-Z]{2}-\d{2}[A-Z0-9]{4}\d{7}$/;

/************************************* All Validations ***************************************************/
/****** EMAIL VALIDATION *****/

export const ValidateEmail = (email: string) => {
  if (email != "") {
    if (EMAILREGEX.test(email)) {
      return "";
    } else {
      return ErrorMessages.EmailError;
    }
  } else {
    return ErrorMessages.EmailEmpty;
  }
};
/****** PASSWORD VALIDATION *****/
export const ValidatePassword = (password: any) => {
  if (password != "") {
    if (PASSWORDREGEX.test(password)) {
      return "";
    } else {
      return ErrorMessages.PasswordError;
    }
  } else {
    return ErrorMessages.PasswordEmpty;
  }
};

export const ValidatePasswordlogin = (password: any) => {
  if (password != "") {
    if (PASSWORDREGEX.test(password)) {
      return "";
    } else {
      return ErrorMessages.WrongPassword;
    }
  } else {
    return ErrorMessages.PasswordEmpty;
  }
};
/****** FORGOT PASSWORD VALID *****/
// export const CodeVerification = Code => {
//   if (Code != '') {
//     if (Code == '0000') {
//       return '';
//     } else {
//       return ErrorMessages.CodeError;
//     }
//   } else {
//     return ErrorMessages.CodeEmpty;
//   }
// };
/****** Validation ChangePassword *****/
export const ValidateChangePassword = (changepassword_: any) => {
  if (changepassword_ != "") {
    if (changepassword_.length < 8) {
      return ErrorMessages.ChangePasswordbelow8;
    } else {
      if (PASSWORDREGEX.test(changepassword_)) {
        return "";
      } else {
        return ErrorMessages.PasswordError;
      }
    }
  } else {
    return ErrorMessages.ChangepasswordEmpty;
  }
};

/****** Validation ConfirmPassword *****/
export const ValidateConfirmPassword = (
  ConfirmPassword: any,
  Password: any
) => {
  if (ConfirmPassword != "") {
    if (ConfirmPassword == Password) {
      return "";
    } else {
      return ErrorMessages.ConfirmPasswordMatch;
    }
  } else {
    return ErrorMessages.ConfirmPasswordEmpty;
  }
};

/****** Validation Fullname *****/
export const ValidateFullname = (fullname: string) => {
  if (fullname !== "") {
    if (fullname?.length > 2 && LASTREGEX_REGEX.test(fullname)) {
      return "";
    } else {
      if (fullname.length < 3) {
        return ErrorMessages.FullnameError;
      } else {
        return ErrorMessages.FullnameError;
      }
    }
  } else {
    return ErrorMessages.FullnameEmpty;
  }
};
/****** Validation First_name *****/
export const ValidateFirstname = (firstname: string) => {
  if (firstname !== "") {
    if (FIRSTNAME_REGEX.test(firstname)) {
      return "";
    } else {
      return ErrorMessages.FirstNameError;
    }
  } else {
    return ErrorMessages.FirstNameEmpty;
  }
};
/****** Validation Last_name *****/
export const ValidateLastname = (lastName: string) => {
  if (lastName !== "") {
    if (LASTREGEX_REGEX.test(lastName)) {
      return "";
    } else {
      return ErrorMessages.LastNameError;
    }
  } else {
    return ErrorMessages.LastNameEmpty;
  }
};
/****** Validation Acc_Number *****/
export const ValidateAccNumber = (accNumber: string) => {
  if (accNumber !== "") {
    if (ACC_NUMBER.test(accNumber) && accNumber.length >= 6) {
      return "";
    } else {
      return ErrorMessages.AccError;
    }
  } else {
    return ErrorMessages.AccEmpty;
  }
};
/****** Validation Acc_Number *****/
export const ValidateConfirmAccNumber = (
  CaccNumber: string,
  accNumber: string
) => {
  if (CaccNumber !== "") {
    if (CaccNumber == accNumber) {
      return "";
    } else {
      return ErrorMessages.ConfirmAccNumError;
    }
  } else {
    return ErrorMessages.AccEmpty;
  }
};

/****** Validation Bank name *****/
export const validateBankName = (bankName: any) => {
  if (bankName.trim() === "") {
    return ErrorMessages.BankNameEmpty;
  } else if (!BANKNAME_REGEX.test(bankName)) {
    return ErrorMessages.BankNameError;
  } else {
    return "";
  }
};
/****** Validation Branch name *****/
export const validateBranchName = (branchName: any) => {
  if (branchName.trim() === "") {
    return ErrorMessages.BranchNameEmpty;
  } else if (!BRANCHNAME_REGEX.test(branchName)) {
    return ErrorMessages.BranchNameError;
  } else {
    return "";
  }
};

/****** Validation IFSC code *****/
export const validateIFSC = (IFSC: any) => {
  // if (IFSC != '') {

  //     return '';
  //   } else {
  //     return ErrorMessages.IFSCError;
  //   }

  if (IFSC != "") {
    if (IFCS_REGEX.test(IFSC)) {
      return "";
    } else {
      return ErrorMessages.IFSCError;
    }
  } else {
    return ErrorMessages.IFSCEmpty;
  }
};

/****** Validation Tax num *****/
export const validateTAXNumber = (Tax: any) => {
  if (Tax != "") {
    if (NUMBER_REGEX.test(Tax)) {
      return "";
    } else {
      return ErrorMessages.TaxError;
    }
  } else {
    return ErrorMessages.TaxEmpty;
  }
};

/****** Validation AGE *****/
export const ValidateAge = (age: any) => {
  if (age !== "" && age >= 18 && age <= 60) {
    return "";
  } else if (age !== "" && age < 18) {
    return ErrorMessages.ValidAge;
  } else if (age == "") {
    return ErrorMessages.AgeEmpty;
  } else {
    return ErrorMessages.ValidAgeError;
  }
};

export const OTPVerification = (Code: number) => {
  const codeStr = Code.toString();
  if (codeStr != "") {
    if (codeStr.length != 6) {
      return ErrorMessages.CodeLengthError;
    } else {
      return "";
    }
  } else {
    return ErrorMessages.CodeEmpty;
  }
};

// export const ValidateMobileNo = (MobileNumber : number) => {

//     const NumberStr = MobileNumber.toString();

//   if (NumberStr != '') {
//     if (PhoneRegex.test(NumberStr)) {
//       return '';
//     }
//     else {
//       return ErrorMessages.PhoneNumberError
//     }
//   } else {
//     return ErrorMessages.PhoneNoEmpty
//   }
// }
export const ValidateMobileNo = (code: string, MobileNumber: string) => {
  console.log("data---->MobileNumber", MobileNumber);
  if (MobileNumber !== "") {
    const NumberStr = MobileNumber.toString(); // Convert to string

    // if (code === "+91") {
    //   if (indiaPhoneNumberRegex.test(MobileNumber)) {
    //     return "";
    //   } else {
    //     return ErrorMessages.PhoneNumberError;
    //   }
    // } else {
    //   if (internationalPhoneNumberRegex.test(MobileNumber)) {
    //     return "";
    //   } else {
    //     return ErrorMessages.PhoneNumberError;
    //   }
    // }
    if (MobileNumber.length > 8 && MobileNumber.length < 16) {
      return "";
    } else {
      return ErrorMessages.PhoneNumberError;
    }
  } else {
    return ErrorMessages.PhoneNoEmpty;
  }
};
export const ValidateLicenceNO = (Licensenumber: string) => {
  if (Licensenumber !== "") {
    if (NUMBER_REGEX.test(Licensenumber)) {
      return "";
    } else {
      return ErrorMessages.PCOERROR;
    }
  } else {
    return ErrorMessages.PCOEmpty;
  }

  // if (Licensenumber !== "") {
  //   return "";
  // } else {
  //   return ErrorMessages.PCOEmpty;
  // }
};

export const Validate_DLLicenceNO = (DL_no: string) => {
  if (DL_no !== "") {
    const L_NumberStr = DL_no.toString();

    if (DL_LICENSE_REGEX.test(L_NumberStr)) {
      return "";
    } else {
      return ErrorMessages.DLError;
    }
  } else {
    return ErrorMessages.DLEmpty;
  }
};

export const Validate_VehicleName = (vehicleName: string) => {
  if (vehicleName !== "") {
    const nameStr = vehicleName.toString();

    if (VEHICLE_NAME_REGEX.test(nameStr)) {
      return "";
    } else {
      return ErrorMessages.VehicleNameError;
    }
  } else {
    return ErrorMessages.VehicleNameEmpty;
  }
};

export const Validate_VehicleNumber = (vehicleNumber: string) => {
  if (vehicleNumber !== "") {
    const numberStr = vehicleNumber.toString();

    if (VEHICLE_NUMBER_REGEX.test(numberStr)) {
      return "";
    } else {
      return ErrorMessages.VehicleNumberError;
    }
  } else {
    return ErrorMessages.VehicleNumberEmpty;
  }
};

export const Validate_Insurance = (Insurance: string) => {
  if (Insurance !== "") {
    return "";
  } else {
    return ErrorMessages.INSURANSE_Empty;
  }
};
export const Validate_Vhehical = (vehical: string) => {
  if (vehical !== "") {
    return "";
  } else {
    return ErrorMessages.VEHICAL_Empty;
  }
};

export const Validate_MOT = (MOT: string) => {
  if (MOT !== "") {
    return "";
  } else {
    return ErrorMessages.MOT_EMPTY;
  }
};
export const Validate_CarLicence = (carL: string) => {
  if (carL !== "") {
    const CL_NumberStr = carL.toString();

    if (DL_LICENSE_REGEX.test(CL_NumberStr)) {
      return "";
    } else {
      return ErrorMessages.CAR_LI_Error;
    }
  } else {
    return ErrorMessages.CAR_LI_Empty;
  }
};

//^[\w\s.,!?()-:;'"&]+$   booklet REGEX

export const Validate_BookLet = (booklet: string) => {
  if (booklet !== "") {
    const BL_NumberStr = booklet.toString();

    if (NUMBER_REGEX.test(BL_NumberStr) && BL_NumberStr.length >= 6) {
      return "";
    } else {
      return ErrorMessages.BOOKLETEmpty;
    }
  } else {
    return ErrorMessages.BOOKLETEmpty;
  }
};
export const Validate_MSGBox = (magBox: string) => {
  if (magBox !== "") {
    const msg_NumberStr = magBox.toString();

    if (msg_NumberStr.length >= 8) {
      return "";
    } else {
      return ErrorMessages.msgEMPTY;
    }
  } else {
    return ErrorMessages.msgEMPTY;
  }
};

export const validateImage = (image: string) => {
  console.log("imageimageimageimage", image);

  if (image != "") {
    return "";
  } else {
    return ErrorMessages.uploadMess;
  }
};

export const validateImageOtherImgaes = (image: string) => {
  if (image != "") {
    return true;
  } else {
    return false;
  }
};
