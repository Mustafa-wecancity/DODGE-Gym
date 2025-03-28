
export interface PostVefiryUser
{
    otp: number,
    mobile: string
}
export interface GetVefiryUser
{
    id: number,
    mobile: string,
    token: string,
    name: string,
    image: string,
    profileStatusId: number
}
export interface PostVerifyOTP
{
    otp: string,
    mobile: string
}
export interface PostSendOTP
{
    mobile: string

}export interface GetSendOTP{
    otp: number,
    secondsCount: number
}

export class action {
  sendOTP: boolean = true;
  vberifyOTP: boolean = false;
  forgetPassword: boolean = false;

 }
export interface EmptyResponse
{

}
