import { PagintationModel } from '../PagintationModel'
export interface GetPackageList {
  totalCount: number
  items: dataItems[]
}
export interface dataItems {
  title: string |any,
  discount: number,
  packageMainTypeId: Number,
  id: Number,
  packageId: Number,
  imagePath: string,
  description: string,
  price: Number,
  order: Number,
  inactive: true,
  serviceRequestCount: Number,
  duration: Number,
  priceAfterDiscount: Number,
  discountPercent: Number,
  remainingRequest: Number,
  packageMainTypeTitle: string
}

export interface GetPackageListFilter extends PagintationModel {
  name?: string;
  packageMainTypeTitle?: string;
  categoryTitle?: string;
  packageMainTypeId?: number;
}



export interface PackageMainType {
  id: Number,
  title: string,
  image: string,
  description: string
}
export interface PsotServicesHomePage {
  takeCount: Number,
  categoryId: Number,
  categoryName: string,

}



export interface GetServicesHomePage {
  newestServices:ServicesHomePage[],
  mostViewedServices:ServicesHomePage[],
  mostOrderedServices:ServicesHomePage[],



}

export interface  RelatedServices extends GetServicesHomePage{

  mostRelatedServices:ServicesHomePage[],

}



export interface ServicesHomePage
{
  title: string |any,
  discount: number,
  id: Number,
  order: Number,
  price: Number, //delete
  views: Number,
  imagePath: string,
  creationDate: string,
  isEmergency: boolean,
  description: string

}

export interface PosterviceDetailWebApp{
    categoryId?: number|null,
    categoryName?: string|null,
    productName?: string|null,
    takeCount: number,
    productd?: number

}


export interface Bundle
{
  id: number,
  name: string,
  description:string,
  price: number,
  image: string,
  discount: number,
  priceAfterDiscount: number,
  points: number,
  validityDays: number,

  
}
export interface ServicesHome
{
  id: number,
  productName: string,
  imagePath: string,
  description: string,
  points: number,
  price: number,
  priceAfterDiscount: number
  discountPercent: number
  pointsAfterDiscount: number
  categoryList: ICategoryList[]
 
}

export interface ICategoryList
{
    id:number,
    name :string
}

export interface IRecentNewsHome
{
  id: number,
  title: string,
  description: string,
  image: string,
  date: string,
}

export interface INews

{
  id: number,
  title: string,
  image: string,
  date: string,
  description: string,
  newsCategoryList: INewsCategoryList[]
  newsKeywordsList:INewsKeywordsList[]
}
export interface INewsCategoryList
{
  id: number,
  title: string,
  imagePath: string
}

export interface INewsKeywordsList

  {
    keywordId: number,
    keywordTitle: string,
  }


  export interface INewsKeywordsTag
  {
    keywordId: number,
     title: string,
  }


  
  export interface ICuestomerFeedback
  {
    id: number,
     title: string,
     testimonialText: string,
     customerImage: string,
     customerName: string,
     customerTitle: string,
   
  }


  