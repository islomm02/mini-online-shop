import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateViewDto {
  @ApiProperty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsString()
  productId: string;
}
