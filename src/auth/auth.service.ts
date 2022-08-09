import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/user';
import { UserRepository } from './auth.repository';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) { };

    async singUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto);
    }
}