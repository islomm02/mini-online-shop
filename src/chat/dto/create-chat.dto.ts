import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
    fromId: string
    @ApiProperty()
    toId: string
}

export class CreateMessageDto {
    fromId: string
    @ApiProperty()
    toId: string
    @ApiProperty()
    chatId: string
    @ApiProperty()
    message: string
}
