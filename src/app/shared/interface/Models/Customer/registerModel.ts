export interface ResponseRegister {
    otp:number,
    secondsCount :number
}

export interface PostRegister {
    mobile:string,
    passwordHash :string
}


export interface SendOTP {
    mobile :string,
 
}
