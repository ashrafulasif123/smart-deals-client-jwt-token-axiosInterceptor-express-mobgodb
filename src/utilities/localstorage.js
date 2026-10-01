export const getCartIds = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCartId = (id) => {
  const cartIds = getCartIds();
  cartIds.push(id);
  localStorage.setItem("cart", JSON.stringify(cartIds));
};

export const removeCartId = (id) => {
  const cartIds = getCartIds();
  const cartIdsFilter = cartIds.filter((cartId) => cartId !== id);
  localStorage.setItem("cart", JSON.stringify(cartIdsFilter));
};
