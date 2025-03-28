export interface CustomerOrderServiceManagement {
 id: number;
  serviceId: number;
  serviceRequestCount: number;
 
  voiceNoteUrl: string;
  serviceName: string;
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
