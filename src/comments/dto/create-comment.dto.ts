import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  star: number;
  @ApiProperty()
  comment: string;
}
