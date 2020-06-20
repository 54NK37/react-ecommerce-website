
export const addProduct = (productName,price)=>{
    console.log("add")
    return{
        type  : 'ADD_PRODUCT',
        productName,
        price
    }
}

export const removeProduct = (productName,price)=>{
    console.log("remove")
    return{
        type  : 'REMOVE_PRODUCT',
        productName,
        price

    }
}


export const changeRedirect = ()=>{
    return {
        type : 'CHANGE_REDIRECT'
    }
}

export const updateDbCart =(dbCart)=>{
    return {
        type : 'UPDATE_DBCART',
        cart : dbCart
    }
} 

export const resetCart = ()=>{
    return { 
        type : 'RESET_CART'
    }
}