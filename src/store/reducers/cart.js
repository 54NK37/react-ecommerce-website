const initialState = {
    cart: {},
    purchasing: false,
    redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login',
    dbCart : []

}

const reducer = (state = initialState, action) => {
    const cart = state.cart
    switch (action.type) {
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

        case ('CHANGE_REDIRECT'):
            return {
                ...state,
                cart: { ...cart },
                purchasing: Object.keys(state.cart).length === 0 ? false : true,
                redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login'

            }

        case('UPDATE_DBCART'):
        return {
            ...state,
                cart: { ...cart },
                purchasing: Object.keys(state.cart).length === 0 ? false : true,
                redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login',
                dbCart : action.cart

        }

        case('RESET_CART'):
        return {
            cart : {},
            purchasing : false,
            redirect: localStorage.getItem('token') !== null ? '/checkout' : '/login',
            dbCart : []
        }

        default: return state

    }
}
export default reducer