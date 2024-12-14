// const apiurl = 'http://192.168.31.145:5000'
const apiurl = 'https://growfoodapi.onrender.com'





export const getUserApi = `${apiurl}/api/users`
// export const createOrderAPI = `${apiurl}/api/orders/create`
export const createCartbyUser = `${apiurl}/api/orders/createCart`
export const getCartbyUser = `${apiurl}/api/orders/getCart`
export const getProductbyId = `${apiurl}/api/products/product`
export const getOrdersByUser = `${apiurl}/api/orders/getOrder`
export const getDeliveryAddress = `${apiurl}/api/users/getDeliveryAddress`
export const updateOrderbyId = `${apiurl}/api/orders/updateOrder`
export const deleteCartItem = `${apiurl}/api/orders/deleteCart`
export const updateUserDetails = `${apiurl}/api/users/updateUser`
export const OrdersApi = `${apiurl}/api/orders`
export const productsAPi = `${apiurl}/api/products`
export const usersAPi = `${apiurl}/api/users`
export const deleteOrderbyId = `${apiurl}/api/orders/deleteOrder`

export const gfApi = {
    image : 'https://cdn-icons-png.flaticon.com/256/1174/1174008.png'
}


export const getProductbySubCategory = `${apiurl}/api/products/subProduct`