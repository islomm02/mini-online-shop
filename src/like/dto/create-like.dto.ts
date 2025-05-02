import { ApiProperty } from "@nestjs/swagger"

export class CreateLikeDto {
  userId: string;
  @ApiProperty()
  productId: string;
}


export class LikeIdDto {
  @ApiProperty()
  userId: string;
}