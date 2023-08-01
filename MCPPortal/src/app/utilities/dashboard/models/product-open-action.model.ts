export class ProductOpenActionModel {
  id: string;
  jsonBody: ProductJsonBody;
  user: string;
  createdDate: Date;
  isActive: boolean;
  openActionType: OpenActionTypes;

  constructor() {
  }
}

export class ProductJsonBody {
  productId: string;
  productGroupId: string;
  productName: string;
}

export enum OpenActionTypes {
  Assignment,
  AddedProduct
}
