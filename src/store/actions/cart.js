
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