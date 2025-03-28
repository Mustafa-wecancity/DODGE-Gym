import { ICategoryList } from "../Bundle/PaginationModel";

export interface IGetCategory {
  title: string;
  imagePath: string;
  id: number;
  productCount: number;
  
  // description: string,
  // servicesAvgTime: number,
  // parentId: number|null,
  // order: number |null,
}
export interface ISubCategoryList extends IGetCategoryWithSubCategory {
  title: string;
  imagePath: string;
  id: number;
  newsCount: number;
  serviceCount: number;

}

export interface IGetCategoryWithSubCategory extends IGetCategory {
  newsCount: number;
  serviceCount: number;
  
  subCategoryList: ISubCategoryList[];
 
  // order: number |null,
}

export interface ICategorySlider {
  categoryId: string;
  id: number;
  image: string;
  url: string;
}

export interface ISeoGetCategory {
  order: number | null;
  id: number;
  parentTitle: string | null;
  creationDate: Date;
  imagePath: string;
  title: any;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  seokeywords: seokeywords[];
}

export interface seokeywords {
  categoryId: number;
  id: number;
  serviceId: number;
  title: string;
}

export interface IParentCategoryAndServices {
  mainCategoryId?: number;
  mainCategoryName: string;
  minCategoryDescriptione: string;
  productList: {
    items?: IProductesList[];
    totalCount?: number;
  };
}


export interface ICategoryAndServices {
 title: string;
 description: string;
 imagePath: string;
 id: number;

 
}


export interface IProductesList {
  productId: number;
  productTitle: string;
  price: number;
  points: number;
  imagePath: string;
  description: string;
  discountPercent: number
  pointsAfterDiscount: number
  // categoryList: ICategoryList[]

}


export interface ISlider {
  fromPrice: number;
  toPrice: number;
  fromPoint: number;
  toPoint: number;
 
}
