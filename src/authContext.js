import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
  authToken:'',
  setAuthToken: (token)=>{}
});

export default authContext;