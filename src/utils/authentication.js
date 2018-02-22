
export const saveSessionToken = token => {
  localStorage.authToken = token;
};

export const getSessionToken = () => {
  return localStorage.authToken;
};

export const clearSessionToken = () => {
  delete localStorage.authToken;
};

export const hasSession = () => !!localStorage.authToken;
