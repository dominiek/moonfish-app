
export const saveLoginToken = token => {
  localStorage.adminAuthToken = token;
};

export const getLoginToken = () => {
  return localStorage.adminAuthToken;
};

export const clearLoginToken = () => {
  delete localStorage.adminAuthToken;
};

export const isLoggedIn = () => !!localStorage.adminAuthToken;
