import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from '../typeorm/message';
import { MessagesService } from './messages.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/typeorm';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Get()
    async findAll(): Promise<Message[]> {
        return await this.messagesService.findAll();
    };

    // ParseUUIDPipe: idがuuid形式でリクエストされているかのバリデーション
    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Message> {
        return await this.messagesService.findById(id);
    };

    @Post()
    async create(
        @Body() createMessageDto: CreateMessageDto,
        @GetUser() user: User,
    ): Promise<Message> {
        return await this.messagesService.create(createMessageDto, user);
    };

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('postText') postText: string,
    ): Promise<Message> {
        return await this.messagesService.update(id, postText);
    };

    @Delete(':id')
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<string> {
        return this.messagesService.delete(id);
    };
}