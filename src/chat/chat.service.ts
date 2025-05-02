import { Injectable } from '@nestjs/common';
import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateChatDto, user) {
    try {
      let chat = await this.prisma.chat.create({
        data: { ...data, fromId: user.id },
      });
      return chat;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  async createMessage(data: CreateMessageDto, user) {
    try {
      let msg = await this.prisma.messages.create({
        data: { ...data, fromId: user.id },
      });
      return msg;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      let chats = await this.prisma.chat.findMany();
      return chats;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  async findAllMessages(chatId) {
    try {
      let messages = await this.prisma.messages.findMany({ where: { chatId } });
      return messages;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  async findMyChats(user) {
    let chats = await this.prisma.chat.findMany({
      where: {
        OR: [{ fromId: user.id }, { toId: user.id }],
      },
    });
    return `This action returns all chat`;
  }

  async findOne(id: string) {
    let chat = await this.prisma.chat.findFirst({ where: { id } });
    return chat;
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.chat.delete({ where: { id } });
      return deleted;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }
}
