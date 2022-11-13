import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package';
import { PackageEntity } from './package.entity';

@Injectable()
export class PackageRepository {
  constructor(
    @InjectRepository(PackageEntity)
    private repository: Repository<PackageEntity>,
  ) {}

  async save(domain: Package): Promise<PackageEntity> {
    const model = this.repository.create();
    model.fromDomain(domain);
    return await this.repository.save(model);
  }

  async get(id: string): Promise<PackageEntity> {
    return this.repository.findOne({
      relations: ['location'],
      where: { id },
    });
  }
}
