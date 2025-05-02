import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Request() req) {
    return this.chatService.create(createChatDto, req.user);
  }

  @UseGuards(TokenGuard)
  @Post('message')
  createMessage(@Body() createChatDto: CreateMessageDto, @Request() req) {
    return this.chatService.createMessage(createChatDto, req.user);
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get('messages')
  findaAllMessages() {
    return this.chatService.findAllMessages();
  }

  @UseGuards(TokenGuard)
  @Get('my-chats')
  findaMyChats(@Request() req) {
    let user = req.user;
    return this.chatService.findMyChats(user);
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
