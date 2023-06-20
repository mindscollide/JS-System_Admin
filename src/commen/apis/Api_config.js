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

// search company Users Login History Api
const companySearchLoginHistory = {
  RequestMethod: "ServiceManager.SearchCompanyUsersLoginHistory",
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

// get all Corporate Users Login History Api
const getCorporateUserLoginApiERM = {
  RequestMethod: "ServiceManager.GetCorporateUsersLoginHistory",
};

// get all Corporate Name By Bank ID
const getCorporateNameApi = {
  RequestMethod: "ServiceManager.GetAllCorporateNameByBankID",
};

// get all bank users in bank user list page
const getBankUserApi = {
  RequestMethod: "ServiceManager.GetAllBankUsers",
};

const getallCoporatesSystem = {
  RequestMethod: "ServiceManager.GetAllCorporateDetails",
};

const UpdateCorporateMapping = {
  RequestMethod: "ServiceManager.UpdateCorporateCategoryMapping",
};

const Addcateogry = {
  RequestMethod: "ServiceManager.AddCorporateCategory",
};

const UpdateCorporateCategory = {
  RequestMethod: "ServiceManager.UpdateCorporateCategory",
};
export {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRefreshToken,
  authenticationRoleList,
  getCorporateCategory,
  userBankLoginHistory,
  companySearchLoginHistory,
  bankSearchLoginHistory,
  getAllCorporateUserSysAdmin,
  searchCorporateUsersSysAdmin,
  getAllUserStatusERMAdmin,
  getAllCorporatesApiERM,
  updateCorporateApiSysAdmin,
  getAllBankCorporate,
  getAllNatureAPI,
  getCorporateUserLoginApiERM,
  getCorporateNameApi,
  getBankUserApi,
  getallCoporatesSystem,
  UpdateCorporateMapping,
  Addcateogry,
  UpdateCorporateCategory,
};
