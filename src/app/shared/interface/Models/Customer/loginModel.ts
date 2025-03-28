export interface ResponseLogin {
    id: number,
    // mobile: string,
    token: string,
    email: string,
    name: string,
    mobile: string,
    imagePath: string,
    role: string,
    roleId: number,
    fullName: string
    isCompany: string
    companyName: string
    companyNumber: string
  }

  export interface PostLogin {
    mobile:string,
    password :string
  }
