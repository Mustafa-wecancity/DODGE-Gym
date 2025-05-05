//cart
//

export interface IUpdateCustomercart {
  comment: string;
  voiceNote: string;
  executionDate: string;
  couponId: number;



}
export interface IHedaerCart  {
  id: number;
  customerId: number;
  deductedPoints: number;
  pointsAfterWallet: number;
  subTotal: number;
  couponDiscount: number;
  taxPercent: number;
  taxValue: number;
  totalAfterWallet: number;
  total: number;
  customerWalletPoints: number;
  customerWalletBalance: number;
  couponCode: string;
}
export interface IGetCartServiceByPriceList {
  id: number;
  customersCartId: number;
  serviceId: number;
  orderId: number;
  qty: number;
  price: number;
  imagePath: string;
  name: string;
  categoryName: string;
  discountValue: number;
  // priceAfterDiscount: number;
  points: number;

  totalPoints: number;

  itemPrice: number,
  totalPrice: number,
  itemPriceAfterDiscount: number,
  totalPriceAfterDiscount: number,
  amountSaved: number,
  totalamountSaved: number,
  executionDate: string
}
export interface IGetCartServiceByPoints {
  id: number;
 
  name: string;
  description: string;
  qty: number;
  points: number;
  totalPoints: number;
  serviceId: number;
  customersCartId: number;
  categoryName: string;
  priceAfterDiscount: number;
  totalPriceAfterDiscount: number;


}
export interface IGetCartOrderBundleDetail {
  id: number;
 
  bundleId: number;
  name: string;
  qty: number;
  discountValue: number;
  priceAfterDiscount: number;
   customersCartId: number;
  validityDays: string;
  description: string;

  
  bundleEarnedPoints: number;
  itemPrice: number;
  totalPrice: number;
  itemPriceAfterDiscount: number;
  totalPriceAfterDiscount: number;
  amountSaved: number;
  totalamountSaved: number;
}

export interface IGetCartSavingPackageDetail {
  id: number;
  savingPackageId: number;
  customersCartId: number;
  orderId: number;
  qty: number;
  description: string;
  name: string;

  serviceCount: number;
  itemPrice: number;
  totalPrice: number;
  itemPriceAfterDiscount: number;
  totalPriceAfterDiscount: number;
  amountSaved: number;
  totalamountSaved: number;
  discountValue: number;
}

export interface ICustomerCart extends IHedaerCart , IUpdateCustomercart {
  bundleList:IGetCartOrderBundleDetail[],
  savingPackageList:IGetCartSavingPackageDetail[],
  serviceByPointList:IGetCartServiceByPoints[],
  productByPriceList:IGetCartServiceByPriceList[],
}



export interface ICustomerCartUpdate  {
  customerCartItems:IGetCartOrderBundleDetail |IGetCartSavingPackageDetail|IGetCartServiceByPoints|IGetCartServiceByPriceList,
  customerCartTotal:IHedaerCart,

}


 