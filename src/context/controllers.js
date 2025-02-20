//=============AUTH LOGIC STARTS ===============================

export const toggleLogin = (state, payload) => {
  return { ...state, showLogin: payload, showAuthModel: true };
};
export const closeAuthModel = (state) => {
  return { ...state, showAuthModel: false };
};
//=============AUTH LOGIC ENDS ===============================

//=============CART LOGIC START ===============================
export const toggleCartModel = (state) => {
  return { ...state, showcart: !state.showcart };
};
export const addToCart = (state, payload) => {
  const cart = { ...state.cart, cartItems: [...state.cart.cartItems, payload] };
  return { ...state, cart };
};
export const removeCartItem = (state, payload) => {
  const newCartItems = state.cart.cartItems.filter(
    (cartItem) => cartItem._id !== payload
  );
  const cart = { ...state.cart, cartItems: newCartItems };
  return { ...state, cart };
};
export const increaseCartItem = (state, payload) => {
  const { itemId, size } = payload;
  const newCartItems = state.cart.cartItems.map((cartItem) => {
    if (cartItem._id === itemId) {
      const variant = cartItem.variants.find(
        (variant) => variant.size === size
      );
      if (variant && variant.quantity < cartItem.stock) {
        variant.quantity += 1;
        cartItem.amount += 1;
      }
    }
    return cartItem;
  });
  const cart = { ...state.cart, cartItems: newCartItems };
  return { ...state, cart };
};

export const decreaseCartItem = (state, payload) => {
  const { itemId, size } = payload;
  const newCartItems = state.cart.cartItems
    .map((cartItem) => {
      if (cartItem._id === itemId) {
        const variant = cartItem.variants.find(
          (variant) => variant.size === size
        );
        if (variant && variant.quantity > 1) {
          variant.quantity -= 1;
          cartItem.amount -= 1;
        } else if (variant && variant.quantity === 1) {
          cartItem.variants = cartItem.variants.filter((v) => v.size !== size);
          cartItem.amount -= 1;
        }
      }
      return cartItem;
    })
    .filter((item) => item.amount > 0);
  const cart = { ...state.cart, cartItems: newCartItems };
  return { ...state, cart };
};
export const clearCart = (state) => {
  console.log("cleared the cart ");
  const cart = { amount: 0, total: 0, cartItems: [] };
  return { ...state, cart };
};

export const getCartTotal = (state) => {
  console.log("getting cart total");

  const { total, amount } = state.cart.cartItems.reduce(
    (cartTotal, cartItem) => {
      const itemTotal = cartItem.variants.reduce(
        (total, variant) => total + variant.quantity * cartItem.price,
        0
      );
      cartTotal.total += itemTotal;
      cartTotal.amount += cartItem.amount;
      return cartTotal;
    },
    { total: 0, amount: 0 }
  );
  const cart = { ...state.cart, total: parseFloat(total.toFixed(2)), amount };
  return { ...state, cart };
};
//=============CART LOGIC ENDS ===============================
