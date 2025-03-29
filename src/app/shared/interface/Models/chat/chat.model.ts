 



export interface ISendMessages {
  sender?: string
  time?: string
  text?: string
}

export interface IMessage {
  sentBy?: string;
  filePath?:any;
  fileTypeId?:number 
  orderproductd?: number
  customerImage: string;
  senderUserImagePath?: string;
  creationDate?: Date;
  sendByCustomer?: boolean;
  sendByProvider?: boolean;
  comment: string;
}
