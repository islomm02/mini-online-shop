import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTypeDto {
  @ApiProperty()
  @MinLength(3)
  @IsString()
  name: string;
}
