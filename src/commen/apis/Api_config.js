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

// getCorporateUsersLoginHistory in ERM in Customer Login History
const customerCorporateHistory = {
  RequestMethod: "ServiceManager.GetCorporateUsersLoginHistory",
};

// for get all Corporate Categories in ERM in Category dropdown
const getCorporateCategory = {
  RequestMethod: "ServiceManager.GetAllCorporateCategories",
};

//get Get Bank Users Logi nHistory in ERM in User Login History Page
const userBankLoginHistory = {
  RequestMethod: "ServiceManager.GetBankUsersLoginHistory",
};

export {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRefreshToken,
  authenticationRoleList,
  customerCorporateHistory,
  getCorporateCategory,
  userBankLoginHistory,
};
