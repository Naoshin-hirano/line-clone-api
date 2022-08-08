import { IsNotEmpty, IsString, MaxLength } from "class-validator";

// class-validatorとclass-transformerインストールでバリデーション可能になる
export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    postText: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}