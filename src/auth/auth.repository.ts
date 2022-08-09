import { User } from "src/typeorm/user";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create.user.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(password, salt);
        const user = this.create({
            username,
            password: hashpassword,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await this.save(user);
        return user;
    }
}