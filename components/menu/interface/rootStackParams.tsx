export type RootStackParamList = {
  ProductsList: { products: any[] }; 
  ProductDetails: { product: any }; 
  homeProductDetails : {product: any}
  ProfileSection: undefined;  
  SignIn: any; 
  Checkout: { products: any; quantity: number };
  homeCheckout : {product: any; quantity: number};  
  FilterView: { filterProducts: any[] }
  Home : { products: any[] };
  NewProduct : any; //
};
