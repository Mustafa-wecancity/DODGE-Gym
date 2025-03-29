export interface GetServiceRequest {
  id: number;
  discountPercent: number;
  qty: number;
  status: boolean;
  statusPayment: string;
  description: string;
  imagePath: string;
  productName: string;
  days: string;
  statusName: string;
  creationDate: string;
  serviceRequestId: number;
  productd: number;
  latestMessage: string;
  latestMessageDate: string;
  attachments: boolean;
  serviceRequestCode: string;
  isNew: boolean;
  isEditingQty: boolean;
  beforeQty: number;
  statusId: number;
  
}

export interface CustomerOrderServiceRequest {
  orderId: number;
  status: string;
  name: string;
  serial: string;
  comment: string;
  creationDate: string;
  qty: number;
  date: string;
  voiceNoteUrl: string;
  savingPackageTitle: string;
  serviceRequestList: GetServiceRequest[];
}

export interface ITopBarContent {
  id: number;
  order: number;
  title: string;
  navigationUrl: string;
}

export enum StatusEnum {
  New = 1,
  InProgress = 2,
  Hold = 3,
  Closed = 4,
  Cancelled = 5,
}
