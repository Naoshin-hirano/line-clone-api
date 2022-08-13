import { User } from "src/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { Message } from "../typeorm/message";
import { CreateMessageDto } from "./dto/create.message.dto";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message>{
    async createMessage(
        createMessage: CreateMessageDto,
        user: User,
    ): Promise<Message> {
        const { postText, username } = createMessage;
        // Repository用オブジェクト生成
        const message = this.create({
            postText,
            username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user,
        });
        // このレポジトリにオブジェクト保存
        await this.save(message);

        return message;
    }
}