const authenticationLogIn = {
  RequestMethod: "ServiceManager.Login",
};

const authenticationSignUp = {
  RequestMethod: "ServiceManager.SignUp",
};

const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

const authenticationRoleList = {
  RequestMethod: "ServiceManager.RoleList",
};

// for get all Corporate Categories in ERM in Category dropdown
const getCorporateCategory = {
  RequestMethod: "ServiceManager.GetAllCorporateCategories",
};

//get Get Bank Users Logi nHistory in ERM in User Login History Page
const userBankLoginHistory = {
  RequestMethod: "ServiceManager.GetBankUsersLoginHistory",
};

// search Bank Users Login History API
const bankSearchLoginHistory = {
  RequestMethod: "ServiceManager.SearchBankUsersLoginHistory",
};

// get All Corporate User Api System Admin API
const getAllCorporateUserSysAdmin = {
  RequestMethod: "ServiceManager.GetAllCorporateUsers",
};

// for search coporate User API in system Admin
const searchCorporateUsersSysAdmin = {
  RequestMethod: "ServiceManager.SearchCorporateUsers",
};

// for get All User status API ERM system Admin
const getAllUserStatusERMAdmin = {
  RequestMethod: "ServiceManager.GetAllUserStatus",
};

//get all corporate in company dropdown
const getAllCorporatesApiERM = {
  RequestMethod: "ServiceManager.GetAllCorporates",
};

// update corporate User Api
const updateCorporateApiSysAdmin = {
  RequestMethod: "ServiceManager.UpdateCorporateUser",
};

// get All Bank Corporate By Bank ID Api
const getAllBankCorporate = {
  RequestMethod: "ServiceManager.GetAllCorporatesByBankID",
};

// get All Nature of Business API in ERM Auth
const getAllNatureAPI = {
  RequestMethod: "ServiceManager.GetAllNatureOfBussiness",
};

// get all Corporate Name By Bank ID
const getCorporateNameApi = {
  RequestMethod: "ServiceManager.GetAllCorporateNameByBankID",
};

const UpdateCorporateMapping = {
  RequestMethod: "ServiceManager.UpdateCorporateCategoryMapping",
};

const Addcateogry = {
  RequestMethod: "ServiceManager.AddCorporateCategory",
};

const getallCoporatesSystem = {
  RequestMethod: "ServiceManager.GetAllCorporateDetails",
};

const UpdateCorporateCategory = {
  RequestMethod: "ServiceManager.UpdateCorporateCategory",
};

// for update on bank user list page UpdateUserByUserID
const updateUserByUserIDApi = {
  RequestMethod: "ServiceManager.UpdateUserbyUserID",
};

// download Reports coporateUserLogin History Report
const downloadCorporateUserLogin = {
  RequestMethod: "CorporateUsersLoginHistoryReport",
};

//DOWNLOAD REPORTS FOR BANK USER LOGIN HISTORY REPORT
const downloadBankUserLoginHistory = {
  RequestMethod: "BankUsersLoginHistoryReportExcel",
};

//upload counter party Limit Excel file
const uploadCounterPartyFile = {
  RequestMethod: "ServiceManager.CounterPartyLimitExcelUpload",
};

//GetCounterPartyLimitByCorporateID in counter party API
const getCounterPartyLmit = {
  RequestMethod: "ServiceManager.GetCounterPartyLimitByCorporateID",
};

//save counter party Limit API
const saveCounterPartyApi = {
  RequestMethod: "ServiceManager.SavecounterPartyLimit",
};

// get volmeters by bank ID api in vol meter page
const VolatilityMeterAPI = {
  RequestMethod: "ServiceManager.GetVolMetersByBankID",
};

//add Update VolMeter API in vol meter page
const addUpdateVolApi = {
  RequestMethod: "ServiceManager.AddUpdateVolmeter",
};

//Delete a Category

const DeleteCategory = {
  RequestMethod: "ServiceManager.DeleteCorporateCategory",
};

// search company user login history this API is use for data rendering or searching(both)
const searchGetCompanyUserLoginHistory = {
  RequestMethod: "ServiceManager.SearchCompanyUsersLoginHistory",
};

// search bank user login history this API is use for data rendering or searching(both)
const searchGetBankUserLoginHistory = {
  RequestMethod: "ServiceManager.SearchBankUsersLoginHistory",
};

// search bank User List this API is used for data rendering or Searching(both)
const searchGetBankUserList = {
  RequestMethod: "ServiceManager.SearchBankUsers",
};

// updateCorporateByCorporateId in system Admin on Customer List page to update NAture Business
const updateCorporateIdApi = {
  RequestMethod: "ServiceManager.UpdateCorporateByCorporateID",
};

// download counter party file
const counterPartyDownloadApi = {
  RequestMethod: "DownloadFile",
};

export {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRefreshToken,
  authenticationRoleList,
  getCorporateCategory,
  userBankLoginHistory,
  bankSearchLoginHistory,
  getAllCorporateUserSysAdmin,
  searchCorporateUsersSysAdmin,
  getAllUserStatusERMAdmin,
  getAllCorporatesApiERM,
  updateCorporateApiSysAdmin,
  getAllBankCorporate,
  getAllNatureAPI,
  getCorporateNameApi,
  UpdateCorporateMapping,
  Addcateogry,
  getallCoporatesSystem,
  UpdateCorporateCategory,
  downloadCorporateUserLogin,
  downloadBankUserLoginHistory,
  uploadCounterPartyFile,
  getCounterPartyLmit,
  saveCounterPartyApi,
  updateUserByUserIDApi,
  VolatilityMeterAPI,
  addUpdateVolApi,
  DeleteCategory,
  searchGetCompanyUserLoginHistory,
  searchGetBankUserLoginHistory,
  searchGetBankUserList,
  updateCorporateIdApi,
  counterPartyDownloadApi,
};
