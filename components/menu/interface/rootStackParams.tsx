export type RootStackParamList = {
  ProductsList: { products: any[] }; 
  ProductDetails: { product: any }; 
  ProfileSection: undefined;  
  SignIn: any; 
  Checkout: { product: any; quantity: number }; 
  FilterView: { filterProducts: any[] }
  Home : { products: any[] };
  NewProduct : any; //
};
