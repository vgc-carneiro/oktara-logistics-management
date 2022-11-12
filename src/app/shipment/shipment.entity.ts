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

@Entity({ schema: 'public', name: 'shipment' })
export class ShipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  start_route?: Date;

  @Column('date')
  estimated_route?: Date;

  @Column('date')
  finished_route?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => PackageEntity, (pakage: PackageEntity) => pakage.shipment, {
    eager: true,
  })
  @JoinTable({ name: 'package' })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'shipment_id',
  })
  packages: PackageEntity[];
}
