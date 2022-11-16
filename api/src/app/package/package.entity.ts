import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShipmentEntity } from '../shipment/shipment.entity';
import { LocationEntity } from '../warehouse/location/location.entity';
import { Package } from './package';
import { EStatusPackage } from './status.enum';

@Entity({ schema: 'public', name: 'package' })
export class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  shipment_id?: string;

  @Column('uuid')
  location_id?: string;

  @Column('integer')
  status_id: number;

  @Column('numeric')
  latitude_destination: number;

  @Column('numeric')
  longitude_destination: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  distance?: number;

  @ManyToOne(
    () => ShipmentEntity,
    (shipment: ShipmentEntity) => shipment.packages,
  )
  @JoinTable({ name: 'shipment' })
  @JoinColumn({
    name: 'shipment_id',
    referencedColumnName: 'id',
  })
  shipment?: ShipmentEntity;

  @OneToOne(
    () => LocationEntity,
    (location: LocationEntity) => location.package,
  )
  @JoinTable({ name: 'location' })
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
  })
  location?: LocationEntity;

  fromDomain?(domain: Package) {
    if (domain.id) this.id = domain.id;
    if (domain.shipment_id) this.shipment_id = domain.shipment_id;
    if (domain.location_id) this.location_id = domain.location_id;
    this.status_id = domain.status_id;
    this.latitude_destination = domain.latitude;
    this.longitude_destination = domain.longitude;
  }

  isPossibleAssignLocation?() {
    return this.status_id === EStatusPackage.WAREHOUSE;
  }
}
