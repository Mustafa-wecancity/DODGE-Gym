export interface GetServiceRequest {
  id: number;
  discountPercent: number;
  serviceRequestCount: number;
  qty: number;
  status: boolean;
  statusPayment: string;
  name: string;
  categoryName: string;
  description: string;
  serviceRequestDate: string;
  orderServiceId: number;
  latestMessage: string;
  latestMessageDate: string;
  statusReason: string;
  statusComment: string;
  resultUrl: string;
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
  productRequestList: GetServiceRequest[];
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
