import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

// ログインするときに入力して送信する情報
export class CredentialsDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}