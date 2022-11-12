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
import { LocationEntity } from './location/location.entity';
import { Warehouse } from './warehouse';

@Entity({ schema: 'public', name: 'warehouse' })
export class WarehouseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('numeric')
  latitude: number;

  @Column('numeric')
  longitude: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(
    () => LocationEntity,
    (location: LocationEntity) => location.warehouse,
    {
      eager: true,
    },
  )
  @JoinTable({ name: 'location' })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'warehouse_id',
  })
  locations: LocationEntity[];

  fromDomain?(warehouse: Warehouse) {
    if (warehouse.id) this.id = warehouse.id;
    this.name = warehouse.name;
    this.latitude = warehouse.latitude;
    this.longitude = warehouse.longitude;
  }
}
