import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from '../typeorm/message';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessagesService {
    // 依存性の注入(MessageServiceはMessageRepositoryに依存)
    constructor(private readonly messageRepository: MessageRepository) { }

    async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    };

    async findById(id: string): Promise<Message> {
        const found = await this.messageRepository.findOne(id);
        if (!found) {
            throw new NotFoundException("メッセージが見つかりません");
        }
        return found;
    };

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        return await this.messageRepository.createMessage(createMessageDto);
    };

    async update(id: string, postText: string): Promise<Message> {
        const message = await this.findById(id);
        message.postText = postText;
        message.updatedAt = new Date().toISOString();
        await this.messageRepository.save(message);
        return message;
    };

    async delete(id: string): Promise<string> {
        await this.messageRepository.delete({ id });
        return '削除完了しました';
    };
}
