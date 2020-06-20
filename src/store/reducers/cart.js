const initialState = {
    cart: {},
    purchasing: false,
    redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login',
    dbCart: []

}

const reducer = (state = initialState, action) => {
    const cart = state.cart
    switch (action.type) {
        // add product to cart and update total price.Set purchasing true
        case ('ADD_PRODUCT'):
            if (state.cart[action.productName] === undefined) {
                cart[action.productName] = 1
                cart[action.productName + "Price"] = action.price
                return {
                    ...state,
                    cart: { ...cart },
                    purchasing: Object.keys(state.cart).length === 0 ? false : true
                }
            }
            else {
                cart[action.productName] = state.cart[action.productName] + 1
                return {
                    ...state,
                    cart: { ...cart },
                    purchasing: Object.keys(state.cart).length === 0 ? false : true

                }
            }

        // remove product to cart and update total price.
        case ('REMOVE_PRODUCT'):
            if (state.cart[action.productName] === undefined || state.cart[action.productName] === 0) {

                return {
                    ...state,
                    cart: { ...cart },
                    purchasing: Object.keys(state.cart).length === 0 ? false : true
                }
            }
            else {
                cart[action.productName] = state.cart[action.productName] - 1
                if (cart[action.productName] === 0) {
                    delete cart[action.productName]
                    delete cart[action.productName + "Price"]
                }
                return {
                    ...state,
                    cart: { ...cart },
                    purchasing: Object.keys(state.cart).length === 0 ? false : true


                }
            }

        // redirect path on cart page to proceed
        //if not logged in then redirect to /login
        //if logged in then redirect to /checkout
        case ('CHANGE_REDIRECT'):
            return {
                ...state,
                cart: { ...cart },
                purchasing: Object.keys(state.cart).length === 0 ? false : true,
                redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login'

            }

        //current cart is select by user
        //but if no current cart (purchasing from state =false),I am loading previous unordered cart from db
        case ('UPDATE_DBCART'):
            return {
                ...state,
                cart: { ...cart },
                purchasing: Object.keys(state.cart).length === 0 ? false : true,
                redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login',
                dbCart: action.cart

            }

        case ('RESET_CART'):
            return {
                cart: {},
                purchasing: false,
                redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login',
                dbCart: []
            }

        default: return state

    }
}
export default reducer