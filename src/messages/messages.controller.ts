import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from './message.model';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Get()
    findAll(): Message[] {
        return this.messagesService.findAll();
    }

    // ParseUUIDPipe: idがuuid形式でリクエストされているかのバリデーション
    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string): Message {
        return this.messagesService.findById(id);
    }

    @Post()
    create(
        @Body() createMessageDto: CreateMessageDto,
    ): Message {
        return this.messagesService.create(createMessageDto);
    };

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('postText') postText: string,
    ): Message {
        return this.messagesService.update(id, postText);
    }

    @Delete(':id')
    delete(
        @Param('id', ParseUUIDPipe) id: string,
    ): string {
        return this.messagesService.delete(id);
    }
}