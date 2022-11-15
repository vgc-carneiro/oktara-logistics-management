import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageEntity } from '../package/package.entity';
import { Shipment } from './shipment';

@Entity({ schema: 'public', name: 'shipment' })
export class ShipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  start_route?: Date;

  @Column('timestamp')
  estimated_route?: Date;

  @Column('timestamp')
  finished_route?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => PackageEntity, (pakage: PackageEntity) => pakage.shipment, {
    cascade: true,
  })
  @JoinTable({ name: 'package' })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'shipment_id',
  })
  packages: PackageEntity[];

  fromDomain?(domain: Shipment) {
    if (domain.id) this.id = domain.id;
    if (domain.start_route) this.start_route = domain.start_route;
    if (domain.estimated_route) this.estimated_route = domain.estimated_route;
    if (domain.finished_route) this.finished_route = domain.finished_route;
  }

  isAvailableToPackages(): boolean {
    return this.start_route === null;
  }
}
