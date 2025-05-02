import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  productId: string;
  userId: string;
  @ApiProperty()
  @Min(1)
  @Max(9999)
  @IsNumber()
  count: number;
  @ApiProperty()
  @IsString()
  colorId: string;
}
