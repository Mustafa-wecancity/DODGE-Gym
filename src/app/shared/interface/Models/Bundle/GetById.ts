export interface GetPackageById{
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
    packageMainTypeTitle: string
    categories :categoriesItems[]

   }


   export  interface categoriesItems
   {
    id: number,
    title: string,
    imagePath: string,
    description: string,
    servicesAvgTime: number,
    parentTitle: string

   }
