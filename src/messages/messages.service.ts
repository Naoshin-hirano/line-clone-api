import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from './message.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MessagesService {
    private messages: Message[] = [];

    findAll(): Message[] {
        return this.messages;
    }

    findById(id: string): Message {
        const found = this.messages.find((item) => item.id === id);
        if (!found) {
            throw new NotFoundException("メッセージが見つかりません");
        }
        return found;
    }

    create(createMessageDto: CreateMessageDto): Message {
        const message: Message = {
            id: uuid(),
            ...createMessageDto
        };
        this.messages.push(message);
        return message;
    }

    update(id: string, postText: string): Message {
        const message = this.findById(id);
        message.postText = postText;
        return message;
    }

    delete(id: string): string {
        this.messages = this.messages.filter((message) => message.id !== id);
        return '削除完了しました';
    }
}
