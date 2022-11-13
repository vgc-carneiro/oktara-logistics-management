import {
  IsDate,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ShipmentDTO {
  @IsOptional()
  @IsDate()
  @ApiProperty({
    type: 'date',
    format: 'ISO 8601',
    example: '2020-07-10 15:00:00.000',
  })
  startRoute: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    type: 'date',
    format: 'ISO 8601',
    example: '2020-07-10 15:00:00.000',
  })
  estimatedRoute: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    type: 'date',
    format: 'ISO 8601',
    example: '2020-07-10 15:00:00.000',
  })
  finishedRoute: Date;
}
