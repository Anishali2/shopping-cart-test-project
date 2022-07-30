export function addUser(user) {
    return {
      type: 'LOGIN_USER',
      payload:user,
    }
  }

export function removeUser(id) {
    return {
      type: 'LOGOUT_USER',
      id
    }
  }

  export function setCart(carts) {
    return {
      type: 'SET_CART',
      payload:carts
    }
  }