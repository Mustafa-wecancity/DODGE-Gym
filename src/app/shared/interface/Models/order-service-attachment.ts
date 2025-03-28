 
export interface OrderServiceAttachment {
    id: number;
    customerServiceRequestId: number;
    attachmentTypeId: number;
    attachmentTypeTitle: string;
    attachmentDescription: string;
    attachmentText: string;
    attachmentFilePath: string;
    creationDate: string;
    providerName: string;
    createdByProvider: boolean;
  }
  