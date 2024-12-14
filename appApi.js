// Application

import { login } from "./redux/actions/userAuthAction";
import axios from "axios";

const apiurl = 'http://192.168.31.145:5000';
// const apiurl = 'https://growfoodapi-1032443967847.asia-south1.run.app'

export const userApi = {

}

export const productApi = {
    subProduct : `${API_URL}/productsFilter/brands?brand=`
}



export const API_URL = apiurl;
export const logo_uri = 'https://i.pinimg.com/736x/5d/90/4b/5d904b9f3b2f1a21c7ef3d19729598a3.jpg'


// -------------Users Api --------------------

export const usersAPi = `${apiurl}/api/users`
export const getUserApi = `${apiurl}/api/users`

export const getDeliveryAddress = `${apiurl}/api/users/getDeliveryAddress`
export const updateUserDetails = `${apiurl}/api/users/updateUser`
export const createAddress = `${apiurl}/api/users/createAddress`
export const getuserAddress = `${apiurl}/api/users/getAddress`
export const getAllUsers = `${apiurl}/api/users/getallusersforadmin`
export const authApi = {
    forgot : `${apiurl}/api/users/forgotPassword`,
    reset : `${apiurl}/api/users/resetPassword`,
    verifyOtp : `${apiurl}/api/users/verifyOtp`,
    login : `${apiurl}/api/users/login`,
    register : `${apiurl}/api/users/register`,
}

 

// -------Orders API --------------------------------
export const OrdersApi = `${apiurl}/api/orders`
export const createOrderAPI = `${apiurl}/api/orders/create`
export const getOrdersByUser = `${apiurl}/api/orders/getOrder`
export const updateOrderbyId = `${apiurl}/api/orders/updateOrder`
export const deleteOrderbyId = `${apiurl}/api/orders/deleteOrder`



// -------------Carts API --------------------------------
export const cartApi = `${apiurl}/api/orders/getCart`
export const createCartApi = `${apiurl}/api/orders/createCart`
export const deleteCartItem = `${apiurl}/api/orders/deleteCart`




// ---------------Products Api ---------------------------
export const productsAPi = `${apiurl}/api/products`
export const getProductbyId = `${apiurl}/api/products/product`
export const createProduct = `${apiurl}/api/products`
export const getProductsApi = `${apiurl}/api/products/getAllProducts`
export const updateProductsApi = `${apiurl}/api/products`
export const deleteProductApi = `${apiurl}/api/products?id=`
export const getBrandsProductApi = `${apiurl}/api/products/productsFilter/brands?brand=`
export const getCategoriesProductApi = `${apiurl}/api/products/categoriesProduct`



// ---------------Brands Api ---------------------------
export const updateBrandbyId = `${apiurl}/api/brands?id=`
export const deleteBrandbyId = `${apiurl}/api/brands?id=`
export const getBrandsApi = `${apiurl}/api/products/brands`
export const createUnit = `${apiurl}/api/unit`
export const getUnitApi = `${apiurl}/api/unit`

export const getProductbySubCategory = `${apiurl}/api/products/subProduct`


export const subCategoryAPI = `/api/subCategory`

//------------Categories------------
export const categoryApi = `${apiurl}/api/products/category`
export const getSubCategoriesApi = `${apiurl}/api/subCategory`
export const createSubCategory = `${apiurl}/api/subCategory`


//vendors Api
export const vendorOrdersApi = `${apiurl}/api/vendors/orders`


// Admin API

export const adminOrders = `${apiurl}/api/admin/orders`




export const getterFunction = async(uri)=>{
    console.log(uri);
    try{
        const res = await axios.get(uri)
    return res.data;
    }catch(err){
        console.error(err);
        throw err;
    }
    
}

export const updaterFunction =async(uri, data)=>{
    try{
        const res = await axios.put(uri, data)
        return res.data;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const DeleteApi = async(uri)=>{
    try{
        const res = await axios.delete(uri)
        return res.data;
    }catch(err){
        console.error(err);
        throw err;
    }
   
}

export const posterFunction = async(uri, formData)=>{
    try{
       const res = await axios.post(uri, formData) 
       return res.data;
    }catch(err){
        console.error(err);
        throw err;
    }
}


