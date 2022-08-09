import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from '../typeorm/message';
import { MessagesService } from './messages.service';

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
    ): Promise<Message> {
        return await this.messagesService.create(createMessageDto);
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