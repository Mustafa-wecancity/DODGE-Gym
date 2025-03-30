//cart
//

export interface IUpdateCustomerOrderDetails {
  comment: string;
  voiceNote: string;
  executionDate: string;
  couponId: number;



}
export interface IHedaerOrderDetails  {
  id: number;
  customerId: number;
  deductedPoints: number;
  subTotal: number;
  couponDiscount: number;
  taxPercent: number;
  taxValue: number;
  total: number;
  couponCode: string;
}
export interface IGetOrderDetailsServiceByPriceList {
  id: number;
  customersCartId: number;
  serviceId: number;
  orderId: number;
  qty: number;
  price: number;
  name: string;
  categoryName: string;
  serviceStatus: string;
  discountValue: number;
  // priceAfterDiscount: number;
  points: number;


  itemPrice: number,
  totalPrice: number,
  itemPriceAfterDiscount: number,
  totalPriceAfterDiscount: number,
  amountSaved: number,
  totalamountSaved: number,
  executionDate: string
  inactive: boolean
  parentCategoryStatus: boolean
  categoryStatus: boolean

}
export interface IGetOrderDetailsServiceByPoints {
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
  serviceStatus: string;
  inactive: boolean
  parentCategoryStatus: boolean
  categoryStatus: boolean


}
export interface IGetOrderBundleDetail {

  bundleId: number;
  name: string;
  qty: number;
  discountValue: number;
  priceAfterDiscount: number;
   customersCartId: number;
  validityDays: string;
  description: string;

  bundleStatus: string;
  
  bundleEarnedPoints: number;
  itemPrice: number;
  totalPrice: number;
  itemPriceAfterDiscount: number;
  totalPriceAfterDiscount: number;
  amountSaved: number;
  totalamountSaved: number;
  inactive: boolean

 
}

export interface IGetOrderDetailsSavingPackageDetail {

  orderId: number;
  id: number;
  savingPackageId: number;
  serviceCount: number;
  itemPrice: number;
  totalPrice: number;
  qty: number;
  description: string;
  name: string;
  savingPackageStatus: string;
  itemPriceAfterDiscount: number;
  totalPriceAfterDiscount: number;
  amountSaved: number;
  totalamountSaved: number;
  discountValue: number;
  inactive: boolean


}

export interface ICustomerOrderDetails extends IHedaerOrderDetails , IUpdateCustomerOrderDetails {
  bundleList:IGetOrderBundleDetail[],
  savingPackageList:IGetOrderDetailsSavingPackageDetail[],
  serviceByPointList:IGetOrderDetailsServiceByPoints[],
  serviceByPriceList:IGetOrderDetailsServiceByPriceList[],
}



 

 