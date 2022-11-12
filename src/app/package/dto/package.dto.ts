import { IsDefined, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PackageDTO {
  @IsDefined()
  @IsNumber()
  @ApiProperty({
    type: 'numeric',
    format: 'Latitude',
    example: '-23.315089',
  })
  latitudeDestination: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({
    type: 'numeric',
    format: 'Longitude',
    example: '-51.175864',
  })
  longitudeDestination: number;
}
