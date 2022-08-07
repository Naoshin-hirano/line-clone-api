import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

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