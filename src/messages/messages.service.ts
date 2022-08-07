import { Injectable } from '@nestjs/common';
import { Message } from './message.model';

@Injectable()
export class MessagesService {
    private messages: Message[] = [];

    findAll(): Message[] {
        return this.messages;
    }

    findById(id: string): Message {
        const found = this.messages.find((item) => item.id === id);
        return found;
    }

    create(message: Message): Message {
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
