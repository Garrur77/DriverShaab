type ErrorType = {
  [key: string]: string;
};

export const ErrorMessages: ErrorType = {
  EmailEmpty: "Please enter your email address.",
  EmailError: "Please enter valid email address.",
  PasswordEmpty: "Please enter your password.",
  PasswordError:
    "Password should be 8 to 16 characters long and include uppercase and lowercase letters, numbers, and special characters.",
  CodeEmpty: "Please enter code.",
  CodeError: "Invalid OTP. Try again!",
  ChangepasswordEmpty: "Please enter your password.",
  ChangepasswordError: "Please enter valid password.",
  ChangePasswordbelow8: "Password content at least 8 characters.",
  ConfirmPasswordEmpty: "Please enter your password.",
  ConfirmPasswordMatch: `Password must match.`,
  confirmPasswordForNew: `The confirm password should match the new password.`,
  FullnameError: "Please enter valid account holder name.",
  FullnameEmpty: "Please enter your account holder name.",
  CodeLengthError: "Invalid OTP",
  PhoneNumberError: "Please enter valid mobile number.",
  PhoneNoEmpty: "Please enter mobile number.",
  CityLengthInvalid: "City name should be in range[3,50].",
  WhereFromError: "Please select your start location.",
  WhereToError: "Please select your end location.",
  TripDatesError: "Please select trip dates.",
  WrongPassword: "The password is incorrect.",
  TravelError: "Please select travelers.",
  EmptyMessage: "Please enter your message.",
  MessgaeLength: "Message should content at least 8 characters.",
  CategoryError: "Please add your category.",

  // *************************************
  FirstNameEmpty: "Please enter your first name. ",
  FirstNameError: "Please enter a valid first name, e.g., John.",
  VehicleNameError: "Please enter valid vehicle name.",
  VehicleNameEmpty: "Please enter vehicle name.",
  VehicleNumberError:
    "Please enter valid vehicle number, e.g., WB 20 CSS 1234.",
  VehicleNumberEmpty: "Please enter vehicle number.",
  LastNameEmpty: "Please enter your last name.",
  LastNameError: "Please enter valid last name, e.g., Johnson, Johnson Lee",

  AgeEmpty: "Please enter your age.",
  ValidAge: "Your age should be 18 or above.",
  ValidAgeError: "Please enter an age between 18 and 60, inclusive.",

  AccEmpty: "Please enter account number.",
  AccError: "Please enter valid account number.",
  ConfirmAccNumError: "Account number doesn’t match",

  BankNameEmpty: "Please enter bank name.",
  BankNameError: "Please enter valid bank name.",
  BranchNameEmpty: "Please enter branch name.",
  BranchNameError: "Please enter valid branch name.",

  IFSCEmpty: "Please enter routing number.",
  IFSCError: "Please enter valid routing number (e.g., ABCD0123456).",

  TaxEmpty: "Please enter tax number.",
  TaxError: "Please enter valid tax number.",

  PCOEmpty: "Please enter  PCO Vehicle Licence.",
  PCOERROR: "Please enter valid PCO Vehicle Licence (e.g., PCO1234567).",

  DLEmpty: "Please enter Driver Licence number.",
  DLError: "Please enter valid Driver Licence number (e.g., DL-0420110149646).",
  INSURANSE_Empty: "Please enter expiry date and attach insurance.",
  VEHICAL_Empty: "Please enter expiry date and attach logbook.",
  MOT_EMPTY: "Please enter expiry date and attach logbook.",
  CAR_LI_Empty: "Please enter car licence number and attach Licence of car.",
  CAR_LI_Error: "Please enter valid car licence number.",
  BOOKLETEmpty: "Please enter the booklet and and attach booklet.",
  msgEMPTY: "Please enter other details about vehicle if any.",
  uploadMess: "Please upload image.",
};
