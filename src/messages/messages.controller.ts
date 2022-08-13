import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from '../typeorm/message';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/typeorm';

// UseInterceptors： intercepter系メソッド(Excludeなど)を使用できる
@Controller('messages')
@UseInterceptors(ClassSerializerInterceptor)
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
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createMessageDto: CreateMessageDto,
        @GetUser() user: User,
    ): Promise<Message> {
        return await this.messagesService.create(createMessageDto, user);
    };

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('postText') postText: string,
    ): Promise<Message> {
        return await this.messagesService.update(id, postText);
    };

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: User,
    ): Promise<string> {
        return this.messagesService.delete(id, user);
    };
}