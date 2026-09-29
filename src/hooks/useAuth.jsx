import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};
