import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
// typescriptでのモデルのようなもの
@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 40,
        nullable: false,
    })
    postText: string;

    @Column({
        nullable: false,
    })
    username: string;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @ManyToOne(() => User, (user) => user.messages)
    user: User;

    @Column()
    userId: string;
}