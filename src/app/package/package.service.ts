import { Injectable } from '@nestjs/common';
import { PackageDTO } from './dto/package.dto';
import { PackageEntity } from './package.entity';

@Injectable()
export class PackageService {
  async createPackage(dto: PackageDTO): Promise<PackageEntity> {
    return null;
  }
}
