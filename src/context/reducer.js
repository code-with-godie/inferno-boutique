import { actions } from './actions';
import {
  addToCart,
  clearCart,
  closeAuthModel,
  decreaseCartItem,
  getCartTotal,
  increaseCartItem,
  removeCartItem,
  toggleCartModel,
  toggleLogin,
} from './controllers';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CLOSE_AUTH_MODEL:
      return closeAuthModel(state);
    case actions.TOGGLE_LOGIN:
      return toggleLogin(state, action.payload);
    case actions.ADD_TO_CART:
      return addToCart(state, action.payload);
    case actions.REMOVE_FROM_CART:
      return removeCartItem(state, action.payload);
    case actions.INCREASE_CART_ITEM:
      return increaseCartItem(state, action.payload);
    case actions.DECREASE_CART_ITEM:
      return decreaseCartItem(state, action.payload);
    case actions.GET_CART_TOTALS:
      return getCartTotal(state);
    case actions.TOGGLE_CART_MODEL:
      return toggleCartModel(state);
    case actions.CLEAR_CART:
      return clearCart(state);

    default:
      throw new Error('unhandled action type' + action.type);
  }
};
