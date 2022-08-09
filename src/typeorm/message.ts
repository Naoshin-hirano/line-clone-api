import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}