import { BadRequestException, Injectable } from '@nestjs/common';
import { PackageDTO } from './dto/package.dto';
import { Package } from './package';
import { PackageEntity } from './package.entity';
import { PackageRepository } from './package.repository';

@Injectable()
export class PackageService {
  constructor(private readonly repository: PackageRepository) {}
  async createPackage(dto: PackageDTO): Promise<PackageEntity> {
    const packageDomain = new Package(dto);
    try {
      return this.repository.save(packageDomain);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get(id: string): Promise<PackageEntity> {
    return null;
  }
}
