export interface CreatePayemnt
{
    tranId: string,
    packageId?:number|null ;
    customerPackageId?: number|null,
    serviceId?: number|null,
    serviceRequestId?: number|null,
    cardBrand: string,
    amount: number,
    paid: boolean,
    maskedPanNumber: string
}

export interface GetPayment
  {
    title :string ,
        tranId: string,
        packageId: number,
        customerPackageId: number,
        serviceId: number,
        serviceRequestId: number,
        cardBrand: string,
        amount: number,
        paid: boolean,
        maskedPanNumber: string,
        id: number,
        creationDate:  Date

}
export interface InitiatePayment
  {
    targetUrl: string,
        id: number,
        payid: string,
        url: string,


}





