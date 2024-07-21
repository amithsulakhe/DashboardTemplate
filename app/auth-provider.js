"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./auth-context";
import { setSession } from "./utils";

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      loading: false,
      user: action.payload,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "LOGOUT") {
    return { ...state, user: null };
  }
  return state;
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setSession(user);
        dispatch({
          type: "INITIAL",
          payload: {
            ...user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: null,
        });
      }
    } catch (err) {
      dispatch({
        type: "INITIAL",
        payload: null,
      });
    }
  }, []);

  //
  useEffect(() => {
    initialize();
  }, [initialize]);

  // during login
  const login = useCallback((user) => {
    setSession(user);
    dispatch({
      type: "LOGIN",
      payload: {
        ...user,
      },
    });
  }, []);

  // for logout
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";
  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      logout,
    }),
    [state.user, status, login, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
