import { EStatusPackage } from './status.enum';

export class Package {
  id?: string;
  shipment_id?: string;
  status_id: EStatusPackage;
  latitude: number;
  longitude: number;
}
