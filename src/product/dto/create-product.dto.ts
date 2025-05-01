import { ApiProperty } from '@nestjs/swagger';
import { ProductXolati } from '@prisma/client';
import {
  IsNumber,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @MinLength(4)
  @MaxLength(30)
  name: string;
  @ApiProperty()
  @MinLength(15)
  @MaxLength(250)
  description: string;
  @ApiProperty()
  @Min(1)
  price: number;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  typeId: string;
  @ApiProperty({ enum: ProductXolati })
  xolati: ProductXolati;
  @ApiProperty()
  colorId: string;
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(9999)
  count: number;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  @Max(100)
  discount: number;
  @ApiProperty()
  @IsUrl()
  image?: string;
  like? : number | undefined | null

}
