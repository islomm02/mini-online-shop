import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
  userId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  star: number;
  @ApiProperty()
  comment: string;
}
