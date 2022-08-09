import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';

@Module({
    imports: [
        MessagesModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Naoyakun1!',
            database: 'line_clone',
            entities,
            synchronize: true,
        }),],
    controllers: [],
    providers: [],
})
export class AppModule { }
