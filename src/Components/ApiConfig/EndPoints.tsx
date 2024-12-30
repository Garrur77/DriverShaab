export const BASEURL: string = "https://node-uberbooking.mobiloitte.io";
export const SOCKET_URL = "https://node-uberbooking.mobiloitte.io";
export const MAP_KEY = "AIzaSyCzU4XQ6D43-mEnHWZ5l3vobePxE6p2GRw";

// digvijay local
// export const BASEURL: string = "http://172.16.1.210:2031";
// export const SOCKET_URL = "http://172.16.1.210:2031";

// izhar local
//export const BASEURL: string = "http://172.16.6.83:2031";
// export const SOCKET_URL = "http://172.16.6.83:2031";

// //arun local
// export const BASEURL: string = "http://172.16.6.58:2031";
// export const SOCKET_URL = "http://172.16.6.58:2031";

// ****************** Register ***********************
export const REGISTERPOST = BASEURL + "/register";
export const VERIFY_OTP = BASEURL + "/verifyOTP";
export const UPDATE_Driver = BASEURL + "/updateDriverDetails";
export const RESEND_OTP = BASEURL + "/resendOTP";
export const UPDATEDETAILS_ = BASEURL + "/updateDetails";
export const getAdminAccountDetails = BASEURL + "/getAdminAccountDetails";

// ****************** Login ***********************
export const LOGINPOST = BASEURL + "/login";
export const UploadProfile = BASEURL + "/uploadFile";
export const VIEW_PROFILEDATA = BASEURL + "/getUserProfile";

//======Auth Google======//
export const googleGet = BASEURL + "/auth/google";

//======Auth socialLogin======//
export const socialLogin = BASEURL + "/socialLogin";

// ****************** Static Content ***********************
export const STATIC_CONTENT = BASEURL + "/fetchStaticContent";

// ****************** Bank account ***********************
export const ADD_BANK_ACCOUNT = BASEURL + "/addBankAccount";
export const payCommissionToAdmin = BASEURL + "/payCommissionToAdmin";
export const getPaidCommissionHistory = BASEURL + "/getPaidCommissionHistory";

// ****************** Announcements for driver by admin ***********************
export const announcementForDriver = BASEURL + "/viewAnnouncementByDriver";

// ****************** Ride history for driver ***********************
export const DriverRideHistory = BASEURL + "/rideHistoryForDriver";

// ****************** View driver profile ***********************
export const View_DetailsOfDriver = BASEURL + "/viewDetailsOfDriver";
export const ViewDocumentsByDriver = BASEURL + "/viewDocumentsByDriver";

// ****************** View driver profile ***********************
export const ViewRating = BASEURL + "/viewRatingByDriver";

// ****************** Delete event notifcations for driver ***********************
export const fetchNotification = BASEURL + "/fetchNotification";
export const deleteNotification = BASEURL + "/deleteNotification";
export const clearAllNotification = BASEURL + "/clearAllNotification";

// ****************** Update driver location ***********************
export const updateDriverLocation = BASEURL + "/updateDriverLocation";

// ****************** Rate rider ***********************
export const rateRider = BASEURL + "/giveReviewAndRating";

// ****************** Accept ride ***********************
export const acceptRideRequest = BASEURL + "/acceptRideRequest";

// ****************** Driver and rider meet ***********************
export const meetRiderDriver = BASEURL + "/meetRiderDriver";

// ****************** Driver and rider meet ***********************
export const cancelRide = BASEURL + "/cancelRide";

// ****************** Driver update request ***********************
export const driverRequestData = BASEURL + "/driverRequestData";

// ****************** Types of Vehicles ***********************
export const allVehicleTypes = BASEURL + "/vehicleTypeAndFeeListing";
export const getVehicleTypeAndStandard =
  BASEURL + "/getVehicleTypeAndVehicleStandard";

// ****************** Create SOS ***********************
export const createSOS = BASEURL + "/createSOS";

// ****************** Get Cash Wallet ***********************
export const cashWallet = BASEURL + "/getCashWallet";
export const updateUser = BASEURL + "/updateUser";

// ****************** Get Messages Driver to User and Vice Versa ***********************

export const getChatbyRideId = BASEURL + "/getChatbyRideId";

// ****************** Logout ***********************
export const driverLogOut = BASEURL + "/driverLogOut";

// ****************** Driver On/Off Duty ***********************
export const driverDutyStatus = BASEURL + "/driverOnDutyOffDuty";

// ****************** Free Driver ***********************
export const freeDriver = BASEURL + "/freeDriver";
