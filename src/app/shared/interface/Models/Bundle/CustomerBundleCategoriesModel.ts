export interface GetByIdCustomerPackageCategories
{
  title: string,
  discount: number,
  packageMainTypeId: number,
  id: number,
  imagePath: string,
  includedInCustomerPackages: boolean,
  description: string,
  price: number,
  order: number,
  serviceRequestCount: number,
  duration: number,
  remainingRequest: number,
  visable: boolean,
  inactive: boolean,
  priceAfterDiscount: number,
  discountPercent: number,
  packageMainTypeTitle: string,
  categories:CatItemsForCustPkg[]

}
export interface CatItemsForCustPkg
{
  id: number,
  title: string,
  imagePath: string,
  description: string,
  servicesAvgTime: number,
  parentTitle: string
}



export interface  IBundleForCustomer
{
  customerBundleId: number,
  bundleId: number,
  bundleName: string,
  imagePath: string,
  description: string,
  quantity: number,
  points: number,
  remainingPoints: number,
  purchasedDate: string
  expirationDate: string
  remainingDays: number,
  validityDays: number,
  price: string,
  status: string,
  bundleStatus: string,
  isExpired: boolean
  inactive: boolean
}
 
export interface GetCustomerBundlePurchasesDto {
  customerBundleId: number;
  bundleName: string;
  serial: string;
  bundleId: number;
  quantity: number;
  purchasedDate: Date;
  price: number;
  priceAfterDiscount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  discountPercent: number;
  tax: number;
  status: string;
}

export interface  IGetCustomerOrderServiceDetail
{
  id: number,
   serviceId: number,
    orderId: number,
    qty: number,
   price: number,
   name: string

}
export interface  IGetCustomerOrderBundleDetail
{
  id: number,
  bundleId: number,
    orderId: number,
    price: number,
    bundleEarnedPoints: number,
    bundleExpirationDate: string,
   name: string

}
export interface  IGetCustomerOrderSavingPackageDetail
{
  id: number,
  savingPackageId: number,
    orderId: number,
    qty: number,
   price: number,
   name: string

}



export enum Role {
  All = '',
  Active = 1,
  Expired = 2,
}

export interface Status {
  status: Role;
  title: string;
}
