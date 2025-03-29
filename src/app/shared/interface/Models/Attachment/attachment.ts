export interface CustomerOrderServiceManagement {
 id: number;
  productd: number;
  serviceRequestCount: number;
 
  voiceNoteUrl: string;
  productName: string;
  serviceRequestCode: string;
  description: string;
  statusName: string;
  attachment: boolean;
  status: boolean;
  isNew: boolean;
  days: string;
  // serviceAttachmentsList: IServiceAttachmentsList[];
}
export interface IServiceAttachmentsList {
  serviceAttachmentId: number;
  serviceAttachmentTitle: string;
  isExist: boolean;

}







///CustomerAttachment
export interface ICustomerAttachment {
  id: number;
  customerId: number;
  filePath: string;
  name: string;
  description: string;
  attachmentId: number;
  attachmentText: string;
  creationDate: string;
  providerName: string;
  byProvider: boolean;
}
