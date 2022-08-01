export function addUser(user) {
    return {
      type: 'LOGIN_USER',
      payload:user,
    }
  }


  export function setCart(carts) {
    return {
      type: 'SET_CART',
      payload:carts
    }
  }