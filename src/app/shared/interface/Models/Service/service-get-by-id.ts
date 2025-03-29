
export interface IServiceGetById {
 id: number,
 categoryId: number,
 imagePath: string
 name: string
 parentCategoryName: string,
 serviceRequirement: string,
 description: string,
 
 priceAfter: number,
 inwishList: boolean,
 price: number,
 priceBefore: number,
 discountPercent: number,
 serviceCategories: IServiceCategories[]
 serviceMediaList: IServiceMediaList[]
 
}


export interface IServiceMediaList {
    id: number;
    productd: number;
    imagePath: string ; // Nullable field
    url: string;
  }
export interface IServiceCategories
{
    categoryId:number,
    categoryTitle :string
}


export interface IServiceAttachmentsList{
    serviceAttachmentId: number,
    serviceAttachmentTitle: string,

}
export interface categoriesForService{
 id: number,
 title: string,
 imagePath:string,

}

export interface groupsForService{
 id: number,
 title: string,


}
