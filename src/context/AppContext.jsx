"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { actions } from "./actions";

const initialState = {
  showAuthModel: false,
  showLogin: true,
  user: null,
  showcart: false,
  cart: {
    amount: 0,
    total: 0,
    cartItems: [],
  },
};
const AppContext = createContext(initialState);
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //=============AUTH CONTROLLERS STARTS ===============================
  const closeAuthModel = () => {
    dispatch({ type: actions.CLOSE_AUTH_MODEL });
  };
  const toggleLogin = (payload) => {
    dispatch({ type: actions.TOGGLE_LOGIN, payload });
  };
  //=============AUTH CONTROLLERS ENDS ===============================

  //=============CART CONTROLLERS STARTS ===============================
  const addCartItem = (payload) => {
    dispatch({ type: actions.ADD_TO_CART, payload });
  };
  const toggleCartModel = () => {
    dispatch({ type: actions.TOGGLE_CART_MODEL });
  };
  const removeCartItem = (payload) => {
    dispatch({ type: actions.REMOVE_FROM_CART, payload });
  };
  const increaseCartItem = (payload) => {
    dispatch({ type: actions.INCREASE_CART_ITEM, payload });
  };
  const decreaseCartItem = (payload) => {
    dispatch({ type: actions.DECREASE_CART_ITEM, payload });
  };
  const clearCart = () => {
    dispatch({ type: actions.CLEAR_CART });
  };
  const getCartTotals = () => {
    dispatch({ type: actions.GET_CART_TOTALS });
  };
  //=============CART CONTROLLERS ENDS ===============================

  useEffect(() => {
    getCartTotals();
  }, [state?.cart?.cartItems]);
  const share = {
    ...state,
    closeAuthModel,
    toggleLogin,
    addCartItem,
    removeCartItem,
    increaseCartItem,
    decreaseCartItem,
    toggleCartModel,
    clearCart,
  };

  return (
    <AppContext.Provider value={{ ...share }}> {children} </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
