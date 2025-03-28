export interface ReqByCustServHistory
{
    id: number,
    serviceTitle: string| any,
    categoryTitle: string,
    serviceDescription: string,
    packageName: string,
    serviceRequestTime: string,
    serviceOnlineUrl: string,
    serial: string,
    reasonId: number,
    reasonMessage: string,
    reasonHasRemoved: boolean,
    imagePath: string,
    resultUrl: string,
    status: number,
    serviceRequestTypeName: string,
    price: number,
    orderType: string,
    creationDate: string,
    date: string

}
