import { useState, useEffect, useCallback } from "react";

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [rol, setRol] = useState(false);

  const login = useCallback((uid, token, rol, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setRol(rol);
    const remainingTime = 60 * 60 * 1000; // 1 hora
    const expiryDate =
      expirationDate || new Date(new Date().getTime() + remainingTime); // fecha actual + 1 hora
    setTokenExpirationDate(expiryDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        rol: rol,
        expiration: expiryDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRol(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime(); // tiempo restante en milisegundos
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.rol,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, rol };
};
