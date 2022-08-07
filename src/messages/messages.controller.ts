import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Message } from './message.model';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Get()
    findAll(): Message[] {
        return this.messagesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Message {
        return this.messagesService.findById(id);
    }

    @Post()
    create(
        @Body('id') id: string,
        @Body('postText') postText: string,
        @Body('username') username: string,
    ): Message {
        const message: Message = {
            id,
            postText,
            username,
        };

        return this.messagesService.create(message);
    };

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body('postText') postText: string,
    ): Message {
        return this.messagesService.update(id, postText);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ): string {
        return this.messagesService.delete(id);
    }
}