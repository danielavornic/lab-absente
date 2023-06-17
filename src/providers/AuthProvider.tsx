import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { Role, User } from "types";

export interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
  user: User | null;
  setUser: (newUser: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: "Popescu",
    surname: "Ion",
    role: Role.PROF,
  });

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
    if (newToken) {
      const userToken = JSON.parse(atob(newToken.split(".")[1]));
      setUser(userToken);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken, user, setUser }), [token, user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
