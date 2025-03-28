export interface PostCahngePassword {
    currentPassword: string,
    newPassword: string,
    userId?: number

  }
  export interface ResponseChangePassword
  {
    firstName: string,
    firstNameAr: string,
    middleName: string,
    middleNameAr: string,
    lastName: string,
    lastNameAr: string,
    nationalId: string,
    passportId: string,
    borderNumber: string,
    address: string,
    addressAr: string,
    email: string ,
    gender: number,
    regionId: number,
    cityId: number,
    birthDate: Date,
    id: number,
    customerBirthDate: string,
    cityName: string,
    cityNameAr: string,
    regionName: string,
    regionNameAr: string,
    imagePath: string,
    mobile: string,
    attachments: [
      {
        imageReferenceId: number,
        id: number,
        customerId: number,
        filePath: string,
        creationDate: Date,
        imageReferenceNameAr: string
      }
    ]

  }
  export interface PostResetPassword
  {
    mobile: string,
    newPassword: string
  }
  export interface ResponseResetPassword
  {
    firstNameAr: string,
    middleName: string,
    middleNameAr: string,
    lastName: string,
    lastNameAr: string,
    nationalId: string,
    passportId: string,
    borderNumber: string,
    address: string,
    addressAr: string,
    email: string,
    gender: number,
    regionId: number,
    cityId: number,
    birthDate: Date,
    id: number,
    customerBirthDate: string,
    cityName: string,
    cityNameAr: string,
    regionName: string,
    regionNameAr: string,
    imagePath: string,
    mobile: string,
    attachments:attachment
  }
  export interface attachment {
    imageReferenceId: number,
    id: number,
    customerId: number,
    filePath: string,
    creationDate: Date,
    imageReferenceNameAr: string
  }

