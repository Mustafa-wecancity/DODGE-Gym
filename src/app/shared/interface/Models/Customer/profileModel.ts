 
export interface attachment {
  imageReferenceId: number,
  id: number,
  customerId: number,
  filePath: string,
  creationDate: Date,
  imageReferenceNameAr: string
}






export interface IGetProfileLocalized {
  fullName: string,

  address: string,
  email: string,
  genderId : number,
  birthDate: Date,
  id: number,
  customerBirthDate: string,
  image: string,
  mobile: string,




}
export interface ICustomerDashboardStatus {
  points: number,
  walletPoints: number,

 
  }
