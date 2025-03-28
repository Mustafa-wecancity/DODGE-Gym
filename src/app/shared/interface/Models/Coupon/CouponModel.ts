export interface CheckCouponResult
{
    id:number,
    validCoupon:boolean;
    packagePrice :number;
    createdBy :number;
    creationDate :Date;
    // createdByName :string;
    inactive :boolean;
    title :string;
    code :string;
    discount :number;
    endDate :Date;
}
export interface CheckCouponInPackage
{
    couponCode:string,
    packageId:number|string
}
