 
 

 
export interface IProductList
{
    id: number,
    name: string ,
description: string,
price: number,
points: number,
discountPercent: number
priceAfterDiscount: number
 
}

 
export interface IGetBundleList
{
    id: number,
    name: string ,
    imagePath?: string,
description: string,
price: number,
bundleId: number,
order: number,
points: number,
discount: number,
remainingRequest: number,
discountPercent: number,
priceAfterDiscount: number,
validityDays: number,
}

export interface BundleData {
    bundleId: number;
    price: number;
    quantity: number;
    discountValue: number;
    couponDiscount: number;
    taxValue: number;
    bundleBalance: number;
    bundleEarnedPoints: number;
    subTotal: number;
  }
  

  export interface BundleCalculator  {
    quantity: number;

    coupon: string | null; // Nullable field, could be a string or null
    bundleId: number;
  }

  export interface productdCalculator  {
    qty: number;
    couponCode: string | null; // Nullable field, could be a string or null
    productd: number;
  }
export interface IBundleGetById extends IGetBundleList
{

includedInCustomerBundles:boolean
}
 


export interface ServiceData {
    productd: number;
    quantity: number;
    points: number;
    discountValue: number;
    couponDiscount: number;
    serviceBalance: number;
    serviceEarnedPoints: number;
    subTotal: number;
  }
  