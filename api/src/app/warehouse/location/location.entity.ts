import { PackageEntity } from '../../package/package.entity';
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
import { WarehouseEntity } from '../warehouse.entity';
import { Location } from './location';

@Entity({ schema: 'public', name: 'location' })
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  warehouse_id: string;

  @Column({ length: 50 })
  floor?: string;

  @Column({ length: 50 })
  hall?: string;

  @Column({ length: 15 })
  shelf: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(
    () => WarehouseEntity,
    (warehouse: WarehouseEntity) => warehouse.locations,
  )
  @JoinTable({ name: 'warehouse' })
  @JoinColumn({
    name: 'warehouse_id',
    referencedColumnName: 'id',
  })
  warehouse?: WarehouseEntity;

  @OneToOne(() => PackageEntity, (pakage: PackageEntity) => pakage.location, {
    eager: true,
  })
  @JoinTable({ name: 'package' })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'location_id',
  })
  package?: PackageEntity;

  fromDomain?(location: Location) {
    if (location.id) this.id = location.id;
    this.warehouse_id = location.warehouse_id;
    this.floor = location.floor;
    this.hall = location.hall;
    this.shelf = location.shelf;
  }

  isAvailable?(): boolean {
    return this.package === null;
  }
}
