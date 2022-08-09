import { EntityRepository, Repository } from "typeorm";
import { Message } from "../typeorm/message";
import { CreateMessageDto } from "./dto/create.message.dto";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message>{
    async createMessage(createMessage: CreateMessageDto): Promise<Message> {
        const { postText, username } = createMessage;
        // Repository用オブジェクト生成
        const message = this.create({
            postText,
            username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        // このレポジトリにオブジェクト保存
        await this.save(message);

        return message;
    }
}