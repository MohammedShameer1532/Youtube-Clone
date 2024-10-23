import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
