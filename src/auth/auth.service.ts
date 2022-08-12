import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/user';
import { UserRepository } from './auth.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { };

    async singUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto);
    }

    async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = credentialsDto;
        const user = await this.userRepository.findOne({ username });

        // リクエストのpasswordとDBのtokenを元に戻したpasswordを比較する
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { id: user.id, password: user.password, username: user.username };
            // id, password, usernameをtokenに変換して返す
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        throw new UnauthorizedException('入力したユーザー名またはパスワードが存在しません');
    }
}