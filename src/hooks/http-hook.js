import { useState, useCallback, useRef, useEffect } from "react";
import {HttpError} from "../util/http-error.js";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const activeHttpRequests = useRef([]);
  
    const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
  
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
  
        const responseData = await response.json();
        console.log(response.status);
        if (!response.ok) {
          throw new HttpError(responseData.message, response.status);
        }
        setIsLoading(false);
  
        return responseData;
      } catch (err) {
        console.log(err);
        setError({message: err.message || "Something went wrong, please try again later.", errorCode: err.code});
        setIsLoading(false);
        throw err;
      }
    }, []);
  
    const clearError = () => {
      setError(null);
    };
  
    return { isLoading, error, sendRequest, clearError };
  };