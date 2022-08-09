import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository])],
    controllers: [MessagesController],
    providers: [MessagesService]
})
export class MessagesModule { }
