import { seokeywords } from "../Category/CategoryModel";
import { PagintationModel } from "../PagintationModel";

export interface GetServiceByCategoryId
{
    title: string|any,
    description: string,
    order: number,
    price: number,
    onlineUrl: string,
    adImage: string,
    id: number,
    imagePath: string,
    seokeywords?:seokeywords[]
}

export interface GetCategoryLogo {
  headerBackgroundPath: string,
  footerBackgroundPath: string,
  sideImagePath: string,
  logo: string,
  primaryColor: string,
  secondaryColor: string
  title: string
  titleAr: string

}
export interface GetServiceList {
  totalCount: number
  items: GetServiceByCategoryId[]
}


export interface GetByCategoryIdListFilter extends PagintationModel {

  categoryId?: number;
  categoryTitle?: string;
}
