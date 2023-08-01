import {AdditionalDeliveryMethod} from '../interfaces/additional-delivery-method.interface';

export class AdditionalDeliveryMethodGroup {
  data = {
    deliveryMethod: '',
    comments: '',
  } as AdditionalDeliveryMethod;
  isValid = false;
}
