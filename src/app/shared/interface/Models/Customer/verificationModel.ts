
export interface PostVefiryUser
{
    otp: number,
    email: string
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
    email: string
}
export interface PostSendOTP
{
    email: string

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
