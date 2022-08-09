import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/typeorm/user';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async singUp(
        @Body()
        createUserDto: CreateUserDto
    ): Promise<User> {
        return await this.authService.singUp(createUserDto);
    };
};