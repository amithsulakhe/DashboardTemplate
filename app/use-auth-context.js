import { useContext } from "react";
import { AuthContext } from "./auth-context";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
