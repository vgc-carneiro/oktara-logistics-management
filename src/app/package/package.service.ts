import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const pakage = await this.repository.get(id);
    if (!pakage) throw new NotFoundException('No package were found.');
    return pakage;
  }
}
